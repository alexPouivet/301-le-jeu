import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan, Polyline, Line }  from 'react-native-svg';

import ArrowLeftIcon from '../Components/Icons/arrowLeftIcon';
import DeleteIcon from '../Components/Icons/deleteIcon';
import TrophyIcon from '../Components/Icons/trophyIcon';
import CalendarIcon from '../Components/Icons/calendarIcon';
import ClockIcon from '../Components/Icons/clockIcon';
import LogoIconBlue from '../Components/Icons/logoIconBlueBackground'
import LogoIconPurple from '../Components/Icons/logoIconPurpleBackground'

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

  const { game_id } = route.params;
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
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Détail partie</Text>
        <TouchableOpacity
          style={styles.buttonSupprimer}
          onPress={() => {
            deletePartie(game_id).then(function(game_id) {
              navigation.navigate('Accueil')
            })
          }}
        >
          <DeleteIcon />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.infos}>
          {game.gagnant_game == null
            ?
            <Image
            style={styles.image}
            source={
              require('../images/illustrations/team.png')}
            />
            :
            <Image
            style={styles.image}
            source={
              require('../images/illustrations/winner.png')}
            />
          }
          <View style={[styles.containerStatutPartie, game.gagnant_game == null ? styles.containerStatutPartieEnCours : styles.containerStatutGagnant ]
          }>
            {game.gagnant_game == null
              ?
                <LogoIconBlue position="bottom-right"/>
              :
                <LogoIconPurple position="bottom-right"/>
            }

            <View style={{alignItems: "center"}}>
              <TrophyIcon size="big"/>
              {game.gagnant_game == null
                ?
                  <Text style={styles.textStatutPartie}>Partie en cours</Text>
                :
                  <Text style={styles.textStatutPartie}>{game.gagnant_game}</Text>
              }
            </View>
          </View>
          <View style={styles.containerDateAndTime}>
            <View style={styles.containerDate}>
              <CalendarIcon color="black"/>
              <Text style={styles.partieDate}>{game.date}</Text>
            </View>
            <View style={styles.containerTime}>
              <ClockIcon color="black"/>
              <Text style={styles.partieDate}>{game.time}</Text>
            </View>
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
            { game.statut == "en cours" ?
              <TouchableOpacity
                style={styles.buttonReprendre}
                onPress={() => navigation.navigate('Partie', {
                  game_id: game_id
                })}
              >
                <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Reprendre la partie</Text>
              </TouchableOpacity>
              :
              null
            }
            <TouchableOpacity
              style={game.statut == "en cours" ? styles.buttonHistorique : styles.buttonHistorique2}
              onPress={() => navigation.goBack()}
            >
              <Text style={[{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight:"bold" }, game.statut == "en cours" ? null : styles.TextButtonHistoriqueTerminee]}>Retourner à l'historique</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const deletePartie = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM game WHERE game.game_id = ?", [game_id]
      );
      tx.executeSql(
        "DELETE FROM joueur WHERE joueur.game_id = ?", [game_id]
      )
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
  buttonSupprimer: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:10,
  },
  scrollview: {
    width: "100%",
  },
  infos: {
    alignItems: "center"
  },
  titrePage: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    width: "70%",
    color: "#24334c",
    marginLeft:10,
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
  joueurPosition1: {
    backgroundColor: "#24334c",
  },
  textClassementJoueurPosition1: {
    color: "#FFFFFF"
  },
  textClassementJoueur: {
    width: "10%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#24334c",
  },
  textNomJoueurPosition1: {
    color: "#FFFFFF"
  },
  textNomJoueur: {
    width: "35%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#24334c",
  },
  textTourJoueurPosition1: {
    color: "#FFFFFF"
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#24334c",
  },
  textPointsJoueurPosition1: {
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
    marginBottom:20,
    alignItems: "center"
  },
  buttonReprendre: {
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#24334c",
  },
  buttonHistorique2: {
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#7159df",
  },
  buttonHistorique: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#B9B9B9",
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10
  },
  containerDateAndTime: {
    flexDirection: "row",
    marginBottom: 20
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center"
  },
  containerTime: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  partieDate: {
    fontWeight: "bold",
    fontSize: 14
  }
})
