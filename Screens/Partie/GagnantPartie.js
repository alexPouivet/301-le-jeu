import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';
import ClassementStyles from '../../Constants/Partie/ClassementStyles';

// Components
import InfosPartieComponent from '../../Components/DetailsPartie/InfosPartieComponent';
import ItemJoueurComponent from '../../Components/DetailsPartie/ItemJoueurComponent';
import PodiumPartieComponent from '../../Components/DetailsPartie/PodiumPartieComponent';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Gagnant Partie
export default function GagnantPartie({ navigation, route }) {

  const [fontsLoaded] = font();
  const { game_id, gagnant } = route.params;

  const [classement, setClassement] = useState(null);
  const [game, setGame] = useState(null);
  const toast = useToast();

  useEffect(() => {
    db.transaction((tx) => {
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM joueurs INNER JOIN infos_parties_joueurs ON joueurs.joueur_id = infos_parties_joueurs.joueur_id AND infos_parties_joueurs.partie_id = ? ORDER BY infos_parties_joueurs.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setClassement(_array));
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM parties WHERE parties.partie_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
    });
  }, []);

  if (classement === null || classement.length === 0 || game === null || game.length === 0) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return(
    <View style={GlobalStyles.container}>

      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={GlobalStyles.textHeaderTitle}>Gagnant de la partie</Text>
      </View>

      <InfosPartieComponent game={game}/>

      <ScrollView>

        <PodiumPartieComponent joueurs1={classement[1]} joueurs0={classement[0]} joueurs2={classement[2]} />

        { classement.length > 3
          ?
            <View style={DetailsPartieStyles.containerJoueurs}>
              {classement.map(({ nom_joueur, avatar_slug, score_joueur, classement_joueur }, i) => (
                i < 3
                ? null
                :
                <ItemJoueurComponent avatar_slug={avatar_slug} key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={classement} i={i}/>
              ))}

            </View>
          :
            null
        }

      </ScrollView>

      <View style={ClassementStyles.containerButton}>
        <TouchableOpacity
          style={game.nb_joueurs_restant > 1 ? ClassementStyles.buttonArreter : ClassementStyles.button}
          onPress={() => {
            // Fin de la partie en cours
            terminerPartie(game_id, classement).then(function(game_id) {
              navigation.navigate('Parties', {screen: "Liste Parties"});
              toast.show('Partie terminée !', {
                type: "success",
                placement: "top",
                animationType: "slide-in"
              });
            })
          }}
        >
          <Text style={ClassementStyles.textButtonArreter}>Arrêter la partie</Text>
        </TouchableOpacity>
        { game.nb_joueurs_restant > 1 ?
          <TouchableOpacity
            style={ClassementStyles.buttonContinuer}
            onPress={() => {

              // update de la bdd pour retirer le gagnant des joueurs à jouer et mettre le classement à jour
              updatePartieEtJoueurs(game_id, gagnant).then(function(game_id) {
                navigation.push("Partie", {
                  game_id: game_id,
                })
              })
            }}
          >
            <Text style={ClassementStyles.textButton}>Continuer la partie</Text>
          </TouchableOpacity>
          :
          null
        }
      </View>

    </View>
  )
}

const updatePartieEtJoueurs = function(game_id, gagnant) {

  return new Promise(function(resolve, reject) {
    let joueur = []
    let compteur = 1

    db.transaction((tx) => {
      // Mise à jour du nombre de joueurs et du tour en cours de la partie
      tx.executeSql('UPDATE parties SET nb_joueurs_restant = nb_joueurs_restant - ?, tour_joueur=? WHERE  partie_id = ?', [1, 1, game_id]);
      // Mise à jour de la position en cours du joueur si il à fini la partie
      tx.executeSql('UPDATE infos_parties_joueurs SET position_joueur_en_cours = ? WHERE partie_id = ? AND joueur_id = ?', [null, game_id, gagnant.joueur_id])
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?`, [game_id], (_, { rows: { _array } }) => {

        for(let i=0; i < _array.length; i++) {
          if(_array[i].score_joueur !== 0 && _array[i].position_joueur_en_cours !== null) {
            // Mise à jour de la position des joueurs en cours qui n'ont pas fini la partie
            tx.executeSql('UPDATE infos_parties_joueurs SET position_joueur_en_cours = ? WHERE joueur_id = ? AND partie_id = ?', [compteur, _array[i].joueur_id, game_id])
            compteur++
          }
        }

        resolve(game_id)
      });
    })
  })
}

const terminerPartie = function(game_id, classement) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      // Mise à jour du statut de la partie en cours en finie
      tx.executeSql('UPDATE parties SET statut = ? WHERE partie_id = ?', ["finie", game_id]);

      for (var i = 0; i < classement.length; i++) {

        if (classement[i].classement_joueur == null) {

          tx.executeSql('UPDATE infos_parties_joueurs SET classement_joueur = ? WHERE infos_parties_joueurs.joueur_id = ? AND infos_parties_joueurs.partie_id = ?', [ (i + 1), classement[i].joueur_id, game_id]);

        }
      }

    })
    resolve(game_id)
  })
}
