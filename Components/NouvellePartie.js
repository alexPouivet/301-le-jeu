import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import InputSpinner from "react-native-input-spinner";
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

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

  const [participants, onChangeParticipants] = React.useState(0);
  const [palets, onChangePalets] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle partie</Text>
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Nombre de joueurs</Text>
        <InputSpinner
          min={1}
          step={1}
          value={participants}
          style={{width: "45%", marginBottom: 35}}
          textColor="rgba(89, 61, 218, 0.85)"
          buttonTextColor="#FFFFFF"
          buttonStyle={{borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10, activityOpacity: 0, backgroundColor: "rgba(89, 61, 218, 0.85)", }}
          inputStyle={{backgroundColor: "#FFFFFF", width: "35%", marginLeft: 20, marginRight: 20, borderRadius: 10, fontWeight: "bold", fontSize: 30 }}
          onChange={(num)=>{
            onChangeParticipants(num)
          }}
          editable={false}
        />
        <Text style={styles.text}>Nombre de palets par personnes</Text>
        <InputSpinner
          min={1}
          step={1}
          value={palets}
          style={{width: "45%", marginBottom: 35}}
          textColor="rgba(89, 61, 218, 0.85)"
          buttonTextColor="#FFFFFF"
          buttonStyle={{borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10, activityOpacity: 0, backgroundColor: "rgba(89, 61, 218, 0.85)", }}
          inputStyle={{backgroundColor: "#FFFFFF", width: "35%", marginLeft: 20, marginRight: 20, borderRadius: 10, fontWeight: "bold", fontSize: 30 }}
          onChange={(num)=>{
            onChangePalets(num)
          }}
          editable={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Creer partie', {
            nb_participants: participants,
            nb_palets: palets,
          })}
        >
          <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 14}}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFFFFF"
  },
  title: {
    marginTop: 100,
    color: "rgba(36, 51, 76, 0.85)",
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputsContainer: {
    borderRadius: 10,
    paddingTop: 40,
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
    color: "rgba(36, 51, 76, 0.85)",
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    backgroundColor: "rgba(89, 61, 218, 0.85)",
  },
});
