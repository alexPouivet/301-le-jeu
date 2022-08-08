import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import Swipeable from 'react-native-swipeable';
import SwipeableComponent from '../Components/SwipeableComponent';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

// Page Historique des parties
export default function ListeParties({ navigation }) {

  const [games, setGames] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [statutFiltres, setStatutFiltres] = useState({
    "statut": "Toutes les parties"
  });

  const onRefresh = useCallback((statutFiltres) => {

    setRefreshing(true);

    wait(500).then(() => {
      if (statutFiltres["statut"] == 'Toutes les parties') {
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM game ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
        });
      } else if (statutFiltres["statut"] == 'Parties en Cours'){
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM game WHERE game.statut == "en cours" ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
      });
      } else {
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM game WHERE game.statut == "finie" ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
        });
      }
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM game ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  const filterParties = useCallback((value) => {

    const newStatut = { ...statutFiltres };
    newStatut["statut"] = value;
    setStatutFiltres(newStatut);

    if (value == 'Toutes les parties') {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM game ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
      });
    } else if (value == 'Parties en Cours'){
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM game WHERE game.statut == "en cours" ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
      });
    } else {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM game WHERE game.statut == "finie" ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
      });
    }
  }, [statutFiltres]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.titrePage}>{statutFiltres["statut"]}</Text>
        <TouchableOpacity
          style={styles.buttonRefresh}
          onPress={() => {
            onRefresh(statutFiltres);
          }}
        >
          <Ionicons name='ios-sync-outline' size={24} color="#252422"/>
        </TouchableOpacity>
        <ModalDropdown
          options={['Toutes les parties', 'Parties en Cours', 'Parties Terminées']}
          defaultIndex={0}
          style={styles.buttonFiltres}
          dropdownStyle={styles.dropdownStyle}
          dropdownTextStyle={{marginLeft: 16, marginRight: 32, marginVertical: 4, fontSize: 16}}
          dropdownTextHighlightStyle={{color: "#252422"}}
          onSelect={(index, value) => {
            filterParties(value);
          }}
        >
          <Ionicons name='ios-options-outline' size={24} color="#252422"/>
        </ModalDropdown>
      </View>
      { games === null || games.length === 0
        ?
        <View style={{height:"100%", marginTop: 32, marginHorizontal: 16}}>
          {
            statutFiltres["statut"] === "Parties Terminées"
            ?
              <Text style={{textAlign: "center", fontSize: 16}}>Aucune partie n'a été terminée pour le moment</Text>
            :
              <Text style={{textAlign: "center", fontSize: 16}}>Aucune partie créée</Text>
          }
        </View>
        :
        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresh(statutFiltres)
              }}
            />
          }
        >
          <View style={styles.parties}>
            {games.map(({ game_id, date, time, liste_joueurs, statut, gagnant_game }, i) => (
              <View style={styles.partieContainer} key={i} >
                <SwipeableComponent setGames={setGames} statutFiltres={statutFiltres} game_id={game_id} date={date} time={time} liste_joueurs={liste_joueurs} statut={statut} gagnant_game={gagnant_game} navigation={navigation} db={db}/>
              </View>
            ))}
          </View>
        </ScrollView>
      }
    </View>
  );
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
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
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  titrePage: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: "auto",
    color: "#252422",
    marginLeft: 16,
  },
  buttonRefresh: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:12,
  },
  buttonFiltres: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:16,
  },
  dropdownStyle: {
    width: "auto",
    height: "auto",
    marginTop: 12,
    marginRight: -9,
    borderRadius: 10,
    paddingVertical: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.125,
    shadowRadius: 5,
  },
  scrollview: {
    width: "100%",
    height: "100%"
  },
  parties: {
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 120
  },
  partieContainer: {
    borderRadius: 16,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.125,
    shadowRadius: 5,
  }
})
