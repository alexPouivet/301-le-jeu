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
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM game`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }, []);

  if (games === null || games.length === 0) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {games.map(({ game_id, date, liste_joueurs, statut, gagnant_game }, i) => (
        <View key={i}>
          <Text>{date}</Text>
          { statut == "finie" ?
            <Text>Gagnant: {gagnant_game}</Text>
            :
            <Text>Partie non finie</Text>
          }
          <Text>Participants: {liste_joueurs}</Text>
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
