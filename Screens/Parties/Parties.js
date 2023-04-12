import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, SectionList, Platform } from 'react-native';

// Packages
import { useToast } from "react-native-toast-notifications";
import Lottie from 'lottie-react-native';
import SwitchSelector from "react-native-switch-selector";

// Styles
import PartiesStyles from '../../Constants/Parties/PartiesStyles';
import GlobalStyles from '../../Constants/GlobalStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import ItemPartie from '../../Components/Parties/ItemPartie';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Liste des Parties
export default function Parties({ navigation }) {

  const [fontsLoaded] = font();
  const [games, setGames] = useState(null);
  const [listGames, setListGames] = useState(null);
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

        filtrerTout(setGames, setListGames, db);

      } else if (statutFiltres["statut"] == 'Parties en Cours'){

        filtrerEnCours(setGames, setListGames, db);

      } else {

        filtrerTerminees(setGames, setListGames, db);

      }
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => filtrerTout(setGames,setListGames, db));

    filtrerTout(setGames, setListGames, db);
  }, []);

  const filterParties = useCallback((value) => {

    const newStatut = { ...statutFiltres };
    newStatut["statut"] = value;
    setStatutFiltres(newStatut);

    if (value == 'Toutes les parties') {

      filtrerTout(setGames, setListGames, db);


    } else if (value == 'Parties en Cours'){

      filtrerEnCours(setGames, setListGames, db);

    } else {

      filtrerTerminees(setGames, setListGames, db);

    }
  }, [statutFiltres]);

  const options = [
    { label: "en cours", value: "Parties en Cours", customIcon: <IconComponent name="hourglass" size="20" color={ statutFiltres["statut"] === "Parties en Cours" ? "#fff" : "#7159DF" } /> },
    { label: "Tout", value: "Toutes les parties", customIcon: <IconComponent name="layer-bold" size="20" color={ statutFiltres["statut"] === "Toutes les parties" ? "#fff" : "#7159DF" } /> },
    { label: "terminées", value: "Parties Terminées", customIcon: <IconComponent name="flag" size="20" color={ statutFiltres["statut"] === "Parties Terminées" ? "#fff" : "#7159DF" } /> }
  ];

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
        textColor="#7159DF"
        buttonColor="#7159DF"
        initial={1}
        backgroundColor="#f3f3f3"
        height={48}
        options={options}
        onPress={value => filterParties(value)}
      />

      { games === null || games.length === 0
        ?
        <View style={PartiesStyles.listEmptyContainer}>
          {
            statutFiltres["statut"] === "Parties Terminées"
            ?
              <View style={{marginTop: "auto", marginBottom: "auto", alignItems: "center"}}>
                <Lottie style={{ width: 210, height: 210}} source={require('../../assets/animations/floating-palet.json')} autoPlay loop />
                <Text style={PartiesStyles.listEmptyText}>Aucune partie n'a été terminée pour le moment.</Text>
              </View>
            :
              statutFiltres["statut"] === "Parties en Cours"
              ?
              <View style={{marginTop: "auto", marginBottom: "auto", alignItems: "center"}}>
                <Lottie style={{ width: 210, height: 210}} source={require('../../assets/animations/floating-palet.json')} autoPlay loop />
                <Text style={PartiesStyles.listEmptyText}>Aucune partie en cours n'a été créée.</Text>
              </View>
              :

              <View style={{marginTop: "auto", marginBottom: "auto", alignItems: "center"}}>
                <Lottie style={{ width: 210, height: 210}} source={require('../../assets/animations/floating-palet.json')} autoPlay loop />
                <Text style={PartiesStyles.listEmptyText}>Aucune partie créée pour le moment.</Text>
              </View>
          }
        </View>
        :
        <SectionList
          sections ={ games }
          refreshing={ refreshing }
          onRefresh={ () => onRefresh(statutFiltres) }
          style={ PartiesStyles.partiesContainer }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={ PartiesStyles.sectionHeader }>{title}</Text>
          )}
          renderItem={({item, index}) => (
            <ItemPartie onRefresh={onRefresh} key={index} toast={toast} gagnant={item.gagnant_partie} avatars={item.avatars} setGames={setGames} statutFiltres={statutFiltres} game_id={item.partie_id} date={item.date} time={item.horaire} nbJoueurs={item.nb_joueurs} statut={item.statut} gagnant_game={item.gagnant_game} listerGames={listerGames} setListGames={setListGames} navigation={navigation} db={db}/>
          )}
        />
      }

    </View>
  );
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function listerGames(setListGames, games) {

  let listGames = [];

  if ( games === null || games.length === 0 ) {

    return games;

  }

  else {

    games.forEach((item, index) => {

      let date = item.date.split('/');
      let newDate = new Date();
      newDate.setMonth( date[1] - 1);
      newDate.setYear(date[2])

      let convertedDate = newDate.toLocaleString('fr-FR', {
      month: 'long',
      year: "numeric"
    });

    if ( Platform.OS === "android") {

      let month = convertedDate.split(' ');

      convertedDate = month[1] + " " + newDate.getFullYear();

    }

      let newItem = {
        title: convertedDate,
        date: item.date,
        data: [ item ]
      }

      if ( listGames.length == 0 && index == 0 ) {

        listGames.push(newItem)

      }

      if ( index !== 0 ) {

        if (listGames.some(listItem => listItem.title === convertedDate)) {

          let i = listGames.findIndex(listItem => listItem.title === convertedDate);

          listGames[i]["data"].push(item)

        } else {

          listGames.push(newItem)

        }

      }

    });

    var sortedList = listGames.sort(function(a, b) {

      a = a.date.split("/");
      b = b.date.split("/");

      if (a[2] !== b[2]) {
        return a[2] - b[2];
      } else {
        return a[1] - b[1];
      }

    });

    sortedList.forEach(item => {

      item.data.sort(function(a, b) {

        a = a.date.split("/");
        b = b.date.split("/");

        if (a[0] !== b[0]) {
          return b[0] - a[0];
        }

      })

    })

    return sortedList.reverse();

  }

}

function filtrerTout(setGames, setListGames, db) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT parties.partie_id, parties.date, parties.horaire, parties.nb_joueurs, parties.statut, parties.gagnant_partie, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
          FROM parties
          INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
          INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
          GROUP BY infos_parties_joueurs.partie_id
          ORDER BY parties.partie_id DESC`
        , [], (_, { rows: { _array } }) => { setGames(listerGames(setListGames, _array)) });
    });
}

function filtrerEnCours(setGames, setListGames, db) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT parties.partie_id, parties.date, parties.horaire, parties.nb_joueurs, parties.statut, parties.gagnant_partie, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
        FROM parties
        INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
        INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
        WHERE parties.statut == "en cours"
        GROUP BY infos_parties_joueurs.partie_id
        ORDER BY parties.partie_id DESC`
      , [], (_, { rows: { _array } }) => { setGames(listerGames(setListGames, _array)) });
  });
}

function filtrerTerminees(setGames, setListGames, db) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT parties.partie_id, parties.date, parties.horaire, parties.nb_joueurs, parties.statut, parties.gagnant_partie, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
        FROM parties
        INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
        INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
        WHERE parties.statut == "finie"
        GROUP BY infos_parties_joueurs.partie_id
        ORDER BY parties.partie_id DESC`
      , [], (_, { rows: { _array } }) => { setGames(listerGames(setListGames, _array)) });
  });
}
