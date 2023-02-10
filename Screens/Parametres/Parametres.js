import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import { ClockCounterClockwise } from 'phosphor-react-native';

// Paramètres
export default function Parametres({ navigation, route }) {

  const version = Constants.manifest.version;

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={[GlobalStyles.textHeaderContainer]}>
        <Text style={GlobalStyles.textHeaderTitle}>Paramètres</Text>
      </View>
      <View style={ParametersStyles.parametresContainer}>

        <View style={ParametersStyles.parametresRow}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Configuration");
          }}
          style={ParametersStyles.buttonParametresRowFirst} >
            <View style={ParametersStyles.iconButtonParametresGrey} >
              <Ionicons name='options-outline' size={20} color="#252422"/>
            </View>
            <View style={ParametersStyles.infosButtonContainer}>
              <Text style={[ ParametersStyles.titleParametresButton, { color: "#252422" } ]}>Configuration</Text>
              <Ionicons style={ParametersStyles.chevronParametresButton} name='ios-chevron-forward-outline' size={20} color="#D9D9D9"/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Nouveautés");
            }}
            style={ParametersStyles.buttonParametresRowLast} >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='ios-newspaper-outline' size={20} color="#7159DF"/>
            </View>
            <View style={ParametersStyles.infosButtonContainer}>
              <Text style={[ParametersStyles.titleParametresButton]}>Nouvelles fonctionnalités</Text>
              <Ionicons style={ParametersStyles.chevronParametresButton} name='ios-chevron-forward-outline' size={20} color="#7159DF35"/>
            </View>
          </TouchableOpacity>

        </View>

        <View style={ ParametersStyles.parametres }>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='ios-share-social-outline' size={20} color="#7159DF"/>
            </View>
            <Text style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Partager l'application</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#C0C0C0"/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='help-buoy-outline' size={20} color="#7159DF"/>
            </View>
            <Text  style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Besoin d'aide ?</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#C0C0C0"/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Logs");
            }}
            style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres]}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <ClockCounterClockwise size={20} color="#7159DF"/>
            </View>
            <Text  style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Historique des versions</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#C0C0C0"/>
          </TouchableOpacity>

        </View>
        <View style={ParametersStyles.containerVersionApp}>

          <Text style={ParametersStyles.versionApp}>V.{version} · 301 le Jeu · Alexandre Pouivet</Text>

        </View>
      </View>
    </View>
  );
}
