import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan } from 'react-native-svg';

// Components
import HistoriquePartie from './Components/Historique'
import NouvellePartie from './Components/NouvellePartie'
import CreerPartie from './Components/CreerPartie'
import DetailsPartie from './Components/DetailsPartie'
import ReprendrePartie from './Components/ReprendrePartie'
import Partie from './Components/Partie'
import GagnantPartie from './Components/GagnantPartie'
import Classement from './Components/Classement'
import FinDeTour from './Components/FinDeTour'

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider style={{marginTop: StatusBar.currentHeight, flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Accueil" component={Accueil} />
          <Stack.Screen name="Nouvelle partie" component={NouvellePartie} />
          <Stack.Screen name="Creer partie" component={CreerPartie} />
          <Stack.Screen name="Partie" component={Partie} />
          <Stack.Screen name="Gagnant Partie" component={GagnantPartie} />
          <Stack.Screen name="Classement" component={Classement} />
          <Stack.Screen name="Reprendre une partie" component={ReprendrePartie} />
          <Stack.Screen name="Historique des parties" component={HistoriquePartie} />
          <Stack.Screen name="Details" component={DetailsPartie} />
          <Stack.Screen name="Fin de Tour" component={FinDeTour} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Page d'accueil
function Accueil({ navigation }) {
  return (
    <View style={styles.accueil}>
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
          <Svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
            <Path id="Exclusion_1" data-name="Exclusion 1" d="M27,37H10A10.011,10.011,0,0,1,0,27V10A10.011,10.011,0,0,1,10,0H27A10.011,10.011,0,0,1,37,10V27A10.011,10.011,0,0,1,27,37ZM8.834,19.606h9.158v9.207a.832.832,0,0,0,1.665,0V19.655h9.158a.832.832,0,0,0,0-1.665H19.656V8.833a.832.832,0,1,0-1.665,0V17.99H8.834A.834.834,0,0,0,8,18.823a.759.759,0,0,0,.758.787C8.783,19.609,8.809,19.608,8.834,19.606Z" fill="#fff"/>
          </Svg>
          <Text style={[styles.text, styles.textWhite]}>Nouvelle Partie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reprendre une partie')}
          style={[styles.buttons, styles.buttonGrey]}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
            <G id="Groupe_117" data-name="Groupe 117" transform="translate(-35 -526)">
              <Rect id="Rectangle_3" data-name="Rectangle 3" width="37" height="37" rx="10" transform="translate(35 526)" fill="#fff"/>
              <Path id="restart" d="M19.8,13.814A7.464,7.464,0,1,1,12.332,6.35h4.612L14.272,9.03l1.045,1.052L19.8,5.6,15.317,1.125,14.272,2.177l2.68,2.68h-4.62a8.957,8.957,0,1,0,8.957,8.957Z" transform="translate(41.625 532.875)" fill="rgba(36,51,76,0.85)"/>
            </G>
          </Svg>
          <Text style={[styles.text, styles.textDark]}>Reprendre une partie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Historique des parties')}
          style={[styles.buttons, styles.buttonDark]}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
            <Path id="Exclusion_3" data-name="Exclusion 3" d="M27,37H10A10.011,10.011,0,0,1,0,27V10A10.011,10.011,0,0,1,10,0H27A10.011,10.011,0,0,1,37,10V27A10.011,10.011,0,0,1,27,37ZM7.677,18.5a10.826,10.826,0,1,0,3.228-7.708V7.677H9.461v5.778h5.778V12.01H11.731A9.377,9.377,0,1,1,9.122,18.5Zm10.089-6.492-.024,7.948h5.8V18.511H19.191l.02-6.5Z" fill="#fff"/>
          </Svg>
          <Text style={[styles.text, styles.textWhite]}>Historique des parties</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.footer, styles.textDark]}>v1.0 - Develop by Alexandre Pouivet</Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  accueil: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  logoContainer: {
    paddingTop: 50,
    alignItems: "center",
  },
  buttonsContainer: {
    paddingHorizontal: 18
  },
  buttons: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15
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
    marginTop: 15
  },
  textWhite: {
    color: "rgba(243, 243, 243, 1)"
  },
  textDark: {
    color: "rgba(36, 51, 76, 0.85)"
  },
  textPurple: {
    color: "rgba(89, 61, 218, 0.85)",
  },
  textLogo: {
    fontSize:25,
    marginBottom:10,
    fontWeight: "500"
  },
  footer: {
    textAlign: "center",
    paddingBottom: 20
  }
})
