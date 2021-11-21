import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan, Polyline, Line }  from 'react-native-svg';

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
          <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334C" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Polyline points="15 6 9 12 15 18" />
          </Svg>
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
          <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 21 27">
            <Path id="Icon_material-delete" data-name="Icon material-delete" d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z" transform="translate(-7.5 -4.5)" fill="#24334C"/>
          </Svg>
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
            <Svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 93.126 93.126" style={{ position: "absolute", opacity: 0.4, bottom: -50, right: -40}}
            >
              <G id="Groupe_112" data-name="Groupe 112" transform="translate(-79 -79.436)">
                <Path id="Tracé_8" data-name="Tracé 8" d="M46.563,0A46.563,46.563,0,1,1,0,46.563,46.563,46.563,0,0,1,46.563,0Z" transform="translate(79 79.436)" fill="rgba(89,61,218,0.50)"/>
                <Path id="Ellipse_3" data-name="Ellipse 3" d="M37.711,3A34.721,34.721,0,0,0,24.2,69.7,34.721,34.721,0,0,0,51.221,5.727,34.491,34.491,0,0,0,37.711,3m0-3A37.711,37.711,0,1,1,0,37.711,37.711,37.711,0,0,1,37.711,0Z" transform="translate(87.642 88.078)" fill="#fff"/>
                <Path id="Ellipse_4" data-name="Ellipse 4" d="M31.818,3A28.827,28.827,0,0,0,20.6,58.373,28.827,28.827,0,0,0,43.035,5.263,28.635,28.635,0,0,0,31.818,3m0-3A31.818,31.818,0,1,1,0,31.818,31.818,31.818,0,0,1,31.818,0Z" transform="translate(93.927 94.363)" fill="#fff"/>
                <TextSvg id="_301" data-name="301" transform="translate(125.563 136.289)" fill="#fff" fontSize="25" fontWeight="bold"><TSpan x="-20" y="-1">301</TSpan></TextSvg>
              </G>
            </Svg>
            <View style={{alignItems: "center"}}>
              <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"
              >
                <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <Line x1="8" y1="21" x2="16" y2="21" />
                <Line x1="12" y1="17" x2="12" y2="21" />
                <Line x1="7" y1="4" x2="17" y2="4" />
                <Path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
                <Circle cx="5" cy="9" r="2" />
                <Circle cx="19" cy="9" r="2" />
              </Svg>
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
              <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <Rect x="4" y="5" width="16" height="16" rx="2" />
                <Line x1="16" y1="3" x2="16" y2="7" />
                <Line x1="8" y1="3" x2="8" y2="7" />
                <Line x1="4" y1="11" x2="20" y2="11" />
                <Line x1="11" y1="15" x2="12" y2="15" />
                <Line x1="12" y1="15" x2="12" y2="18" />
              </Svg>
              <Text style={styles.partieDate}>{game.date}</Text>
            </View>
            <View style={styles.containerTime}>
              <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <Circle cx="12" cy="12" r="9" />
                <Polyline points="12 7 12 12 15 15" />
              </Svg>
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
