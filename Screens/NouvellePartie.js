import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import Ionicons from '@expo/vector-icons/Ionicons';
import Curve from '../assets/curves/curve';
import Lottie from 'lottie-react-native';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import CreerPartieStyles from '../Constants/CreerPartieStyles';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

// Page Nouvelle partie
export default function NouvellePartie({ navigation }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const [participants, onChangeParticipants] = React.useState(1);
  const [palets, onChangePalets] = React.useState(1);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={CreerPartieStyles.headerContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[GlobalStyles.titrePage, { fontFamily: "Poppins-Medium" }]}>Nouvelle partie</Text>
      </View>
      <ScrollView>
        <View>
          <View style={CreerPartieStyles.animationContainer}>
            <Lottie style={CreerPartieStyles.animation} source={require('../assets/animations/floating-palet.json')} autoPlay loop />
            <Text style={CreerPartieStyles.description}>Commencez une nouvelle partie en indiquant le nombre de joueurs et de palets par joueurs</Text>
          </View>
          <Curve />
          <View style={CreerPartieStyles.inputsContainer}>
            <Text style={[ CreerPartieStyles.text, { fontFamily: "Poppins-Bold" }]}>Nombre de joueurs</Text>
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
              buttonStyle={CreerPartieStyles.buttonSpinner}
              inputStyle={CreerPartieStyles.inputSpinner}
              onChange={(num)=>{
                onChangeParticipants(num)
              }}
              editable={false}
            />
            <Text style={[ CreerPartieStyles.text, { fontFamily: "Poppins-Bold" } ]}>Nombre de palets par joueurs</Text>
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
              buttonStyle={CreerPartieStyles.buttonSpinner}
              inputStyle={CreerPartieStyles.inputSpinner}
              onChange={(num)=>{
                onChangePalets(num)
              }}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={CreerPartieStyles.buttonWhite}
        onPress={() => navigation.navigate('Creer partie', {
          nb_participants: participants,
          nb_palets: palets,
        })}
      >
        <Text style={CreerPartieStyles.textButton}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
