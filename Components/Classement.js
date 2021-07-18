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

export default function Classement({ navigation, route }) {

  const {game_id } = route.params;
  const [game, setGame] = React.useState(null);
  const [classement, setClassement] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère le classement des joueurs
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setClassement(_array));
    });
  }, []);

  if (classement === null || classement.length === 0 || game === null || game.length === 0) {
    return null;
  }

  return(
    <View>
      {game.gagnant_game == null ?
        <Text>Partie non finie</Text>
        :
        <Text>{game.gagnant_game}</Text>
      }
      {classement.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
        <View key={i}>
          <Text>{classement_joueur == null ? i+1 : classement_joueur} | {nom_joueur} | {tour_joueur} | {score_joueur} points</Text>
        </View>
      ))}
      <Button
        title="Retourner à la partie"
        onPress={() => {
          navigation.goBack()
        }}
      />
    </View>
  )
}
