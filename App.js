import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

// Components
import Parametres from './Components/Parametres'
import HistoriquePartie from './Components/Historique'
import NouvellePartie from './Components/NouvellePartie'
import CreerPartie from './Components/CreerPartie'
import DetailsPartie from './Components/DetailsPartie'
import ReprendrePartie from './Components/ReprendrePartie'
import Partie from './Components/Partie'
import GagnantPartie from './Components/GagnantPartie'
import Classement from './Components/Classement'
import FinDeTour from './Components/FinDeTour'

import PriseEnMain from './Components/PriseEnMain'
import Partager from './Components/Partager'
import Probleme from './Components/Probleme'

import SettingsIcon from './Components/Icons/settingsIcon'
import PlusIcon from './Components/Icons/plusIcon'
import LogoIcon from './Components/Icons/logoIcon'
import LogoIconPurpleBackground from './Components/Icons/logoIconPurpleBackground'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
      <Tab.Navigator initialRouteName="Accueil" screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#7159df',
          tabBarInactiveTintColor: '#24334c',
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;

            if (route.name === "Accueil") {
              iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
            } else if (route.name === "Historique") {
              iconName = focused
              ? 'ios-library'
              : 'ios-library-outline';
            } else if (route.name === "Reprendre") {
              iconName = focused
              ? 'ios-reload'
              : 'ios-reload-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
      })}>
        <Tab.Screen name="Historique" component={HistoriqueStackScreen} />
        <Tab.Screen name="Accueil" component={HomeStackScreen} />
        <Tab.Screen name="Reprendre" component={ReprendreStackScreen} />
      </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
const HistoriqueStack = createNativeStackNavigator();
const ReprendreStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Accueil} />
      <HomeStack.Screen name="Parametres" component={Parametres} />
      <HomeStack.Screen name="PriseEnMain" component={PriseEnMain} />
      <HomeStack.Screen name="Partager" component={Partager} />
      <HomeStack.Screen name="Probleme" component={Probleme} />
    </HomeStack.Navigator>
  );
}

function HistoriqueStackScreen() {
  return (
    <HistoriqueStack.Navigator screenOptions={{headerShown: false}}>
      <HistoriqueStack.Screen name="Historic" component={HistoriquePartie} />
      <HistoriqueStack.Screen name="Details" component={DetailsPartie} />
    </HistoriqueStack.Navigator>
  );
}

function ReprendreStackScreen() {
  return (
    <ReprendreStack.Navigator screenOptions={{headerShown: false}}>
      <ReprendreStack.Screen name="Reprendre partie" component={ReprendrePartie} />
      <ReprendreStack.Screen name="Details" component={DetailsPartie} />
    </ReprendreStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={{marginTop: StatusBar.currentHeight, flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={HomeTabs} initialRouteName={Accueil} />
          <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
          <Stack.Screen name="Creer partie" component={CreerPartie} />
          <Stack.Screen name="Partie" component={Partie} />
          <Stack.Screen name="Classement" component={Classement} />
          <Stack.Screen name="Fin de Tour" component={FinDeTour} />
          <Stack.Screen name="Gagnant Partie" component={GagnantPartie} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Page d'accueil
function Accueil({ navigation }) {
  return (
    <View style={styles.accueil}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.navigate("Parametres")
          }}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Text style={[styles.textPurple, styles.textLogo]}>Jeu du</Text>
        <LogoIcon />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Nouvelle partie')}
          style={[styles.buttons, styles.buttonViolet]}
        >
          <LogoIconPurpleBackground position="top-left"/>
          <PlusIcon />
          <Text style={[styles.text, styles.textWhite]}>Commencer une nouvelle partie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accueil: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "25%",
    marginBottom: "25%"
  },
  textLogo: {
    fontSize:25,
    marginBottom:10,
    fontWeight: "500"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:"auto",
    marginRight: 20
  },
  buttons: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    position: 'relative',
    overflow: "hidden"
  },
  buttonViolet: {
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
  buttonGrey: {
    backgroundColor: "rgba(243, 243, 243, 1)",
  },
  buttonDark: {
    backgroundColor: "rgba(36, 51, 76, 0.85)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    width: "50%",
    textAlign: "center"
  },
  textWhite: {
    color: "rgba(243, 243, 243, 1)"
  },
  textDark: {
    color: "rgba(36, 51, 76, 0.85)"
  },
  textPurple: {
    color: "rgba(89, 61, 218, 0.85)",
  }
})
