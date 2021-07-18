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

// Page Historique des parties
export default function HistoriquePartie({ navigation }) {

  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql('delete from game')
      // tx.executeSql('delete from joueur')
      // tx.executeSql('drop table game')
      // tx.executeSql('drop table joueur')
      tx.executeSql(`SELECT * FROM game`, [], (_, { rows: { _array } }) => setGames(_array));
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
          <Text>game id: {game_id}</Text>
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