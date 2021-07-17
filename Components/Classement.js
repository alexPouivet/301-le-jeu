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

  const [classement, setClassement] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setClassement(_array));
    });
  }, []);

  if (classement === null || classement.length === 0) {
    return null;
  }

  return(
    <View>
      <Text>Classement partie</Text>
      <Text>game_id: {game_id}</Text>
      {classement.map(({ nom_joueur, score_joueur }, i) => {
        return score_joueur == 0 ?
        <Text key={i}>Gagnant: {nom_joueur}</Text>
        :
        <Text key={i}>Partie en cours</Text>
      })}
      {classement.map(({ nom_joueur, score_joueur, tour_joueur, classement_joueur }, i) => (
        <View key={i}>
          <Text>{nom_joueur} {score_joueur} {tour_joueur}</Text>
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
