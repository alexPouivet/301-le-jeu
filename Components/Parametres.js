import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect,Circle, Polyline, Line } from 'react-native-svg';

import ShareIcon from '../Components/Icons/shareIcon';
import ArrowLeftIcon from '../Components/Icons/arrowLeftIcon';
import ArrowRightIcon from '../Components/Icons/arrowRightIcon';
import HelpIcon from '../Components/Icons/helpIcon';

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
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Paramètres</Text>
      </View>
      <Image
      style={styles.image}
      source={
        require('../images/illustrations/settings.png')}
      />
      <Text style={styles.description}>Un soucis avec l'application ou envie de la partager ? Toutes les informations sont disponibles ici dans les paramètres.</Text>

      <View style={styles.parametresContainer}>
        <View style={styles.parametres}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={styles.buttonParametres}
          >
            <ShareIcon />
            <Text  style={styles.textButtonParametres}>Partager l'application</Text>
            <ArrowRightIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={styles.buttonParametres}
          >
            <HelpIcon />
            <Text  style={styles.textButtonParametres}>Un problème ?</Text>
            <ArrowRightIcon />
          </TouchableOpacity>
          <Text style={styles.versionApp}>V.2.0.3 par Alexandre Pouivet</Text>
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
