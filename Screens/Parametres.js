import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DeleteAllPartiesComponent from '../Components/DeleteAllPartiesComponent';
import UpdateAllPartiesComponent from '../Components/UpdateAllPartiesComponent';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import ParametersStyles from '../Constants/ParametersStyles';

// Page Paramètres
export default function Parametres({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={[GlobalStyles.titrePage, { fontFamily: "Poppins-Medium" }]}>Paramètres</Text>
      </View>
      <Text style={GlobalStyles.description}>Un soucis avec l'application ou envie de la partager ? Toutes les informations sont disponibles ici dans les paramètres.</Text>

      <View style={ParametersStyles.parametresContainer}>
        <View style={ParametersStyles.parametres}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='ios-share-social-outline' size={20} color="#fff"/>
            </View>
            <Text style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Partager l'application</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#252422"/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres]}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <Ionicons name='ios-help-outline' size={20} color="#fff"/>
            </View>
            <Text  style={[ParametersStyles.textButtonParametres, { fontFamily: "Poppins-Medium" }]}>Un problème ?</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#252422"/>
          </TouchableOpacity>
        </View>
        <UpdateAllPartiesComponent />
        <DeleteAllPartiesComponent />
        <Text style={ParametersStyles.versionApp}>V.2.1.12 par Alexandre Pouivet</Text>
      </View>
    </View>
  );
}
