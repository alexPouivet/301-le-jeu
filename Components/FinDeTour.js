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

export default function FinDeTour({ navigation, route }) {

  const {game_id } = route.params;

  const [joueurs, setJoueurs] = React.useState(null);
  const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from game where game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array));
      tx.executeSql(`select * from joueur where joueur.game_id = ? ORDER BY joueur.score_joueur asc`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

  if (game === null || game.length === 0 || joueurs === null || joueurs.length === 0) {
    return null;
  }

  return(
    <View>
    <Text>{game.game_id}</Text>
      <Text>Fin de Tour n° {game[0].tour_game}</Text>
      {joueurs.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
        <View key={i}>
          <Text>{nom_joueur} {score_joueur} {tour_joueur}</Text>
        </View>
      ))}
      <Button
        title="Tour Suivant"
        onPress={() => {
          updateGame(game_id).then(function(game_id) {
            navigation.push("Partie", {
              game_id: game_id,
            })
          })
        }}
      />
    </View>
  )
}

const updateGame = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE game SET tour_game = tour_game + 1 WHERE game_id = ?', [game_id]
      )
    })
    // Retourne l'id de la partie en cours
    resolve(game_id)
  })
}
