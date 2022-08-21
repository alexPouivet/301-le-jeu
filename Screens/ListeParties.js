import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import SwipeableComponent from '../Components/SwipeableComponent';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import ListPartiesStyles from '../Constants/ListPartiesStyles';

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

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={[ListPartiesStyles.titrePage, { fontFamily: "Poppins-Medium" }]}>{statutFiltres["statut"]}</Text>
        <TouchableOpacity
          style={ListPartiesStyles.buttonRefresh}
          onPress={() => {
            onRefresh(statutFiltres);
          }}
        >
          <Ionicons name='ios-sync-outline' size={24} color="#252422"/>
        </TouchableOpacity>
        <ModalDropdown
          options={['Toutes les parties', 'Parties en Cours', 'Parties Terminées']}
          defaultIndex={0}
          style={ListPartiesStyles.buttonFiltres}
          dropdownStyle={ListPartiesStyles.dropdownStyle}
          dropdownTextStyle={ListPartiesStyles.dropdownTextStyle}
          dropdownTextHighlightStyle={ListPartiesStyles.dropdownTextHighlightStyle}
          onSelect={(index, value) => {
            filterParties(value);
          }}
        >
          <Ionicons name='ios-options-outline' size={24} color="#252422"/>
        </ModalDropdown>
      </View>
      { games === null || games.length === 0
        ?
        <View style={ListPartiesStyles.listEmptyContainer}>
          {
            statutFiltres["statut"] === "Parties Terminées"
            ?
              <Text style={ListPartiesStyles.listEmptyText}>Aucune partie n'a été terminée pour le moment</Text>
            :
              <Text style={ListPartiesStyles.listEmptyText}>Aucune partie créée</Text>
          }
        </View>
        :
        <ScrollView
          style={ListPartiesStyles.scrollview}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresh(statutFiltres)
              }}
            />
          }
        >
          <View style={ListPartiesStyles.parties}>
            {games.map(({ game_id, date, time, liste_joueurs, statut, gagnant_game }, i) => (
              <View style={ListPartiesStyles.partieContainer} key={i} >
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
