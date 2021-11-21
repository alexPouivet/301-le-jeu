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

// function App() {
//   return (
//     <SafeAreaProvider style={{marginTop: StatusBar.currentHeight, flex: 1}}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Accueil" component={Accueil} />
//           <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
//           <Stack.Screen name="Creer partie" component={CreerPartie} />
//           <Stack.Screen name="Partie" component={Partie} />
//           <Stack.Screen name="Gagnant Partie" component={GagnantPartie} />
//           <Stack.Screen name="Classement" component={Classement} />
//           <Stack.Screen name="Reprendre une partie" component={ReprendrePartie} />
//           <Stack.Screen name="Historique des parties" component={HistoriquePartie} />
//           <Stack.Screen name="Details" component={DetailsPartie} />
//           <Stack.Screen name="Fin de Tour" component={FinDeTour} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

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
          <Svg id="settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40.4 40.4">
            <Path id="Tracé_19" data-name="Tracé 19" d="M0,0H40.4V40.4H0Z" fill="none"/>
            <Path id="Tracé_20" data-name="Tracé 20" d="M15.33,5.217a2.9,2.9,0,0,1,5.639,0A2.9,2.9,0,0,0,25.3,7.011,2.9,2.9,0,0,1,29.29,11a2.9,2.9,0,0,0,1.793,4.33,2.9,2.9,0,0,1,0,5.639A2.9,2.9,0,0,0,29.289,25.3a2.9,2.9,0,0,1-3.99,3.99,2.9,2.9,0,0,0-4.33,1.793,2.9,2.9,0,0,1-5.639,0A2.9,2.9,0,0,0,11,29.289,2.9,2.9,0,0,1,7.01,25.3a2.9,2.9,0,0,0-1.793-4.33,2.9,2.9,0,0,1,0-5.639A2.9,2.9,0,0,0,7.011,11,2.9,2.9,0,0,1,11,7.01a2.9,2.9,0,0,0,4.33-1.793Z" transform="translate(2.05 2.05)" fill="none" stroke="#24334c" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2.5"/>
            <Circle id="Ellipse_3" data-name="Ellipse 3" cx="5" cy="5" r="5" transform="translate(15 15)" fill="none" stroke="#24334c" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2.5"/>
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Text style={[styles.textPurple, styles.textLogo]}>Jeu du</Text>
        <Svg xmlns="http://www.w3.org/2000/svg" width="93.126" height="93.126" viewBox="0 0 93.126 93.126">
          <G id="Groupe_112" data-name="Groupe 112" transform="translate(-79 -79.436)">
            <Path id="Tracé_8" data-name="Tracé 8" d="M46.563,0A46.563,46.563,0,1,1,0,46.563,46.563,46.563,0,0,1,46.563,0Z" transform="translate(79 79.436)" fill="rgba(89,61,218,0.85)"/>
            <Path id="Ellipse_3" data-name="Ellipse 3" d="M37.711,3A34.721,34.721,0,0,0,24.2,69.7,34.721,34.721,0,0,0,51.221,5.727,34.491,34.491,0,0,0,37.711,3m0-3A37.711,37.711,0,1,1,0,37.711,37.711,37.711,0,0,1,37.711,0Z" transform="translate(87.642 88.078)" fill="#fff"/>
            <Path id="Ellipse_4" data-name="Ellipse 4" d="M31.818,3A28.827,28.827,0,0,0,20.6,58.373,28.827,28.827,0,0,0,43.035,5.263,28.635,28.635,0,0,0,31.818,3m0-3A31.818,31.818,0,1,1,0,31.818,31.818,31.818,0,0,1,31.818,0Z" transform="translate(93.927 94.363)" fill="#fff"/>
            <TextSvg id="_301" data-name="301" transform="translate(125.563 136.289)" fill="#fff" fontSize="25" fontWeight="bold"><TSpan x="-20" y="-1">301</TSpan></TextSvg>
          </G>
        </Svg>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Nouvelle partie')}
          style={[styles.buttons, styles.buttonViolet]}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 93.126 93.126" style={{ position: "absolute", opacity: 0.4, top: -30, left: -40}}>
            <G id="Groupe_112" data-name="Groupe 112" transform="translate(-79 -79.436)">
              <Path id="Tracé_8" data-name="Tracé 8" d="M46.563,0A46.563,46.563,0,1,1,0,46.563,46.563,46.563,0,0,1,46.563,0Z" transform="translate(79 79.436)" fill="rgba(89,61,218,0.85)"/>
              <Path id="Ellipse_3" data-name="Ellipse 3" d="M37.711,3A34.721,34.721,0,0,0,24.2,69.7,34.721,34.721,0,0,0,51.221,5.727,34.491,34.491,0,0,0,37.711,3m0-3A37.711,37.711,0,1,1,0,37.711,37.711,37.711,0,0,1,37.711,0Z" transform="translate(87.642 88.078)" fill="#fff"/>
              <Path id="Ellipse_4" data-name="Ellipse 4" d="M31.818,3A28.827,28.827,0,0,0,20.6,58.373,28.827,28.827,0,0,0,43.035,5.263,28.635,28.635,0,0,0,31.818,3m0-3A31.818,31.818,0,1,1,0,31.818,31.818,31.818,0,0,1,31.818,0Z" transform="translate(93.927 94.363)" fill="#fff"/>
              <TextSvg id="_301" data-name="301" transform="translate(125.563 136.289)" fill="#fff" fontSize="25" fontWeight="bold"><TSpan x="-20" y="-1">301</TSpan></TextSvg>
            </G>
          </Svg>
          <Svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
            <Path id="Exclusion_1" data-name="Exclusion 1" d="M27,37H10A10.011,10.011,0,0,1,0,27V10A10.011,10.011,0,0,1,10,0H27A10.011,10.011,0,0,1,37,10V27A10.011,10.011,0,0,1,27,37ZM8.834,19.606h9.158v9.207a.832.832,0,0,0,1.665,0V19.655h9.158a.832.832,0,0,0,0-1.665H19.656V8.833a.832.832,0,1,0-1.665,0V17.99H8.834A.834.834,0,0,0,8,18.823a.759.759,0,0,0,.758.787C8.783,19.609,8.809,19.608,8.834,19.606Z" fill="#fff"/>
          </Svg>
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
