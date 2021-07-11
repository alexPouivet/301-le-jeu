import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

export default function App() {

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists game (game_id integer primary key not null, date datetime, statut text, nb_palets int, nb_joueurs int, tour_game int)"
      );
      tx.executeSql(
        "create table if not exists joueur (joueur_id integer primary key not null, game_id integer references game(game_id), nom_joueur text, score_joueur int, tour_joueur int, classement_joueur int)"
      );
    });
  }, []);

  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
