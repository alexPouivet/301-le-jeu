import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
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

// Page Historique des parties
export default function HistoriquePartie({ navigation }) {

  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql('delete from game')
      // tx.executeSql('delete from joueur')
      // tx.executeSql('drop table game')
      // tx.executeSql('drop table joueur')
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM game ORDER BY date DESC`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if (games === null || games.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.navigate("Accueil")
          }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334C" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Polyline points="15 6 9 12 15 18" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Historique des parties jouées</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.parties}>
          {games.map(({ game_id, date, liste_joueurs, statut, gagnant_game }, i) => (
            <TouchableOpacity key={i} style={[styles.partie, statut == "finie" ? styles.partieFinie : styles.partieNonFinie]}
              onPress={() => navigation.navigate('Details', {
                game_id: game_id
              })}
            >
              <View style={styles.infosContainer}>
                <Text style={styles.partieDate}>{date}</Text>
                { statut == "finie" ?
                  <View style={styles.containerGagnant}>
                    <Svg style={{ justifyContent: "center", marginRight: 5}} xmlns="http://www.w3.org/2000/svg" width="18.084" height="16.075" viewBox="0 0 18.084 16.075">
                      <Path id="Icon_awesome-trophy" data-name="Icon awesome-trophy" d="M17.331,2.009H14.066V.754A.752.752,0,0,0,13.312,0H4.772a.752.752,0,0,0-.754.754V2.009H.754A.752.752,0,0,0,0,2.763V4.521A4.1,4.1,0,0,0,1.943,7.683,7.355,7.355,0,0,0,5.4,8.992,6.945,6.945,0,0,0,7.535,11.3v2.261H6.028a1.812,1.812,0,0,0-2.009,1.758V15.7a.378.378,0,0,0,.377.377h9.293a.378.378,0,0,0,.377-.377v-.377a1.812,1.812,0,0,0-2.009-1.758H10.549V11.3a6.945,6.945,0,0,0,2.138-2.311,7.33,7.33,0,0,0,3.454-1.309,4.106,4.106,0,0,0,1.943-3.162V2.763A.752.752,0,0,0,17.331,2.009ZM3.118,6.053A2.309,2.309,0,0,1,2.009,4.521v-.5H4.025a11.276,11.276,0,0,0,.4,2.706,5.06,5.06,0,0,1-1.309-.672ZM16.075,4.521a2.412,2.412,0,0,1-1.108,1.532,5.079,5.079,0,0,1-1.312.672,11.277,11.277,0,0,0,.4-2.706h2.019Z" fill="#fff"/>
                    </Svg>
                    <Text style={styles.libeleGagnant}>Gagnant: </Text>
                    <Text style={styles.partieGagnant}>{gagnant_game}</Text>
                  </View>
                  :
                  <Text style={styles.partieEnCours}>Partie non finie</Text>
                }
                <View style={styles.containerJoueurs}>
                  <Text style={styles.libeleJoueurs}>Participants: </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:10,
    backgroundColor: "#FFFFFF",
    width: "100%"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
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
  },
  infosContainer: {
    width: "95%"
  },
  arrowContainer: {
    justifyContent: "column",
    justifyContent: "flex-end"
  },
  partieFinie: {
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
  partieNonFinie: {
    backgroundColor: "rgba(36, 51, 76, 0.85)",
  },
  partieDate: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  containerGagnant: {
    flexDirection: "row",
  },
  libeleGagnant: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  partieGagnant: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  partieEnCours: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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
    width: "70%"
  }
})
