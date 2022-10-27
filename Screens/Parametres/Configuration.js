import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import DeletePartiesComponent from '../../Components/Parametres/DeletePartiesComponent';
import UpdateAllPartiesComponent from '../../Components/Parametres/UpdateAllPartiesComponent';

// Configuration
export default function Configuration({ navigation, route }) {

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
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Configuration</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>

      <View style={ParametersStyles.container}>

        <Text style={ParametersStyles.text16}>Un problème concernant l'affichage des parties ? Réinitialisez pour essayer de règler le soucis.</Text>

        <UpdateAllPartiesComponent />

        <Text style={ParametersStyles.text16}>Supprimez toutes les parties enregistrées jusqu'à maintenant.</Text>

        <DeletePartiesComponent />

      </View>

    </View>
  );
}
