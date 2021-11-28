import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

import RefreshIcon from '../Components/Icons/refreshIcon'
import LogoIconBlue from '../Components/Icons/logoIconBlueBackground'
import CalendarIcon from '../Components/Icons/calendarIcon'
import ClockIcon from '../Components/Icons/clockIcon'
import TrophyIcon from '../Components/Icons/trophyIcon'
import UsersIcon from '../Components/Icons/usersIcon'
import ArrowRightIconWhite from '../Components/Icons/arrowRightIconWhite'

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

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

// Page Reprendre une partie en cours
export default function ReprendrePartie({ navigation }) {

  const [games, setGames] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      db.transaction((tx) => {
        // Recupère les données de toutes les parties
        tx.executeSql(`SELECT * FROM game ORDER BY date DESC, time DESC`, [], (_, { rows: { _array } }) => setGames(_array));
      });
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les parties dont le statut est en cours
      tx.executeSql(`SELECT * FROM game WHERE game.statut == "en cours" ORDER BY date DESC, time DESC`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if(games === null || games.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.titrePage}>Reprendre une partie</Text>
          <TouchableOpacity
            style={styles.buttonSupprimer}
            onPress={() => {
              onRefresh();
            }}
          >
            <RefreshIcon />
          </TouchableOpacity>
        </View>
        <Text>Pas de partie en cours disponible</Text>
        <Image
        style={styles.image}
        source={
          require('../images/illustrations/empty.png')}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.titrePage}>Reprendre une partie</Text>
        <TouchableOpacity
          style={styles.buttonSupprimer}
          onPress={() => {
            onRefresh();
          }}
        >
          <RefreshIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Reprenez une partie non terminée jouée précédemment</Text>
      { games === null || games.length === 0
      ?
      <Text>Pas de partie en cours disponible</Text>
      :
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.parties}>
          {games.map(({ game_id, date, time, liste_joueurs, statut, gagnant_game }, i) => (
            <TouchableOpacity key={i} style={styles.partie}
              onPress={() => navigation.navigate('Details', {
                game_id: game_id
              })}
            >
              <LogoIconBlue />
              <View style={styles.infosContainer}>
                <View style={styles.containerDateAndTime}>
                  <View style={styles.containerDate}>
                    <CalendarIcon />
                    <Text style={styles.partieDate}>{date}</Text>
                  </View>
                  <View style={styles.containerTime}>
                    <ClockIcon />
                    <Text style={styles.partieDate}>{time}</Text>
                  </View>
                </View>
                <View style={styles.containerGagnant}>
                  <TrophyIcon />
                  <Text style={styles.partieEnCours}>Partie en cours</Text>
                </View>
                <View style={styles.containerJoueurs}>
                  <UsersIcon />
                  <Text style={styles.partieJoueurs}>{liste_joueurs}</Text>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <ArrowRightIconWhite />
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
  image: {
    width: 210,
    height: 210,
    marginTop: 50,
    marginBottom: 10
  },
  buttonContainer: {
    marginBottom: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  buttonSupprimer: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:20,
  },
  titrePage: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: "auto",
    color: "#24334c",
    marginLeft:"25%",
    color: "#24334c",
    textAlign:"center",
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
    overflow: "hidden",
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
