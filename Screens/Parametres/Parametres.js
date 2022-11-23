import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Paramètres
export default function Parametres({ navigation, route }) {

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
        <View style={ ParametersStyles.parametres }>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Configuration");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='options-outline' size={20} color="#7159DF"/>
            </View>
            <Text style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Configuration</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#C0C0C0"/>
          </TouchableOpacity>

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
              navigation.navigate("Nouveautés");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='ios-newspaper-outline' size={20} color="#7159DF"/>
            </View>
            <Text style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Nouvelles fonctionnalités</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#C0C0C0"/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres]}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='ios-help-outline' size={20} color="#7159DF"/>
            </View>
            <Text  style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Un problème ?</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#C0C0C0"/>
          </TouchableOpacity>

        </View>
        <Text style={ParametersStyles.versionApp}>V.2.3.22 | 301 le Jeu - Alexandre Pouivet</Text>
      </View>
    </View>
  );
}
