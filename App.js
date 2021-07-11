// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

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

function Accueil({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Jeu du 301</Text>
      <Button
        title="Nouvelle partie"
        onPress={() => navigation.navigate('Nouvelle partie')}
      />
      <Button
        title="Reprendre une partie"
        onPress={() => navigation.navigate('Reprendre une partie')}
      />
      <Button
        title="Historique des parties"
        onPress={() => navigation.navigate('Historique des parties')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
        <Stack.Screen name="Creer partie" component={CreatePartie} />
        <Stack.Screen name="Reprendre une partie" component={ReprendrePartie} />
        <Stack.Screen name="Historique des parties" component={HistoriquePartie} />
        <Stack.Screen name="Details" component={DetailsGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function NouvellePartie({ navigation }) {

  const [participants, onChangeParticipants] = React.useState("");
  const [palets, onChangePalets] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ecran créer une nouvelle partie</Text>
      <Text>Nombre de participants</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeParticipants}
        value={participants}
        keyboardType="numeric"
      />
      <Text>Nombre de palets par personne</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePalets}
        value={palets}
        keyboardType="numeric"
      />
      <Button
        title="Créer une nouvelle partie"
        onPress={() => navigation.navigate('Creer partie', {
          nb_participants: participants,
          nb_palets: palets,
        })}
      />

      <Button
        title="Retourner à l'accueil"
        onPress={() => navigation.navigate('Accueil')}
      />
    </View>
  );
}

function create(participants, nb_participants, nb_palets) {

  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var hour = new Date().getHours()
  var minutes = new Date().getMinutes()
  var seconds = new Date().getSeconds()

  let time = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds

  let liste_joueurs = ""

  for(let i =0; i < nb_participants; i++) {
    if(i == nb_participants -1) {
      liste_joueurs += participants[i].props["children"]["props"]["value"]
    } else {
      liste_joueurs += participants[i].props["children"]["props"]["value"] + ", "
    }
  }

  db.transaction((tx) => {
    tx.executeSql("PRAGMA foreign_keys=on");
    tx.executeSql(
      "create table if not exists game (game_id integer primary key not null, date datetime, statut text, nb_palets int, nb_joueurs int, tour_game int, liste_joueurs text, gagnant_game text)"
    );
    tx.executeSql(
      "create table if not exists joueur (joueur_id integer primary key not null, game_id integer references game(game_id), nom_joueur text, score_joueur int, tour_joueur int, classement_joueur int)"
    );
    tx.executeSql(
      "insert into game (date, statut, nb_palets, nb_joueurs, tour_game, liste_joueurs) values (?, ?, ?, ?, ?, ?)", [time, 'en cours', nb_participants, nb_palets, 1, liste_joueurs],
      function(tx, res) {
        for(let i = 0; i < nb_participants; i++ ){
          tx.executeSql(
            "insert into joueur (game_id, nom_joueur, score_joueur, tour_joueur) values (?, ?, ?, ?)", [res.insertId, participants[i].props["children"]["props"]["value"], 301, 1]
          );
        };
      }
    );
  });
}

function CreatePartie({ route, navigation }) {

  const { nb_participants, nb_palets } = route.params;

  let participants = [];

  for(let i = 0; i < nb_participants; i++) {

    const [participant, onChangeParticipant] = React.useState("");

    participants.push(
      <View key = {i}>
        <TextInput
          style={styles.input}
          value={participant}
          onChangeText={onChangeParticipant}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Noms des participants</Text>
      <Text>{nb_participants}</Text>
      <Text>{nb_palets}</Text>
      { participants }
      <Button
        title="Retourner à l'accueil"
        // récupère la value du textInput à travers l'objet participants
        onPress={() => {
          create(participants, nb_participants, nb_palets)
          navigation.navigate('Accueil')
        }}
      />
    </View>
  );
}

function ReprendrePartie({ navigation }) {

  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from game where game.statut == "en cours"`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if (games === null || games.length === 0) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ecran reprendre une partie</Text>
      {games.map(({ game_id, nb_joueurs, date, nb_palets, liste_joueurs, statut }, i) => (
        <View key={i}>
          <Text>statut: {statut}</Text>
          <Text>nb joueurs: {nb_joueurs}</Text>
          <Text>nb palets: {nb_palets}</Text>
          <Text>joueurs: {liste_joueurs}</Text>
          <Text>date: {date}</Text>
          <Button
            title="Détails partie"
            onPress={() => navigation.navigate('Details', {
              game_id: game_id
            })}
          />
        </View>
      ))}
      <Button
        title="Retourner à l'accueil"
        onPress={() => navigation.navigate('Accueil')}
      />
    </View>
  );
}

function HistoriquePartie({ navigation }) {

  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from game`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if (games === null || games.length === 0) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ecran historique des parties</Text>
      {games.map(({ game_id, nb_joueurs, date, nb_palets, liste_joueurs, statut }, i) => (
        <View key={i}>
          <Text>statut: {statut}</Text>
          <Text>nb joueurs: {nb_joueurs}</Text>
          <Text>nb palets: {nb_palets}</Text>
          <Text>joueurs: {liste_joueurs}</Text>
          <Text>date: {date}</Text>
          <Button
            title="Détails partie"
            onPress={() => navigation.navigate('Details', {
              game_id: game_id
            })}
          />
        </View>
      ))}
      <Button
        title="Retourner à l'accueil"
        onPress={() => navigation.navigate('Accueil')}
      />
    </View>
  );
}

function DetailsGame({ navigation, route }) {

  const {game_id } = route.params;
  const [partie, setPartie] = React.useState(null);
  const [joueurs, setJoueurs] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from game where game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setPartie(_array));
      tx.executeSql(`select * from joueur where joueur.game_id = ?`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

  if (partie === null || partie.length === 0 || joueurs === null || joueurs.length === 0) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ecran détails d'une partie</Text>
      <Text>game id: {partie[0].liste_joueurs}</Text>
      {joueurs.map(({ nom_joueur, score_joueur, tour_joueur }, i) => (
        <View key={i}>
          <Text>{nom_joueur}, {score_joueur}, {tour_joueur}</Text>
        </View>
      ))}
      <Button
        title="Retourner à l'historique"
        onPress={() => navigation.navigate('Historique des parties')}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
