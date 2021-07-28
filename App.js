import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        <Image
          source={require('./images/logo.png')}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Nouvelle partie')}
          style={[styles.buttons, styles.buttonViolet]}
        >
          <Image
            source={require('./images/plus.png')}
          />
          <Text style={[styles.text, styles.textWhite]}>Nouvelle Partie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reprendre une partie')}
          style={[styles.buttons, styles.buttonGrey]}
        >
          <Image
            source={require('./images/continue.png')}
          />
          <Text style={[styles.text, styles.textDark]}>Reprendre une partie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Historique des parties')}
          style={[styles.buttons, styles.buttonDark]}
        >
          <Image
            source={require('./images/historic.png')}
          />
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
  },
  logoContainer: {
    marginTop: 150,
    marginBottom: 80,
    flex: 1,
    alignItems: "center"
  },
  buttonsContainer: {
    flex: 3,
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
    marginBottom:10
  },
  footer: {
    textAlign: "center",
    paddingBottom: 20
  }
})
