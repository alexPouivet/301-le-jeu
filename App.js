import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import HistoriquePartie from './Components/Historique'
import NouvellePartie from './Components/NouvellePartie'
import CreerPartie from './Components/CreerPartie'
import DetailsPartie from './Components/DetailsPartie'
import ReprendrePartie from './Components/ReprendrePartie'
import Partie from './Components/Partie'
import Classement from './Components/Classement'
import FinDeTour from './Components/FinDeTour'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
        <Stack.Screen name="Creer partie" component={CreerPartie} />
        <Stack.Screen name="Partie" component={Partie} />
        <Stack.Screen name="Classement" component={Classement} />
        <Stack.Screen name="Reprendre une partie" component={ReprendrePartie} />
        <Stack.Screen name="Historique des parties" component={HistoriquePartie} />
        <Stack.Screen name="Details" component={DetailsPartie} />
        <Stack.Screen name="Fin de Tour" component={FinDeTour} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Page d'accueil
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
