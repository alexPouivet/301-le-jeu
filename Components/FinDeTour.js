import * as React from 'react';
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

export default function FinDeTour({ navigation, route }) {

  const {game_id } = route.params;

  const [joueurs, setJoueurs] = React.useState(null);
  const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère la liste des joueurs de la partie en cours, avec tri par score
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

  if (game === null || game.length === 0 || joueurs === null || joueurs.length === 0) {
    return null;
  }

  return(
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.push("Accueil")
          }}
        >
          <Image
            source={require('../images/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Fin du Tour</Text>
      </View>
      <Text style={styles.titreRecap}>Récap Tour {game.tour_game}</Text>
      <View style={styles.libele}>
        <Text style={[styles.libeleNom]}>Nom</Text>
        <Text style={[styles.libelePoints]}>Points restant</Text>
      </View>
      {joueurs.map(({ nom_joueur, score_joueur }, i) => (
        <View key={i} style={styles.joueur}>
          <Text style={styles.textNomJoueur}>{nom_joueur}</Text>
          <Text style={styles.textPointsJoueur}>{score_joueur} points</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          updateGame(game_id).then(function(game_id) {
            navigation.push("Partie", {
              game_id: game_id,
            })
          })
        }}
      >
        <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 14 }}>Tour Suivant</Text>
      </TouchableOpacity>
    </View>
  )
}

const updateGame = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        // Mise à jour du tour de la partie en cours
        'UPDATE game SET tour_game = tour_game + 1 WHERE game_id = ?', [game_id]
      )
    })
    // Retourne l'id de la partie en cours
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
  titreRecap: {
    marginTop: 100,
    marginBottom: 30,
    backgroundColor: "rgba(89, 61, 218, 0.85)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  libele: {
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    paddingHorizontal: 5,
    paddingLeft: 15,
    marginBottom: 10
  },
  libeleNom: {
    width: "65%",
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
    width: "80%",
    backgroundColor: "#F3F3F3",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10
  },
  textNomJoueur: {
    width: "35%",
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
  button: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
})
