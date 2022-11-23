import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ClassementStyles from '../../Constants/Partie/ClassementStyles';

// Components
import ItemJoueurComponent from '../../Components/DetailsPartie/ItemJoueurComponent';
import InfosPartieComponent from '../../Components/DetailsPartie/InfosPartieComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Fin de Tour Partie
export default function FinDeTour({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const {game_id } = route.params;

  const [joueurs, setJoueurs] = React.useState(null);
  const [game, setGame] = React.useState(null);
  const toast = useToast();

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM parties WHERE parties.partie_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère la liste des joueurs de la partie en cours, avec tri par score
      tx.executeSql(`SELECT * FROM joueurs INNER JOIN infos_parties_joueurs ON joueurs.joueur_id = infos_parties_joueurs.joueur_id AND infos_parties_joueurs.partie_id = ? ORDER BY infos_parties_joueurs.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

  if (game === null || game.length === 0 || joueurs === null || joueurs.length === 0) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return(
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.navigate('Parties', {screen: "Liste Parties"});
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Récap Tour {game.tour_game}</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>

      <InfosPartieComponent game={game}/>

      <ScrollView>
        <View style={ClassementStyles.containerJoueurs}>
          {joueurs.map(({ nom_joueur, avatar_slug, score_joueur, tour_joueur, classement_joueur }, i) => (
            <ItemJoueurComponent key={i} avatar_slug={avatar_slug} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
          ))}
        </View>
      </ScrollView>

      <View style={ClassementStyles.containerButton}>

        {game.nb_joueurs_restant < 2
        ?
          <TouchableOpacity
            style={ClassementStyles.buttonArreter}
            onPress={() => {
              // Fin de la partie en cours
              terminerPartie(game_id, joueurs).then(function(game_id) {
                navigation.navigate('Parties', {screen: "Liste Parties"});
                toast.show('Partie terminée !', {
                  type: "success",
                  placement: "top",
                  animationType: "slide-in"
                });
              })
            }}
          >
            <Text style={ClassementStyles.textButton}>Arrêter la partie</Text>
          </TouchableOpacity>
        :
        null
        }

        <TouchableOpacity
          style={game.nb_joueurs_restant < 2 ? ClassementStyles.buttonContinuer : ClassementStyles.button}
          onPress={() => {
            updateGame(game_id).then(function(game_id) {
              navigation.push("Partie", {
                game_id: game_id,
              })
            })
          }}
        >
          <Text style={ClassementStyles.textButton}>Tour Suivant</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const updateGame = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        // Mise à jour du tour de la partie en cours
        'UPDATE parties SET tour_partie = tour_partie + 1 WHERE partie_id = ?', [game_id]
      )
    })
    // Retourne l'id de la partie en cours
    resolve(game_id)
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
