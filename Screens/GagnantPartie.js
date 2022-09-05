import React, { useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import InfosPartieComponent from '../Components/InfosPartieComponent';
import ItemJoueurComponent from '../Components/ItemJoueurComponent';
import PodiumJoueurComponent from '../Components/PodiumJoueurComponent';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import DetailsPartieStyles from '../Constants/DetailsPartieStyles';
import ClassementStyles from '../Constants/ClassementStyles';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

export default function GagnantPartie({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const { game_id } = route.params;

  const [classement, setClassement] = React.useState(null);
  const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setClassement(_array));
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
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
      <View style={DetailsPartieStyles.buttonContainer}>
          <TouchableOpacity
            style={GlobalStyles.buttonRetour}
            onPress={() => {
              if(game.nb_joueurs_restant > 1) {
                updatePartieEtJoueurs(game_id).then(function(game_id) {
                  navigation.navigate('Historique', {screen: "Liste"});
                })
              } else {
                terminerPartie(game_id).then(function(game_id) {
                  navigation.navigate('Historique', {screen: "Liste"});
                })
              }
            }}
          >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView>
        <PodiumJoueurComponent joueurs1={classement[1]} joueurs0={classement[0]} joueurs2={classement[2]} />
        <View style={DetailsPartieStyles.containerJoueurs}>
          {classement.map(({ nom_joueur, score_joueur, classement_joueur }, i) => (
            i < 3
            ? null
            :
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={classement} i={i}/>
          ))}

        </View>
      </ScrollView>
      <View style={ClassementStyles.containerButton}>
        <TouchableOpacity
          style={game.nb_joueurs_restant > 1 ? ClassementStyles.buttonArreter : ClassementStyles.button}
          onPress={() => {
            // Fin de la partie en cours
            terminerPartie(game_id).then(function(game_id) {
              navigation.navigate('Historique', {screen: "Liste"});
            })
          }}
        >
          <Text style={ClassementStyles.textButton}>Arrêter la partie</Text>
        </TouchableOpacity>
        { game.nb_joueurs_restant > 1 ?
          <TouchableOpacity
            style={ClassementStyles.buttonContinuer}
            onPress={() => {
              // update de la bdd pour retirer le gagnant des joueurs à jouer et mettre le classement à jour
              updatePartieEtJoueurs(game_id).then(function(game_id) {
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

const updatePartieEtJoueurs = function(game_id) {

  return new Promise(function(resolve, reject) {
    let joueur = []
    let compteur = 1

    db.transaction((tx) => {
      // Mise à jour du nombre de joueurs et du tour en cours de la partie
      tx.executeSql('UPDATE game SET nb_joueurs_restant = nb_joueurs_restant - ?, tour_joueur=? WHERE  game_id = ?', [1, 1, game_id]);
      // Mise à jour de la position en cours du joueur si il à fini la partie
      tx.executeSql('UPDATE joueur SET position_joueur_en_cours = ? WHERE game_id = ? AND score_joueur = ?', [null, game_id, 0])
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ?`, [game_id], (_, { rows: { _array } }) => {

        for(let i=0; i < _array.length; i++) {
          if(_array[i].score_joueur !== 0 && _array[i].position_joueur_en_cours !== null) {
            // Mise à jour de la position des joueurs en cours qui n'ont pas fini la partie
            tx.executeSql('UPDATE joueur SET position_joueur_en_cours = ? WHERE joueur_id = ?', [compteur, _array[i].joueur_id])
            compteur++
          } else {

          }
        }
      });
    })
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
