import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan, Polyline, Line }  from 'react-native-svg';

import ArrowLeftIcon from '../Components/Icons/arrowLeftIcon';
import LogoIconPurple from '../Components/Icons/logoIconPurpleBackground';
import TrophyIcon from '../Components/Icons/trophyIcon';

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
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonRetour}
            onPress={() => {
              if(game.nb_joueurs_restant > 1) {
                updatePartieEtJoueurs(game_id).then(function(game_id) {
                  navigation.navigate("Accueil")
                })
              } else {
                terminerPartie(game_id).then(function(game_id) {
                  navigation.navigate('Accueil')
                })
              }
            }}
          >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Gagnant de la partie</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.scrollContainer}>
          <Image
          style={styles.image}
          source={
            require('../images/illustrations/winner.png')}
          />
          <View style={styles.containerStatutPartie}>
            <LogoIconPurple />
            <TrophyIcon size="big" />
            <Text style={styles.textStatutPartie}>{game.gagnant_game}</Text>
          </View>
          <View style={styles.libele}>
            <Text style={[styles.libeleClassement]}>#</Text>
            <Text style={[styles.libeleNom]}>Nom</Text>
            <Text style={[styles.libeleTour]}>Tour</Text>
            <Text style={[styles.libelePoints]}>Points restant</Text>
          </View>
          {classement.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
            <View key={i} style={[ styles.joueur, i % 2 == 0 ? styles.joueurImpair : styles.joueurPair, classement_joueur == 1 ? styles.gagnant : null ]}>
              <Text style={[styles.textClassementJoueur, classement_joueur == 1 ? styles.textGagnant : null]}>{classement_joueur == null ? i+1 : classement_joueur}</Text>
              <Text style={[styles.textNomJoueur, classement_joueur == 1 ? styles.textGagnant : null]}>{nom_joueur}</Text>
              <Text style={[styles.textTourJoueur, classement_joueur == 1 ? styles.textGagnant : null]}>{tour_joueur}</Text>
              <Text style={[styles.textPointsJoueur, classement_joueur == 1 ? styles.textGagnantPoints : null]}>{score_joueur} points</Text>
            </View>
          ))}
          <View style={styles.buttons}>
            { game.nb_joueurs_restant > 1 ?
              <TouchableOpacity
                style={styles.buttonContinuer}
                onPress={() => {
                  // update de la bdd pour retirer le gagnant des joueurs à jouer et mettre le classement à jour
                  updatePartieEtJoueurs(game_id).then(function(game_id) {
                    navigation.push("Partie", {
                      game_id: game_id,
                    })
                  })
                }}
              >
                <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Continuer la partie</Text>
              </TouchableOpacity>
              :
              null
            }
            <TouchableOpacity
              style={game.nb_joueurs_restant > 1 ? styles.buttonArreter2 : styles.buttonArreter}
              onPress={() => {
                // Fin de la partie en cours
                terminerPartie(game_id).then(function(game_id) {
                  navigation.navigate('Accueil')
                })
              }}
            >
              <Text style={{textAlign: "center", color: "#24334c", fontSize: 18, fontWeight: "bold" }}>Fin de la partie</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:10,
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:10,
  },
  titrePage: {
    width: "70%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft:10,
    color: "#24334c"
  },
  scrollview: {
    width: "100%"
  },
  scrollContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  containerStatutPartie: {
    marginBottom: 40,
    backgroundColor: "#7159df",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden"
  },
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  libele: {
    flexDirection: "row",
    width: "90%",
    paddingHorizontal: 5,
    paddingLeft: 15,
    marginBottom: 10
  },
  libeleClassement: {
    width: "10%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#24334c",
  },
  libeleNom: {
    width: "35%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#24334c",
  },
  libeleTour: {
    width: "20%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#24334c",
  },
  libelePoints: {
    width: "35%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#24334c",
  },
  joueur: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 15,
    borderRadius: 10,
    width: "90%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  joueurImpair: {
    backgroundColor: "#D6D6D6",
  },
  joueurPair: {
    backgroundColor: "#F3F3F3",
  },
  gagnant: {
    backgroundColor: "#7159df"
  },
  textClassementJoueur: {
    width: "10%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#24334c",
  },
  textNomJoueur: {
    width: "35%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#24334c",
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#24334c",
  },
  textPointsJoueur: {
    width: "35%",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal:10,
    color: "#24334c",
  },
  textGagnant: {
    color: "#FFFFFF"
  },
  textGagnantPoints: {
    color: "#7159df"
  },
  buttons: {
    marginTop: 50,
    marginBottom: 20,
    width: "100%",
    alignItems: "center"
  },
  buttonContinuer: {
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#7159df",
  },
  buttonArreter: {
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#7159df",
  },
  buttonArreter2: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#B9B9B9",
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10,
  },
})
