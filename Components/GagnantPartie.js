import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
          <Image
            source={require('../images/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Gagnant de la partie</Text>
      </View>
      <View style={styles.containerStatutPartie}>
        <Image
        style={{width: 50, height: 50, marginBottom: 10}}
          source={require("../images/trophy.png")}
        />
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
        <TouchableOpacity
          style={game.nb_joueurs_restant > 1 ? styles.buttonArreter2 : styles.buttonArreter}
          onPress={() => {
            // Fin de la partie en cours
            terminerPartie(game_id).then(function(game_id) {
              navigation.navigate('Accueil')
            })
          }}
        >
          <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 14 }}>Terminer la partie</Text>
        </TouchableOpacity>
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
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 14 }}>Continuer la partie</Text>
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
    fontSize: 16,
    fontWeight: "bold",
    marginLeft:10,
    color: "rgba(36, 51, 76, 0.85)"
  },
  containerStatutPartie: {
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: "rgba(89, 61, 218, 0.85)",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  libele: {
    flexDirection: "row",
    width: "80%",
    paddingHorizontal: 5,
    paddingLeft: 15,
    marginBottom: 10
  },
  libeleClassement: {
    width: "10%",
    fontWeight: "bold",
    fontSize: 12,
    color: "rgba(36, 51, 76, 0.85)",
  },
  libeleNom: {
    width: "35%",
    fontWeight: "bold",
    fontSize: 12,
    color: "rgba(36, 51, 76, 0.85)",
  },
  libeleTour: {
    width: "20%",
    fontWeight: "bold",
    fontSize: 12,
    color: "rgba(36, 51, 76, 0.85)",
  },
  libelePoints: {
    width: "35%",
    fontWeight: "bold",
    fontSize: 12,
    color: "rgba(36, 51, 76, 0.85)",
  },
  joueur: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 15,
    borderRadius: 10,
    width: "80%",
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
    backgroundColor: "rgba(89, 61, 218, 0.85)"
  },
  textClassementJoueur: {
    width: "10%",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(36, 51, 76, 0.85)",
  },
  textNomJoueur: {
    width: "35%",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(36, 51, 76, 0.85)",
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(36, 51, 76, 0.85)",
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
    color: "rgba(36, 51, 76, 0.85)",
  },
  textGagnant: {
    color: "#FFFFFF"
  },
  textGagnantPoints: {
    color: "rgba(89, 61, 218, 0.85)"
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",

  },
  buttonContinuer: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "45%",
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
  buttonArreter: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
  buttonArreter2: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "45%",
    backgroundColor: "#B9B9B9",
  },
})
