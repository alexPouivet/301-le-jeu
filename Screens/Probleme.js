import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import ParametersStyles from '../Constants/ParametersStyles';

// Page Détails d'une partie
export default function Probleme({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[GlobalStyles.titrePage, {fontFamily: "Poppins-Medium"}]}>Un problème ?</Text>
      </View>

      <View style={GlobalStyles.parametresContainer}>
        <Text style={GlobalStyles.Text16}>Un problème concernant le fonctionnement de l'application et ce n'est pas normal ?</Text>
        <Text style={[GlobalStyles.Text16, GlobalStyles.marginText12]}>En cas de problème, contactez moi directement : </Text>
        <Text style={[GlobalStyles.Text16, GlobalStyles.marginText12]}>Par message au <B>07-52-67-88-47</B></Text>
        <Text style={[GlobalStyles.Text16, GlobalStyles.marginText12]}>Par mail: <B>pouivet.alexandre@gmail.com</B></Text>
      </View>
    </View>
  );
}
