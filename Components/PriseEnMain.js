import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect,Circle, Polyline, Line } from 'react-native-svg';

// Page Détails d'une partie
export default function PriseEnMain({ navigation, route }) {

  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

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
      <View style={styles.subTitrePage}>
        <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <Circle cx="12" cy="12" r="9" />
          <Line x1="12" y1="8" x2="12.01" y2="8" />
          <Polyline points="11 12 12 12 12 16 13 16" />
        </Svg>
        <Text style={styles.description}>Prise en main</Text>
      </View>

      <View style={styles.parametresContainer}>
        <View style={styles.parametres}>
          <Text style={styles.text}>Un problème concernant le fonctionnement de l'application et ce n'est pas normal ?En cas de problème, contactez moi directement : </Text>
          <Text style={[styles.text, styles.marginText]}>Par message au <B>07-52-67-88-47</B></Text>
          <Text style={[styles.text, styles.marginText]}>Par mail: <B>pouivet.alexandre@gmail.com</B></Text>
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
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
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
    padding: 20

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
  subTitrePage: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  marginText: {
    marginTop: 20,
  }
})
