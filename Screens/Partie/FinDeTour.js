import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ClassementStyles from '../../Constants/Partie/ClassementStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import ItemJoueurComponent from '../../Components/DetailsPartie/ItemJoueurComponent';
import InfosPartieComponent from '../../Components/DetailsPartie/InfosPartieComponent';
import font from '../../Components/FontComponent';
import terminerPartie from '../../Components/Partie/TerminerPartie';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Fin de Tour Partie
export default function FinDeTour({ navigation, route, theme }) {

  const [fontsLoaded] = font();
  const {game_id } = route.params;

  const [joueurs, setJoueurs] = useState(null);
  const [game, setGame] = useState(null);
  const toast = useToast();

  useEffect(() => {
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
    <View style={[ GlobalStyles.container, theme === "dark" ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme ]}>
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={[  GlobalStyles.buttonLeft, theme === "dark" ? GlobalStyles.buttonLeftDarkTheme : GlobalStyles.buttonLeftLightTheme]}
          onPress={() => {
            navigation.navigate('Parties', {screen: "Liste Parties"});
          }}
        >
          <IconComponent name="arrow-back" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
        </TouchableOpacity>
        <Text style={[ GlobalStyles.textHeaderTitle, theme === "dark" ? GlobalStyles.textHeaderTitleDarkTheme : GlobalStyles.textHeaderTitleLightTheme ]}>Récap Tour {game.tour_partie}</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>

      <InfosPartieComponent theme={theme} game={game}/>

      <ScrollView>
        <View style={[ ClassementStyles.containerJoueurs, theme === "dark" ? ClassementStyles.containerJoueursDarkTheme : ClassementStyles.containerJoueursLightTheme ]}>
          {joueurs.map(({ nom_joueur, avatar_slug, score_joueur, tour_joueur, classement_joueur }, i) => (
            <ItemJoueurComponent theme={theme} key={i} avatar_slug={avatar_slug} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
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
            <Text style={ClassementStyles.textButtonArreter}>Arrêter la partie</Text>
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
