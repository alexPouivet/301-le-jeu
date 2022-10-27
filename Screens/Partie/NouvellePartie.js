import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

// Packages
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import Lottie from 'lottie-react-native';
import InputSpinner from "react-native-input-spinner";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import NouvellePartieStyles from '../../Constants/Partie/NouvellePartieStyles';

// Components
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Assets
import Curve from '../../assets/curves/curve';

// Nouvelle Partie
export default function NouvellePartie({ navigation }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const [participants, onChangeParticipants] = React.useState(1);
  const [palets, onChangePalets] = React.useState(1);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Nouvelle partie</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>
      <ScrollView>
        <View>
          <View style={NouvellePartieStyles.animationContainer}>
            <Lottie style={NouvellePartieStyles.animation} source={require('../../assets/animations/floating-palet.json')} autoPlay loop />
            <Text style={NouvellePartieStyles.description}>Commencez une nouvelle partie en indiquant le nombre de joueurs et de palets par joueurs</Text>
          </View>
          <Curve />
          <View style={NouvellePartieStyles.inputsContainer}>
            <Text style={NouvellePartieStyles.text}>Nombre de joueurs</Text>
            <InputSpinner
              value={participants}
              min={1}
              max={8}
              initialValue={1}
              step={1}
              style={{marginBottom: 24}}
              width= {56}
              height= {56}
              buttonFontSize={52}
              textColor="#FFFFFF"
              showBorder={true}
              buttonTextColor="#7159df"
              buttonStyle={NouvellePartieStyles.buttonSpinner}
              inputStyle={NouvellePartieStyles.inputSpinner}
              onChange={(num)=>{
                onChangeParticipants(num)
              }}
              editable={false}
            />
            <Text style={NouvellePartieStyles.text}>Nombre de palets par joueurs</Text>
            <InputSpinner
              value={palets}
              min={1}
              initialValue={1}
              max={9}
              step={1}
              width= {56}
              height= {56}
              buttonFontSize={52}
              textColor="#FFFFFF"
              showBorder={true}
              buttonTextColor="#7159df"
              buttonStyle={NouvellePartieStyles.buttonSpinner}
              inputStyle={NouvellePartieStyles.inputSpinner}
              onChange={(num)=>{
                onChangePalets(num)
              }}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[NouvellePartieStyles.buttonWhite]}
        onPress={() => navigation.navigate('Creer partie', {
          nb_participants: participants,
          nb_palets: palets,
        })
      }
      >
        <Text style={NouvellePartieStyles.textButton}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
