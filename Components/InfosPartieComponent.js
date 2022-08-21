import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import DetailsPartieStyles from '../Constants/DetailsPartieStyles';

export default function infosPartieComponent(props) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={[DetailsPartieStyles.containerStatutPartie, props.game.gagnant_game == null ? DetailsPartieStyles.containerStatutPartieEnCours : DetailsPartieStyles.containerStatutGagnant ]}>
      <View>
        {props.game.gagnant_game == null
          ?
            <Text style={[ DetailsPartieStyles.textStatutPartie, { fontFamily: "Poppins-Bold" } ]}>Partie en cours</Text>
          :
            <Text style={[ DetailsPartieStyles.textStatutPartie, { fontFamily: "Poppins-Bold" } ]}>Gagnant: {props.game.gagnant_game}</Text>
        }
      </View>
      <View style={DetailsPartieStyles.separator}></View>
      <View style={DetailsPartieStyles.containerDate}>
        <Ionicons name='ios-calendar-outline' size={20} color="#fff"/>
        <Text style={[ DetailsPartieStyles.partieDate, { fontFamily: "Poppins-Medium" } ]}>Le {props.game.date} à {props.game.time}</Text>
      </View>
    </View>

  );

}
