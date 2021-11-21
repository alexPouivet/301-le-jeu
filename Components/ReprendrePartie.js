import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
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

// Page Reprendre une partie en cours
export default function ReprendrePartie({ navigation }) {

  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les parties dont le statut est en cours
      tx.executeSql(`SELECT * FROM game WHERE game.statut == "en cours" ORDER BY date DESC`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if(games === null || games.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.titrePage}>Reprendre une partie</Text>
        </View>
        <Text>Pas de partie en cours disponible</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.titrePage}>Reprendre une partie</Text>
      </View>
      <Text style={styles.description}>Reprenez une partie non terminée jouée précédemment</Text>
      { games === null || games.length === 0
      ?
      <Text>Pas de partie en cours disponible</Text>
      :
      <ScrollView style={styles.scrollview}>
        <View style={styles.parties}>
          {games.map(({ game_id, date, time, liste_joueurs, statut, gagnant_game }, i) => (
            <TouchableOpacity key={i} style={styles.partie}
              onPress={() => navigation.navigate('Details', {
                game_id: game_id
              })}
            >
              <Svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 93.126 93.126" style={{ position: "absolute", opacity: 0.4, top: -50, right: -30}}
              >
                <G id="Groupe_112" data-name="Groupe 112" transform="translate(-79 -79.436)">
                  <Path id="Tracé_8" data-name="Tracé 8" d="M46.563,0A46.563,46.563,0,1,1,0,46.563,46.563,46.563,0,0,1,46.563,0Z" transform="translate(79 79.436)" fill="rgba(214, 214, 214, 0.10)"/>
                  <Path id="Ellipse_3" data-name="Ellipse 3" d="M37.711,3A34.721,34.721,0,0,0,24.2,69.7,34.721,34.721,0,0,0,51.221,5.727,34.491,34.491,0,0,0,37.711,3m0-3A37.711,37.711,0,1,1,0,37.711,37.711,37.711,0,0,1,37.711,0Z" transform="translate(87.642 88.078)" fill="#fff"/>
                  <Path id="Ellipse_4" data-name="Ellipse 4" d="M31.818,3A28.827,28.827,0,0,0,20.6,58.373,28.827,28.827,0,0,0,43.035,5.263,28.635,28.635,0,0,0,31.818,3m0-3A31.818,31.818,0,1,1,0,31.818,31.818,31.818,0,0,1,31.818,0Z" transform="translate(93.927 94.363)" fill="#fff"/>
                  <TextSvg id="_301" data-name="301" transform="translate(125.563 136.289)" fill="#fff" fontSize="25" fontWeight="bold"><TSpan x="-20" y="-1">301</TSpan></TextSvg>
                </G>
              </Svg>
              <View style={styles.infosContainer}>
                <View style={styles.containerDateAndTime}>
                  <View style={styles.containerDate}>
                    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <Rect x="4" y="5" width="16" height="16" rx="2" />
                      <Line x1="16" y1="3" x2="16" y2="7" />
                      <Line x1="8" y1="3" x2="8" y2="7" />
                      <Line x1="4" y1="11" x2="20" y2="11" />
                      <Line x1="11" y1="15" x2="12" y2="15" />
                      <Line x1="12" y1="15" x2="12" y2="18" />
                    </Svg>
                    <Text style={styles.partieDate}>{date}</Text>
                  </View>
                  <View style={styles.containerTime}>
                    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <Circle cx="12" cy="12" r="9" />
                      <Polyline points="12 7 12 12 15 15" />
                    </Svg>
                    <Text style={styles.partieDate}>{time}</Text>
                  </View>
                </View>
                <View style={styles.containerGagnant}>
                  <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <Line x1="8" y1="21" x2="16" y2="21" />
                    <Line x1="12" y1="17" x2="12" y2="21" />
                    <Line x1="7" y1="4" x2="17" y2="4" />
                    <Path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
                    <Circle cx="5" cy="9" r="2" />
                    <Circle cx="19" cy="9" r="2" />
                  </Svg>
                  <Text style={styles.partieEnCours}>Partie en cours</Text>
                </View>
                <View style={styles.containerJoueurs}>
                  <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <Circle cx="9" cy="7" r="4" />
                    <Path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <Path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                  </Svg>
                  <Text style={styles.partieJoueurs}>{liste_joueurs}</Text>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <Polyline points="9 6 15 12 9 18" />
                </Svg>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:20,
    backgroundColor: "#FFFFFF",
    width: "100%"
  },
  description: {
    marginLeft: 20,
    marginRight:20,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 14,
    color: "#24334c"
  },
  buttonContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  titrePage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#24334c",
  },
  scrollview: {
    width: "100%",
  },
  parties: {
    alignItems: "center"
  },
  partie: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#24334c",
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 10,
  },
  infosContainer: {
    width: "95%"
  },
  arrowContainer: {
    justifyContent: "column",
    justifyContent: "flex-end"
  },
  partieDate: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5
  },
  partieEnCours: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    textTransform: "uppercase",
  },
  containerJoueurs: {
    flexDirection: "row",
  },
  libeleJoueurs: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  partieJoueurs: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    width: "90%",
    marginLeft: 5,
  },
  containerDateAndTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerTime: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  containerGagnant: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
})
