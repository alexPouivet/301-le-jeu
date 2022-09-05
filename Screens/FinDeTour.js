import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import InfosPartieComponent from '../Components/InfosPartieComponent';
import ItemJoueurComponent from '../Components/ItemJoueurComponent';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import ClassementStyles from '../Constants/ClassementStyles';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

export default function FinDeTour({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const {game_id } = route.params;

  const [joueurs, setJoueurs] = React.useState(null);
  const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère la liste des joueurs de la partie en cours, avec tri par score
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ?`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
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
      <View style={ClassementStyles.headerContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.navigate('Historique', {screen: "Liste"});
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[GlobalStyles.titrePage, {fontFamily: "Poppins-Medium"} ]}>Récap Tour {game.tour_game}</Text>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView>
        <View style={ClassementStyles.containerJoueurs}>
          {joueurs.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
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
                terminerPartie(game_id).then(function(game_id) {
                  navigation.navigate('Liste')
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
        'UPDATE game SET tour_game = tour_game + 1 WHERE game_id = ?', [game_id]
      )
    })
    // Retourne l'id de la partie en cours
    resolve(game_id)
  })
}

const terminerPartie = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      // Mise à jour du statut de la partie en cours en finie
      tx.executeSql('UPDATE game SET statut = ? WHERE game_id = ?', ["finie", game_id])
    })
    resolve(game_id)
  })
}
