import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CurveGrey from '../assets/curves/curveGrey';
import Lottie from 'lottie-react-native';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import CreerPartieStyles from '../Constants/CreerPartieStyles';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

// Page Création de partie
export default function CreerPartie({ route, navigation }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const [errorText, onChangeErrorText] = React.useState("")
  const { nb_participants, nb_palets } = route.params;
  let participants = [];

  // Boucle textInput des noms des participants
  for(let i = 0; i < nb_participants; i++) {
    const [participant, onChangeParticipant] = React.useState("");

    participants.push(
      <View key = {i} style={CreerPartieStyles.inputContainer}>
        <Text style={[CreerPartieStyles.textInput, {fontFamily: "Poppins-Bold"}]}>Prénom Joueur {i+1}</Text>
        <TextInput
          style={CreerPartieStyles.input}
          value={participant}
          onChangeText={onChangeParticipant}
        />
      </View>
    )
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={CreerPartieStyles.headerContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[GlobalStyles.titrePage, {fontFamily: "Poppins-Medium"} ]}>Nouvelle partie</Text>
      </View>
      <KeyboardAwareScrollView>
        <View>
          <View style={CreerPartieStyles.animationContainer}>
            <Lottie style={CreerPartieStyles.animation} source={require('../assets/animations/floating-palet.json')} autoPlay loop />
            <Text style={CreerPartieStyles.description}>Nommez tous les joueurs participants à la partie en remplissant les champs ci-dessous et commencez la partie !
            </Text>
          </View>
          <CurveGrey />
          <View style={CreerPartieStyles.inputsGreyContainer}>
            <Text style={CreerPartieStyles.errorText}>{errorText}</Text>
            { participants }
          </View>
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={CreerPartieStyles.button}
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
        <Text style={CreerPartieStyles.textButtonWhite}>Commencer la partie</Text>
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
