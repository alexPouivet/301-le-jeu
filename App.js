import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './Navigation/tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import NouvellePartie from './Screens/NouvellePartie'
import CreerPartie from './Screens/CreerPartie'
import Partie from './Screens/Partie'
import GagnantPartie from './Screens/GagnantPartie'
import Classement from './Screens/Classement'
import FinDeTour from './Screens/FinDeTour'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
          <Stack.Screen name="Creer partie" component={CreerPartie} />
          <Stack.Screen name="Partie" component={Partie} />
          <Stack.Screen name="Classement" component={Classement} />
          <Stack.Screen name="Fin de Tour" component={FinDeTour} />
          <Stack.Screen name="Gagnant Partie" component={GagnantPartie} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
