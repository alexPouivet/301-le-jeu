import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

import ArrowLeftIcon from '../Components/Icons/arrowLeftIcon';

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

  const [errorText, onChangeErrorText] = React.useState("")
  const { nb_participants, nb_palets } = route.params;
  let participants = [];

  // Boucle textInput des noms des participants
  for(let i = 0; i < nb_participants; i++) {
    const [participant, onChangeParticipant] = React.useState("");

    participants.push(
      <View key = {i} style={styles.inputContainer}>
        <Text style={styles.textInput}>Joueur {i+1}</Text>
        <TextInput
          style={styles.input}
          value={participant}
          onChangeText={onChangeParticipant}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Nouvelle partie</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.scrollContainer}>
          <Image
          style={styles.image}
          source={
            require('../images/illustrations/progress.png')}
          />
          <Text style={styles.description}>Nommez tous les joueurs participants à la partie en remplissant les champs ci-dessous et commencez la partie
          </Text>
          <View style={styles.inputsContainer}>
            <Text style={styles.errorText}>{errorText}</Text>
            { participants }
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {

              let isParticipantsNameEmpty = true

              for (var i = 0; i < nb_participants; i++) {
                if(participants[i].props["children"][1]["props"]["value"] == "" || participants[i].props["children"][1]["props"]["value"].length < 2 ) {
                  isParticipantsNameEmpty = true
                  break
                }
                else {
                  isParticipantsNameEmpty = false
                }
              }

              if(isParticipantsNameEmpty){
                onChangeErrorText("Les noms ne sont pas correctement remplis, deux lettres au minimum")
              } else {
                onChangeErrorText("")
                create(participants, nb_participants, nb_palets).then(function(game_id) {
                  navigation.navigate('Partie', {
                    game_id: game_id,
                  })
                })
              }
            }}
          >
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold"}}>Commencer la partie</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const create = function(participants, nb_participants, nb_palets) {

  return new Promise(function(resolve, reject) {

    // config date d'une partie
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let hour = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let date =  day + '/' + month + '/' + year
    let time = hour + ':' + minutes

    // config liste des joueurs d'une partie
    let liste_joueurs = ""
    for(let i =0; i < nb_participants; i++) {
      if(i == nb_participants -1) {
        liste_joueurs += participants[i].props["children"][1]["props"]["value"]
      } else {
        liste_joueurs += participants[i].props["children"][1]["props"]["value"] + ", "
      }
    }

    db.transaction((tx) => {
      tx.executeSql("PRAGMA foreign_keys=on");
      // création de la table game dans la bdd
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS game (game_id integer primary key not null, date date, time time, statut text, nb_palets int, nb_joueurs int, nb_joueurs_restant int, tour_game int, liste_joueurs text, gagnant_game text, tour_joueur int)"
      );
      // création de la table joueur dans la bdd
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS joueur (joueur_id integer primary key not null, game_id integer references game(game_id), nom_joueur text, score_joueur int, tour_joueur int, classement_joueur int, position_joueur int, position_joueur_en_cours int)"
      );
      // création d'une partie dans la bdd
      tx.executeSql(
        "INSERT INTO game (date, time, statut, nb_palets, nb_joueurs, nb_joueurs_restant, tour_game, liste_joueurs, tour_joueur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [date, time, 'en cours', nb_palets, nb_participants, nb_participants, 1, liste_joueurs, 1],
        function(tx, res) {
          // création des joueurs dans la bdd
          for(let i = 0; i < nb_participants; i++ ){
            tx.executeSql(
              "INSERT INTO joueur (game_id, nom_joueur, score_joueur, tour_joueur, position_joueur, position_joueur_en_cours) VALUES (?, ?, ?, ?, ?, ?)", [res.insertId, participants[i].props["children"][1]["props"]["value"], 301, 0, i+1, i+1]
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
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFFFFF"
  },
  title: {
    marginTop: 100,
    color: "#24334c",
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollview: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    height: "100%",
  },
  errorText: {
    width: "80%",
    textAlign: "center",
    marginBottom: 10,
    color: "red"
  },
  inputsContainer: {
    borderRadius: 10,
    paddingTop: 0,
    paddingBottom: 20,
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#F3F3F3",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center"
  },
  textInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#24334c",
    paddingBottom: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#FFFFFF'
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    backgroundColor: "#7159df",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 15,
    width: "90%",

    backgroundColor: "#7159df",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:20,
  },
  titrePage: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "70%",
    color: "#24334c",
  },
  description: {
    marginLeft: 20,
    marginRight:20,
    textAlign: 'center',
    fontSize: 14,
    color: "#24334c"
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10,
  },
});
