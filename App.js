import * as React from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Tabs from './Navigation/tabs';
import { ToastProvider } from 'react-native-toast-notifications'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import NouvellePartie from './Screens/Partie/NouvellePartie'
import CreerPartie from './Screens/Partie/CreerPartie'
import Partie from './Screens/Partie/Partie'
import GagnantPartie from './Screens/Partie/GagnantPartie'
import Classement from './Screens/Partie/Classement'
import FinDeTour from './Screens/Partie/FinDeTour'
import DetailsPartie from './Screens/Parties/DetailsPartie'

import openDatabase from './Components/OpenDatabase';
const db = openDatabase();

export default function App() {

  db.transaction((tx) => {
    tx.executeSql(" PRAGMA foreign_keys=on ");
    // création de la table game dans la bdd
    tx.executeSql(
      "DELETE FROM game"
    );
    // création de la table joueur dans la bdd
    tx.executeSql(
      "DELETE FROM joueur"
    );
    // création de la table joueurs dans la bdd
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS joueurs (joueur_id integer primary key not null, nom_joueur text, avatar_slug text, profil integer)"
    );
    // création de la table parties dans la bdd
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS parties (partie_id integer primary key not null, date text, horaire time, statut text, nb_palets int, nb_joueurs int, nb_joueurs_restant int, tour_partie int, gagnant_partie text, tour_joueur int)"
    );
    // création de la table infos_parties_joueurs dans la bdd
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS infos_parties_joueurs (infos_parties_joueurs_id integer primary key not null, partie_id integer references parties(partie_id), joueur_id integer references joueurs(joueur_id), score_joueur int, tour_joueur int, classement_joueur int, position_joueur int, position_joueur_en_cours int)"
    );

  });

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <ToastProvider
        offsetTop={40}
        duration={1125}
        successColor="#68B684"
        warningColor="#FF4B3E"
        successIcon={<Ionicons name='checkmark-circle' size={20} color="#ffffff"/>}
        warningIcon={<Ionicons name='warning-outline' size={20} color="#ffffff"/>}
      >
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
      </ToastProvider>
    </SafeAreaView>
  );
}
