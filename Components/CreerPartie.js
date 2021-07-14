import * as React from 'react';
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

// Page Création de partie
export default function CreerPartie({ route, navigation }) {

  const { nb_participants, nb_palets } = route.params;
  let participants = [];

  // Boucle textInput des noms des participants
  for(let i = 0; i < nb_participants; i++) {
    const [participant, onChangeParticipant] = React.useState("");

    participants.push(
      <View key = {i}>
        <TextInput
          style={styles.input}
          value={participant}
          onChangeText={onChangeParticipant}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Noms des participants</Text>
      <Text>{nb_participants}</Text>
      <Text>{nb_palets}</Text>
      { participants }
      <Button
        title="Commencer Partie"
        onPress={() => {
          create(participants, nb_participants, nb_palets).then(function(game_id) {
            navigation.navigate('Partie', {
              game_id: game_id,
            })
          })
        }}
      />
    </View>
  );
}

const create = function(participants, nb_participants, nb_palets) {

  return new Promise(function(resolve, reject) {

    // config date d'une partie
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let hour = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let time = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds

    // config liste des joueurs d'une partie
    let liste_joueurs = ""
    for(let i =0; i < nb_participants; i++) {
      if(i == nb_participants -1) {
        liste_joueurs += participants[i].props["children"]["props"]["value"]
      } else {
        liste_joueurs += participants[i].props["children"]["props"]["value"] + ", "
      }
    }

    db.transaction((tx) => {
      tx.executeSql("PRAGMA foreign_keys=on");
      // création de la table game dans la bdd
      tx.executeSql(
        "create table if not exists game (game_id integer primary key not null, date datetime, statut text, nb_palets int, nb_joueurs int, tour_game int, liste_joueurs text, gagnant_game text, tour_joueur int)"
      );
      // création de la table joueur dans la bdd
      tx.executeSql(
        "create table if not exists joueur (joueur_id integer primary key not null, game_id integer references game(game_id), nom_joueur text, score_joueur int, tour_joueur int, classement_joueur int, position_joueur int)"
      );
      // création d'une partie dans la bdd
      tx.executeSql(
        "insert into game (date, statut, nb_palets, nb_joueurs, tour_game, liste_joueurs, tour_joueur) values (?, ?, ?, ?, ?, ?, ?)", [time, 'en cours', nb_palets, nb_participants, 1, liste_joueurs, 1],
        function(tx, res) {
          // création des joueurs dans la bdd
          for(let i = 0; i < nb_participants; i++ ){
            tx.executeSql(
              "insert into joueur (game_id, nom_joueur, score_joueur, tour_joueur, position_joueur) values (?, ?, ?, ?, ?)", [res.insertId, participants[i].props["children"]["props"]["value"], 301, 0, i+1]
            );
          };
          // return game
          resolve(res.insertId)
        }
      );
    });
  })
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
