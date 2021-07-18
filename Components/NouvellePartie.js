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

// Page Nouvelle partie
export default function NouvellePartie({ navigation }) {

  const [participants, onChangeParticipants] = React.useState("0");
  const [palets, onChangePalets] = React.useState("0");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Nouvelle partie</Text>
      <Text>Nombre de joueurs</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeParticipants}
        value={participants}
        keyboardType="numeric"
      />
      <Text>Nombre de palets par personnes</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePalets}
        value={palets}
        keyboardType="numeric"
      />
      <Button
        title="Continuer"
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
