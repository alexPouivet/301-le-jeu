import * as React from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import InfosPartieComponent from '../Components/InfosPartieComponent';
import ItemJoueurComponent from '../Components/ItemJoueurComponent';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

export default function Classement({ navigation, route }) {

  const {game_id } = route.params;
  const [game, setGame] = React.useState(null);
  const [classement, setClassement] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère le classement des joueurs
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setClassement(_array));
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
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Classement Actuel</Text>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView style={styles.scrollview}>
        <View style={styles.containerJoueurs}>
          {classement.map(({ nom_joueur, score_joueur, classement_joueur }, i) => (
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={classement} i={i}/>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack()
          }}
        >
        <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Retourner à la partie</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
    backgroundColor: "#FFFFFF",
    height: "100%"
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
  titrePage: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 16,
    color: "#252422",
  },
  containerStatutPartie: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 16,
    marginBottom: 16,
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
    marginBottom: 96,
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
  button: {
    marginLeft: 16,
    marginRight: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
})
