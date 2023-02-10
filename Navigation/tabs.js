import React, { useCallback, useState, useEffect } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import Parties from '../Screens/Parties/Parties'
import DetailsPartie from '../Screens/Parties/DetailsPartie'

import Joueurs from '../Screens/Joueurs/Joueurs'
import DetailsJoueur from '../Screens/Joueurs/DetailsJoueur'
import ClassementJoueurs from '../Screens/Joueurs/ClassementJoueurs'
import ModifierJoueur from '../Screens/Joueurs/ModifierJoueur'
import CreerProfil from '../Screens/Joueurs/CreerProfil'
import ProfilVide from '../Screens/Joueurs/ProfilVide'

import NouvellePartie from '../Screens/Partie/NouvellePartie'
import CreerPartie from '../Screens/Partie/CreerPartie'

import Parametres from '../Screens/Parametres/Parametres'
import Partager from '../Screens/Parametres/Partager'
import Probleme from '../Screens/Parametres/Probleme'
import Logs from '../Screens/Parametres/Logs'
import Configuration from '../Screens/Parametres/Configuration'
import Nouveautes from '../Screens/Parametres/Nouveautes'

const Tab = createBottomTabNavigator();
const PartieStack = createNativeStackNavigator();
const ParametresStack = createNativeStackNavigator();
const PartiesStack = createNativeStackNavigator();
const JoueursStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

function PartiesStackScreen() {
  return (
    <PartiesStack.Navigator screenOptions={{headerShown: false}}>
      <PartiesStack.Screen name="Liste Parties" component={Parties} />
      <PartiesStack.Screen name="Details Partie" component={DetailsPartie} />
    </PartiesStack.Navigator>
  );
}

function JoueursStackScreen() {
  return (
    <JoueursStack.Navigator screenOptions={{headerShown: false}}>
      <JoueursStack.Screen name="Liste Joueurs" component={Joueurs} />
      <JoueursStack.Screen name="Details Joueur" component={DetailsJoueur} />
      <JoueursStack.Screen name="Classement Joueurs" component={ClassementJoueurs} />
      <PartiesStack.Screen name="Details Partie" component={DetailsPartie} />
      <JoueursStack.Screen name="Modifier Joueur" component={ModifierJoueur} />
    </JoueursStack.Navigator>
  );
}

function PartieStackScreen() {
  return (
    <PartieStack.Navigator screenOptions={{headerShown: false}}>
      <PartieStack.Screen name="Creer partie" component={CreerPartie} />
      <PartieStack.Screen name="Nouvelle Partie" component={NouvellePartie}/>
      <PartieStack.Screen name="Partie" component={Partie} />
    </PartieStack.Navigator>
  );
}

function ParametresStackScreen() {
	return (
    <ParametresStack.Navigator screenOptions={{headerShown: false}}>
      <ParametresStack.Screen name="Parametres" component={Parametres} />
      <ParametresStack.Screen name="Partager" component={Partager} />
      <ParametresStack.Screen name="Probleme" component={Probleme} />
      <ParametresStack.Screen name="Configuration" component={Configuration} />
      <ParametresStack.Screen name="Nouveautés" component={Nouveautes} />
      <ParametresStack.Screen name="Logs" component={Logs} />
    </ParametresStack.Navigator>
  );
}

function ProfilStackScreen() {

  const [isProfil, setIsProfil] = useState(null);

  useEffect(() => {

      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM joueurs WHERE joueurs.profil = ?`, [1], (_, { rows: { _array } }) => {

          if (_array[0] !== undefined) {

            setIsProfil("profil");

          } else {
            setIsProfil("none");
          }

        })
      });

  }, [])

  if(isProfil == "profil") {

    return (
      <ProfilStack.Navigator screenOptions={{headerShown: false}}>
        <ProfilStack.Screen name="Details Joueur" component={DetailsJoueur} />
        <ProfilStack.Screen name="Details Partie" component={DetailsPartie} />
        <ProfilStack.Screen name="Modifier Joueur" component={ModifierJoueur} />
      </ProfilStack.Navigator>
    );

  } else if(isProfil == "none") {

    return (
      <ProfilStack.Navigator screenOptions={{headerShown: false}}>
      <ProfilStack.Screen name="Profil Vide" component={ProfilVide} />
        <ProfilStack.Screen name="Créer Profil" component={CreerProfil} />
      </ProfilStack.Navigator>
    );

  }
}

const Tabs = () => {
	return(
		<Tab.Navigator
			initialRouteName="Parties"
			screenOptions={({ route }) => ({
          		headerShown: false,

      		})}
		>
        <Tab.Screen name="Parties" component={PartiesStackScreen} options={{
        	tabBarActiveTintColor: '#7159df',
        	tabBarInactiveTintColor: '#24334c',
          unmountOnBlur: true,
        	tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            iconName = focused
              ? 'ios-layers'
              : 'ios-layers-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }} />
        <Tab.Screen name="Joueurs" component={JoueursStackScreen} options={{
        	tabBarActiveTintColor: '#7159df',
        	tabBarInactiveTintColor: '#24334c',
          unmountOnBlur: true,
        	tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            iconName = focused
              ? 'ios-people'
              : 'ios-people-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }} />
        <Tab.Screen name="Nouvelle partie" component={NouvellePartie}

        	options={{
  			  	tabBarLabel: () => null,
            unmountOnBlur: true,
  			  	tabBarStyle: {
              display: "none"
            },
        		tabBarIcon: () => { return <Ionicons name='ios-add-circle' size={48} color="#7159df" />; },
        	}}
        	tabBarOptions={{
    			showLabel: false,
    		}}
        />
        <Tab.Screen name="Paramètres" component={ParametresStackScreen} options={{
        	tabBarActiveTintColor: '#7159df',
        	showLabel: false,
          unmountOnBlur: true,
        	tabBarInactiveTintColor: '#24334c',
        	tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            iconName = focused
              ? 'ios-settings'
              : 'ios-settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
    		  }
    		}}/>
        <Tab.Screen name="Profil" component={ProfilStackScreen} options={{
        	tabBarActiveTintColor: '#7159df',
        	tabBarInactiveTintColor: '#24334c',
          unmountOnBlur: true,
        	tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            iconName = focused
              ? 'ios-person-circle'
              : 'ios-person-circle-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }} />
      </Tab.Navigator>
	);
}

export default Tabs;
