import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
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

// Page Reprendre une partie en cours
export default function ReprendrePartie({ navigation }) {

  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les parties dont le statut est en cours
      tx.executeSql(`SELECT * FROM game WHERE game.statut == "en cours" ORDER BY date DESC`, [], (_, { rows: { _array } }) => setGames(_array));
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
            <TouchableOpacity key={i} style={styles.partie}
              onPress={() => navigation.navigate('Details', {
                game_id: game_id
              })}
            >
              <View style={styles.infosContainer}>
                <Text style={styles.partieDate}>{date}</Text>
                <Text style={styles.partieEnCours}>Partie non finie</Text>
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
    backgroundColor: "rgba(36, 51, 76, 0.85)",
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
