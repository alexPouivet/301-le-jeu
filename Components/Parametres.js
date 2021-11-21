import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect,Circle, Polyline, Line } from 'react-native-svg';

// Page Détails d'une partie
export default function Parametres({ navigation, route }) {

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334C" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Polyline points="15 6 9 12 15 18" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Paramètres</Text>
      </View>
      <Image
      style={styles.image}
      source={
        require('../images/illustrations/settings.png')}
      />
      <Text style={styles.description}>Un soucis avec l'application ou envie de partager l'application ? Toutes les informations sont disponibles ici dans les paramètres.</Text>

      <View style={styles.parametresContainer}>
        <View style={styles.parametres}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PriseEnMain");
            }}
            style={styles.buttonParametres}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Circle cx="12" cy="12" r="9" />
              <Line x1="12" y1="8" x2="12.01" y2="8" />
              <Polyline points="11 12 12 12 12 16 13 16" />
            </Svg>
            <Text style={styles.textButtonParametres}>Prise en main</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Polyline points="9 6 15 12 9 18" />
            </Svg>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={styles.buttonParametres}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Circle cx="6" cy="12" r="3" />
              <Circle cx="18" cy="6" r="3" />
              <Circle cx="18" cy="18" r="3" />
              <Line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
              <Line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
            </Svg>
            <Text  style={styles.textButtonParametres}>Partager l'application</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Polyline points="9 6 15 12 9 18" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={styles.buttonParametres}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Circle cx="12" cy="12" r="9" />
              <Line x1="12" y1="17" x2="12" y2="17.01" />
              <Path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
            </Svg>
            <Text  style={styles.textButtonParametres}>Un problème ?</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Polyline points="9 6 15 12 9 18" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.versionApp}>V.2.0 par Alexandre Pouivet</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:20,
    backgroundColor: "#FFFFFF",
    width: "100%"
  },
  description: {
    marginLeft: 20,
    marginRight:20,
    textAlign: 'center',
    fontSize: 14,
    color: "#24334c"
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10
  },
  buttonParametres: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textButtonParametres: {
    marginLeft: 15,
    marginRight: "auto",
    color: "#24334c",
    fontSize: 18
  },
  parametresContainer: {
    backgroundColor: "#f3f3f3",
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
    height: "100%",
    width: "100%",
    marginTop: 40
  },
  parametres: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    width: "100%",
    marginTop: 30,

  },
  versionApp: {
    margin: 20,
    color: "#24334c",
    fontSize: 18
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:20,
  },
  titrePage: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "70%",
    color: "#24334c",
  },
})
