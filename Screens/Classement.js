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

export default function Classement({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const {game_id } = route.params;
  const [game, setGame] = React.useState(null);
  const [classement, setClassement] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère le classement des joueurs
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setClassement(_array));
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
      <View style={ClassementStyles.headerContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[ GlobalStyles.titrePage, { fontFamily: "Poppins-Medium"} ]}>Classement Actuel</Text>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView >
        <View style={ClassementStyles.containerJoueurs}>
          {classement.map(({ nom_joueur, score_joueur, classement_joueur }, i) => (
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={classement} i={i}/>
          ))}
        </View>
      </ScrollView>
      <View style={ClassementStyles.containerButton}>
        <TouchableOpacity
          style={ClassementStyles.button}
          onPress={() => {
            navigation.goBack()
          }}
        >
        <Text style={ClassementStyles.textButton}>Retourner à la partie</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
