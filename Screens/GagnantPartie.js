import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import InfosPartieComponent from '../Components/InfosPartieComponent';
import ItemJoueurComponent from '../Components/ItemJoueurComponent';
import PodiumJoueurComponent from '../Components/PodiumJoueurComponent';


import openDatabase from '../Components/OpenDatabase';
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
                  navigation.navigate("Liste")
                })
              } else {
                terminerPartie(game_id).then(function(game_id) {
                  navigation.navigate('Liste')
                })
              }
            }}
          >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView style={styles.scrollview}>
        <PodiumJoueurComponent joueurs1={classement[1]} joueurs0={classement[0]} joueurs2={classement[2]} />
        <View style={styles.containerJoueurs}>
          {classement.map(({ nom_joueur, score_joueur, classement_joueur }, i) => (
            i < 3
            ? null
            :
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={classement} i={i}/>
          ))}

        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={game.nb_joueurs_restant > 1 ? styles.buttonArreter2 : styles.buttonArreter}
          onPress={() => {
            // Fin de la partie en cours
            terminerPartie(game_id).then(function(game_id) {
              navigation.navigate('Liste')
            })
          }}
        >
          <Text style={{textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "bold" }}>Finir la partie</Text>
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
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Continuer la partie</Text>
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

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
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
  containerStatutPartie: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 16,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#7159df",
  },
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: 'uppercase'
  },
  containerDateAndTime: {
    flexDirection: "row",
    marginBottom: 20
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center"
  },
  partieDate: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
    marginLeft: 4,
  },
  scrollview: {
    paddingTop: 16,
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#d6d6d6",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 128,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  buttons: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row"
  },
  buttonArreter: {
    marginLeft: 16,
    marginRight: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  buttonContinuer: {
    marginLeft: 4,
    marginRight: 16,
    width: (width / 2) - 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  buttonArreter2: {
    marginLeft: 16,
    marginRight: 4,
    width: (width / 2) - 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#B9B9B9"
  },
})
