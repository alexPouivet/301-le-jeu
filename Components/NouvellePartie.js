import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import InputSpinner from "react-native-input-spinner";
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

import ArrowLeftIcon from '../Components/Icons/arrowLeftIcon';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

// Page Nouvelle partie
export default function NouvellePartie({ navigation }) {

  const [participants, onChangeParticipants] = React.useState(1);
  const [palets, onChangePalets] = React.useState(1);

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
      <Text style={styles.titrePage}>Nouvelle partie</Text>
    </View>
    <Image
    style={styles.image}
    source={
      require('../images/illustrations/start.png')}
    />
    <Text style={styles.description}>Commencez une nouvelle partie en indiquant le nombre de joueurs et de palets par personne
    </Text>
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Nombre de joueurs</Text>
        <InputSpinner
          min={1}
          max={8}
          step={1}
          value={participants}
          style={{width: "45%", marginBottom: 35}}
          textColor="#7159df"
          buttonTextColor="#FFFFFF"
          buttonStyle={{borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10, activityOpacity: 0, backgroundColor: "#7159df", }}
          inputStyle={{backgroundColor: "#FFFFFF", width: "35%", marginLeft: 20, marginRight: 20, borderRadius: 10, fontWeight: "bold", fontSize: 30 }}
          onChange={(num)=>{
            onChangeParticipants(num)
          }}
          editable={false}
        />
        <Text style={styles.text}>Nombre de palets par personnes</Text>
        <InputSpinner
          min={1}
          max={9}
          step={1}
          value={palets}
          style={{width: "45%", marginBottom: 35}}
          textColor="#7159df"
          buttonTextColor="#FFFFFF"
          buttonStyle={{borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10, activityOpacity: 0, backgroundColor: "#7159df", }}
          inputStyle={{backgroundColor: "#FFFFFF", width: "35%", marginLeft: 20, marginRight: 20, borderRadius: 10, fontWeight: "bold", fontSize: 30 }}
          onChange={(num)=>{
            onChangePalets(num)
          }}
          editable={false}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Creer partie', {
          nb_participants: participants,
          nb_palets: palets,
        })}
      >
        <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold"}}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFFFFF"
  },
  title: {
    marginTop: 100,
    color: "#24334c",
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputsContainer: {
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    backgroundColor: "#F3F3F3",
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderRadius: 10,
    marginBottom: 35,
    textAlign: 'center',
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#24334c",
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 15,
    width: "90%",

    backgroundColor: "#7159df",
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
});
