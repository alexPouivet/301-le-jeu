import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export default function GagnantPartie({ navigation, route }) {

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

  return(
    <View>
      {game.gagnant_game == null ?
        <Text>Partie non finie</Text>
        :
        <Text>{game.gagnant_game}</Text>
      }
      {classement.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
        <View key={i}>
          <Text>{classement_joueur == null ? i+1 : classement_joueur} | {nom_joueur} | {tour_joueur} | {score_joueur} points</Text>
        </View>
      ))}
      { game.nb_joueurs_restant > 1 ?
        <Button
          title="Continuer la partie"
          // update de la bdd pour retirer le gagnant des joueurs à jouer et mettre le classement à jour
          onPress={() => {
            updatePartieEtJoueurs(game_id).then(function(game_id) {
              navigation.push("Partie", {
                game_id: game_id,
              })
            })

          }}
        />
        :
        null
      }
      <Button
        title="Arrêter la partie"
        onPress={() => {
          // Fin de la partie en cours
          terminerPartie(game_id).then(function(game_id) {
            navigation.navigate('Accueil')
          })
        }}
      />
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
