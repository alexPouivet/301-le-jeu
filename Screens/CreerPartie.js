import * as React from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CurveGrey from '../assets/curves/curveGrey';

import openDatabase from '../Components/OpenDatabase';
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
        <Text style={styles.textInput}>Prénom Joueur {i+1}</Text>
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
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Nouvelle partie</Text>
      </View>
      <KeyboardAwareScrollView style={styles.scrollview}>
        <View style={styles.scrollContainer}>
          <View style={{height: 300}}>
            <Image
            style={styles.image}
            source={
              require('../assets/images/progress.png')}
            />
            <Text style={styles.description}>Nommez tous les joueurs participants à la partie en remplissant les champs ci-dessous et commencez la partie !
            </Text>
          </View>
          <CurveGrey />
          <View style={styles.inputsContainer}>
            <Text style={styles.errorText}>{errorText}</Text>
            { participants }
          </View>
        </View>
      </KeyboardAwareScrollView>
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
            onChangeErrorText("Les champs ne sont pas correctement remplis, deux lettres au minimum.")
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
  );
}

const create = function(participants, nb_participants, nb_palets) {

  return new Promise(function(resolve, reject) {

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    // config date d'une partie
    let year = new Date().getFullYear();
    let month = padTo2Digits(new Date().getMonth() + 1);
    let day = padTo2Digits(new Date().getDate());
    let hour = new Date().getHours();
    let minutes = padTo2Digits(new Date().getMinutes());
    let seconds = new Date().getSeconds();
    let date =  day + '/' + month + '/' + year;
    let time = hour + 'h' + minutes;

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
        "CREATE TABLE IF NOT EXISTS game (game_id integer primary key not null, date text, time time, statut text, nb_palets int, nb_joueurs int, nb_joueurs_restant int, tour_game int, liste_joueurs text, gagnant_game text, tour_joueur int)"
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

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  buttonContainer: {
     width: "100%",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:16,
  },
  titrePage: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 16,
    color: "#252422",
  },
  scrollview: {

  },
  scrollContainer: {
    marginBottom: 64
  },
  image: {
    width: 210,
    height: 210,
    marginLeft: "auto",
    marginRight: "auto"
  },
  description: {
    fontSize: 14,
    color: "#252422",
    marginLeft: 16,
    marginTop: "auto",
    marginBottom: 24,
    marginRight: 16,
    textAlign: "center"
  },
  errorText: {
    width: "80%",
    textAlign: "center",
    marginBottom: 10,
    color: "#FF4B3E"
  },
  inputsContainer: {
    height: "100%",
    alignItems: "center",
    paddingTop: 16,
    backgroundColor: "#F3F3F3",
  },
  inputContainer: {
    width: "100%",
  },
  textInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#24334c",
    paddingBottom: 10,
    textAlign: "center"
  },
  input: {
    marginLeft: 16,
    marginRight: 16,
    height: 48,
    borderWidth: 3,
    borderColor: "#7159df",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#FFFFFF'
  },
  button: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
});
