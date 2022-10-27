import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, FlatList } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import SwitchSelector from "react-native-switch-selector";
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import PartiesStyles from '../../Constants/Parties/PartiesStyles';
import GlobalStyles from '../../Constants/GlobalStyles';

// Components
import ItemPartie from '../../Components/Parties/ItemPartie';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Liste des Parties
export default function Parties({ navigation }) {

  const [games, setGames] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [statutFiltres, setStatutFiltres] = useState({
    "statut": "Toutes les parties"
  });
  const toast = useToast();

  const onRefresh = useCallback((statutFiltres) => {

    setRefreshing(true);

    wait(500).then(() => {
      if (statutFiltres["statut"] == 'Toutes les parties') {

        filtrerTout(setGames, db);

      } else if (statutFiltres["statut"] == 'Parties en Cours'){

        filtrerEnCours(setGames, db);

      } else {

        filtrerTerminees(setGames, db);

      }
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => filtrerTout(setGames, db));

    filtrerTout(setGames, db);
  }, []);

  const filterParties = useCallback((value) => {

    const newStatut = { ...statutFiltres };
    newStatut["statut"] = value;
    setStatutFiltres(newStatut);

    if (value == 'Toutes les parties') {

      filtrerTout(setGames, db);

    } else if (value == 'Parties en Cours'){

      filtrerEnCours(setGames, db);

    } else {

      filtrerTerminees(setGames, db);

    }
  }, [statutFiltres]);

  const options = [
    { label: "en cours", value: "Parties en Cours" },
    { label: "Tout", value: "Toutes les parties" },
    { label: "terminées", value: "Parties Terminées" }
  ];

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>

      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={GlobalStyles.textHeaderTitle}>Parties</Text>
      </View>

      <SwitchSelector
        style={PartiesStyles.switchSelector}
        selectedTextStyle={PartiesStyles.switchSelectedText}
        selectedColor="#ffffff"
        textStyle={PartiesStyles.switchText}
        textColor="#7159DF"//'#7a44cf'
        buttonColor="#7159DF"
        initial={1}
        options={options}
        onPress={value => filterParties(value)}
      />

      { games === null || games.length === 0
        ?
        <View style={PartiesStyles.listEmptyContainer}>
          {
            statutFiltres["statut"] === "Parties Terminées"
            ?
              <Text style={PartiesStyles.listEmptyText}>Aucune partie n'a été terminée pour le moment</Text>
            :
              statutFiltres["statut"] === "Parties En Cours"
              ?
                <Text style={PartiesStyles.listEmptyText}>Aucune partie en cours</Text>
              :
                <Text style={PartiesStyles.listEmptyText}>Aucune partie créée</Text>
          }
        </View>
        :
        <FlatList
          data={ games }
          refreshing={ refreshing }
          onRefresh={ () => onRefresh(statutFiltres) }
          style={ PartiesStyles.partiesContainer }
          renderItem={({item, index}) => (
            <ItemPartie toast={toast} avatars={item.avatars} setGames={setGames} statutFiltres={statutFiltres} game_id={item.partie_id} date={item.date} time={item.horaire} statut={item.statut} gagnant_game={item.gagnant_game} navigation={navigation} db={db}/>
          )}
        />
      }

    </View>
  );
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function filtrerTout(setGames, db) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT parties.partie_id, parties.date, parties.horaire, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
        FROM parties
        INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
        INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
        GROUP BY infos_parties_joueurs.partie_id
        ORDER BY parties.partie_id DESC`
      , [], (_, { rows: { _array } }) => { setGames(_array) });
  });
}

function filtrerEnCours(setGames, db) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT parties.partie_id, parties.date, parties.horaire, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
        FROM parties
        INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
        INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
        WHERE parties.statut == "en cours"
        GROUP BY infos_parties_joueurs.partie_id
        ORDER BY parties.partie_id DESC`
      , [], (_, { rows: { _array } }) => { setGames(_array) });
  });
}

function filtrerTerminees(setGames, db) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT parties.partie_id, parties.date, parties.horaire, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
        FROM parties
        INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
        INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
        WHERE parties.statut == "finie"
        GROUP BY infos_parties_joueurs.partie_id
        ORDER BY parties.partie_id DESC`
      , [], (_, { rows: { _array } }) => { setGames(_array) });
  });
}
