import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect, Polyline, Line } from 'react-native-svg';

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
          <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334C" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Polyline points="15 6 9 12 15 18" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Gagnant de la partie</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.scrollContainer}>
          <View style={styles.containerStatutPartie}>
            <Svg  style={{ marginBottom: 10}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 18.084 16.075">
              <Path  id="Icon_awesome-trophy" data-name="Icon awesome-trophy" d="M17.331,2.009H14.066V.754A.752.752,0,0,0,13.312,0H4.772a.752.752,0,0,0-.754.754V2.009H.754A.752.752,0,0,0,0,2.763V4.521A4.1,4.1,0,0,0,1.943,7.683,7.355,7.355,0,0,0,5.4,8.992,6.945,6.945,0,0,0,7.535,11.3v2.261H6.028a1.812,1.812,0,0,0-2.009,1.758V15.7a.378.378,0,0,0,.377.377h9.293a.378.378,0,0,0,.377-.377v-.377a1.812,1.812,0,0,0-2.009-1.758H10.549V11.3a6.945,6.945,0,0,0,2.138-2.311,7.33,7.33,0,0,0,3.454-1.309,4.106,4.106,0,0,0,1.943-3.162V2.763A.752.752,0,0,0,17.331,2.009ZM3.118,6.053A2.309,2.309,0,0,1,2.009,4.521v-.5H4.025a11.276,11.276,0,0,0,.4,2.706,5.06,5.06,0,0,1-1.309-.672ZM16.075,4.521a2.412,2.412,0,0,1-1.108,1.532,5.079,5.079,0,0,1-1.312.672,11.277,11.277,0,0,0,.4-2.706h2.019Z" fill="#fff"/>
            </Svg>
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
    fontSize: 16,
    fontWeight: "bold",
    marginLeft:10,
    color: "rgba(36, 51, 76, 0.85)"
  },
  scrollview: {
    width: "100%"
  },
  scrollContainer: {
    alignItems: "center",
    marginBottom: 20
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
