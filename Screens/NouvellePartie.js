import * as React from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Image } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import Ionicons from '@expo/vector-icons/Ionicons';
import Curve from '../assets/curves/curve';
import Lottie from 'lottie-react-native';

import openDatabase from '../Components/OpenDatabase';
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
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Nouvelle partie</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.scrollContainer}>
          <View style={{height: 300}}>
            <Lottie style={styles.image} source={require('../assets/animations/floating-palet.json')} autoPlay loop />
            <Text style={styles.description}>Commencez une nouvelle partie en indiquant le nombre de joueurs et de palets par joueurs</Text>
          </View>
          <Curve />
          <View style={styles.inputsContainer}>
            <Text style={styles.text}>Nombre de joueurs</Text>
            <InputSpinner
              value={participants}
              min={1}
              max={8}
              step={1}
              style={{marginBottom: 24}}
              width= {56}
              height= {56}
              buttonFontSize={52}
              textColor="#FFFFFF"
              showBorder={true}
              buttonTextColor="#7159df"
              buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#ffffff" }}
              inputStyle={{backgroundColor: "#7159df", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#ffffff", borderWidth: 3 }}
              onChange={(num)=>{
                onChangeParticipants(num)
              }}
              editable={false}
            />
            <Text style={styles.text}>Nombre de palets par joueurs</Text>
            <InputSpinner
              value={palets}
              min={1}
              max={9}
              step={1}
              width= {56}
              height= {56}
              buttonFontSize={52}
              textColor="#FFFFFF"
              showBorder={true}
              buttonTextColor="#7159df"
              buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#ffffff" }}
              inputStyle={{backgroundColor: "#7159df", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#ffffff", borderWidth: 3 }}
              onChange={(num)=>{
                onChangePalets(num)
              }}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Creer partie', {
          nb_participants: participants,
          nb_palets: palets,
        })}
      >
        <Text style={{textAlign: "center", color: "#7159df", fontSize: 18, fontWeight: "bold"}}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:16,
  },
  titrePage: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 16,
    color: "#252422",
  },
  image: {
    width: 210,
    height: 210,
    marginLeft: "auto",
    marginRight: "auto"
  },
  description: {
    fontSize: 14,
    color: "#252422",
    marginLeft: 16,
    marginTop: "auto",
    marginBottom: 24,
    marginRight: 16,
    textAlign: "center",
  },
  inputsContainer: {
    backgroundColor: "#7159df",
    minHeight: Platform.OS === "android" ? (height/2 - 16) : "100%",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 32,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#ffffff",
    marginBottom: 16,
  },
  button: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
