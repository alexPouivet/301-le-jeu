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

export default function CreerPartie({ route, navigation }) {

  const { nb_participants, nb_palets } = route.params;

  let participants = [];

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
        title="Retourner à l'accueil"
        // récupère la value du textInput à travers l'objet participants
        onPress={() => {
          create(participants, nb_participants, nb_palets)
          navigation.navigate('Accueil')
        }}
      />
    </View>
  );
}

function create(participants, nb_participants, nb_palets) {

  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var hour = new Date().getHours()
  var minutes = new Date().getMinutes()
  var seconds = new Date().getSeconds()

  let time = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds

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
    tx.executeSql(
      "create table if not exists game (game_id integer primary key not null, date datetime, statut text, nb_palets int, nb_joueurs int, tour_game int, liste_joueurs text, gagnant_game text)"
    );
    tx.executeSql(
      "create table if not exists joueur (joueur_id integer primary key not null, game_id integer references game(game_id), nom_joueur text, score_joueur int, tour_joueur int, classement_joueur int)"
    );
    tx.executeSql(
      "insert into game (date, statut, nb_palets, nb_joueurs, tour_game, liste_joueurs) values (?, ?, ?, ?, ?, ?)", [time, 'en cours', nb_participants, nb_palets, 1, liste_joueurs],
      function(tx, res) {
        for(let i = 0; i < nb_participants; i++ ){
          tx.executeSql(
            "insert into joueur (game_id, nom_joueur, score_joueur, tour_joueur) values (?, ?, ?, ?)", [res.insertId, participants[i].props["children"]["props"]["value"], 301, 1]
          );
        };
      }
    );
  });
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
