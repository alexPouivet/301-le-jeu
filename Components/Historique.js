import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

import RefreshIcon from '../Components/Icons/refreshIcon'
import LogoIconBlue from '../Components/Icons/logoIconBlueBackground'
import LogoIconPurple from '../Components/Icons/logoIconPurpleBackground'
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

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const db = openDatabase();

// Page Historique des parties
export default function HistoriquePartie({ navigation }) {

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
      // tx.executeSql('delete from game')
      // tx.executeSql('delete from joueur')
      // tx.executeSql('drop table game')
      // tx.executeSql('drop table joueur')
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM game ORDER BY date DESC, time DESC`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if(games === null || games.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.titrePage}>Historique des parties jouées</Text>
        </View>
        <Text>Pas de partie encore créée</Text>
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
        <Text style={styles.titrePage}>Historique des parties jouées</Text>
        <TouchableOpacity
          style={styles.buttonSupprimer}
          onPress={() => {
            onRefresh();
          }}
        >
          <RefreshIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Retrouvez toutes les parties jouées dans votre historique des parties</Text>
      { games === null || games.length === 0
        ?
        <Text>Pas de partie encore créée</Text>
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
              <TouchableOpacity key={i} style={[styles.partie, statut == "finie" ? styles.partieFinie : styles.partieNonFinie]}
                onPress={() => navigation.navigate('Details', {
                  game_id: game_id
                })}
              >
              {
                statut ==  "finie"
                ?
                  <LogoIconPurple />
                :
                  <LogoIconBlue />
              }
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
                    { statut == "finie"
                    ?
                      <Text style={styles.partieGagnant}>{gagnant_game}</Text>
                    :
                      <Text style={styles.partieEnCours}>Partie en cours</Text>
                    }
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
  image: {
    width: 210,
    height: 210,
    marginTop: 50,
    marginBottom: 10
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
    marginBottom: 25,
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
    marginLeft:"14%",
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
    position: "relative",
    overflow: "hidden",
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
  partieFinie: {
    backgroundColor: "#7159df",
  },
  partieNonFinie: {
    backgroundColor: "#24334c",
  },
  partieDate: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5
  },
  containerGagnant: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  libeleGagnant: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  partieGagnant: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
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
    fontSize: 14,
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
  }
})
