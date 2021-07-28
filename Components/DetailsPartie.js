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

// Page Détails d'une partie
export default function DetailsPartie({ navigation, route }) {

  const {game_id } = route.params;
  const [game, setGame] = React.useState(null);
  const [joueurs, setJoueurs] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

  if (game === null || game.length === 0 || joueurs === null || joueurs.length === 0) {
    return null;
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
          <Image
            source={require('../images/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Partie du {game.date}</Text>
      </View>
      <View style={[styles.containerStatutPartie, game.gagnant_game == null ? styles.backgroundColorStatutPartieEnCours : styles.backgroundColorStatutPartieFinie]}>
      {game.gagnant_game == null ?
        <Text style={styles.textStatutPartie}>Partie en cours</Text>
        :
        <View>
          <Image
          style={{width: 50, height: 50, marginBottom: 10}}
            source={require("../images/trophy.png")}
          />
          <Text style={styles.textStatutPartie}>{game.gagnant_game}</Text>
        </View>
      }
      </View>
      <View style={styles.libele}>
        <Text style={[styles.libeleClassement]}>#</Text>
        <Text style={[styles.libeleNom]}>Nom</Text>
        <Text style={[styles.libeleTour]}>Tour</Text>
        <Text style={[styles.libelePoints]}>Points restant</Text>
      </View>
      {joueurs.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
        <View key={i} style={[ styles.joueur, i % 2 == 0 ? styles.joueurImpair : styles.joueurPair, classement_joueur == 1 ? styles.gagnant : (i == 0 ? styles.joueurPosition1 : null) ]}>
          <Text style={[styles.textClassementJoueur, classement_joueur == 1 ? styles.textGagnant : (i == 0 ? styles.textClassementJoueurPosition1 : null)]}>{classement_joueur == null ? i+1 : classement_joueur}</Text>
          <Text style={[styles.textNomJoueur, classement_joueur == 1 ? styles.textGagnant : (i == 0 ? styles.textNomJoueurPosition1 : null)]}>{nom_joueur}</Text>
          <Text style={[styles.textTourJoueur, classement_joueur == 1 ? styles.textGagnant : (i == 0 ? styles.textTourJoueurPosition1 : null)]}>{tour_joueur}</Text>
          <Text style={[styles.textPointsJoueur, classement_joueur == 1 ? styles.textGagnantPoints : (i == 0 ? styles.textPointsJoueurPosition1 : null)]}>{score_joueur} points</Text>
        </View>
      ))}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={game.statut == "en cours" ? styles.buttonHistorique : styles.buttonHistorique2}
          onPress={() => navigation.goBack()}
        >
          <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 14 }}>Retourner à l'historique</Text>
        </TouchableOpacity>
        { game.statut == "en cours" ?
          <TouchableOpacity
            style={styles.buttonReprendre}
            onPress={() => navigation.navigate('Partie', {
              game_id: game_id
            })}
          >
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 14 }}>Reprendre la partie</Text>
          </TouchableOpacity>
          :
          null
        }
      </View>
    </View>
  );
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
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "70%",
    color: "rgba(36, 51, 76, 0.85)",
    marginLeft:10,
  },
  containerStatutPartie: {
    marginTop: 50,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  backgroundColorStatutPartieEnCours: {
    backgroundColor: "rgba(36, 51, 76, 0.85)",
  },
  backgroundColorStatutPartieFinie: {
    backgroundColor: "rgba(89, 61, 218, 0.85)",
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
  joueurPosition1: {
    backgroundColor: "rgba(36, 51, 76, 0.85)",
  },
  textClassementJoueurPosition1: {
    color: "#FFFFFF"
  },
  textClassementJoueur: {
    width: "10%",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(36, 51, 76, 0.85)",
  },
  textNomJoueurPosition1: {
    color: "#FFFFFF"
  },
  textNomJoueur: {
    width: "35%",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(36, 51, 76, 0.85)",
  },
  textTourJoueurPosition1: {
    color: "#FFFFFF"
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(36, 51, 76, 0.85)",
  },
  textPointsJoueurPosition1: {
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
  buttonReprendre: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "45%",
    backgroundColor: "rgba(36, 51, 76, 0.85)",
  },
  buttonHistorique2: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
  buttonHistorique: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 10,
    width: "45%",
    backgroundColor: "#B9B9B9",
  },
})
