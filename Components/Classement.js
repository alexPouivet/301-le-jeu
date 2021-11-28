import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

import TrophyIcon from '../Components/Icons/trophyIcon';
import ArrowLeftIcon from '../Components/Icons/arrowLeftIcon';
import LogoIconBlue from '../Components/Icons/logoIconBlueBackground';

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
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Classement Actuel</Text>
      </View>
      <ScrollView style={styles.scrollview}>
          <View style={styles.scrollContainer}>
          <Image
          style={styles.image}
          source={
            require('../images/illustrations/recap.png')}
          />
          <View style={[styles.containerStatutPartie, game.gagnant_game == null ? styles.containerStatutPartieEnCours : styles.containerStatutGagnant ]
          }>
            <LogoIconBlue />
            <View style={{alignItems: "center"}}>
              <TrophyIcon size="big" />
              {game.gagnant_game == null
                ?
                  <Text style={styles.textStatutPartie}>Partie en cours</Text>
                :
                  <Text style={styles.textStatutPartie}>{game.gagnant_game}</Text>
              }
            </View>
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
              style={game.nb_joueurs_restant < 2 ? styles.buttonContinuer : styles.button}
              onPress={() => {
                navigation.goBack()
              }}
            >
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Retourner à la partie</Text>
          </TouchableOpacity>
            {game.nb_joueurs_restant < 2
            ?
            <TouchableOpacity
              style={styles.buttonArreter}
              onPress={() => {
                // Fin de la partie en cours
                terminerPartie(game_id).then(function(game_id) {
                  navigation.navigate('Accueil')
                })
              }}
            >
              <Text style={{textAlign: "center", color: "#24334c", fontSize: 18, fontWeight: "bold" }}>Fin de la partie</Text>
            </TouchableOpacity>
            :
            null
            }
          </View>
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: "bold",
    width: "70%",
    color: "#24334c",
  },
  scrollview: {
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  containerStatutPartie: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden"
  },
  containerStatutGagnant: {
    backgroundColor: "#7159df",
  },
  containerStatutPartieEnCours: {
    backgroundColor: "#24334c",
  },
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase"
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
    width: "100%",
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center"
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#7159df",
  },
  buttonContinuer: {
    marginTop: 0,
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#7159df",
  },
  buttonArreter: {
    marginTop: "auto",
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#B9B9B9"
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10
  },
})
