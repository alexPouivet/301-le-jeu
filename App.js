import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HistoriquePartie from './Components/Historique'
import NouvellePartie from './Components/NouvellePartie'
import CreerPartie from './Components/CreerPartie'
import DetailsPartie from './Components/DetailsPartie'
import ReprendrePartie from './Components/ReprendrePartie'
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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
        <Stack.Screen name="Creer partie" component={CreerPartie} />
        <Stack.Screen name="Reprendre une partie" component={ReprendrePartie} />
        <Stack.Screen name="Historique des parties" component={HistoriquePartie} />
        <Stack.Screen name="Details" component={DetailsPartie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

export default App;
