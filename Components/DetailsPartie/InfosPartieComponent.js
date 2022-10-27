import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Styles
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Infos Partie
export default function infosPartieComponent(props) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={[DetailsPartieStyles.containerStatutPartie, props.game.gagnant_partie == null ? DetailsPartieStyles.containerStatutPartieEnCours : DetailsPartieStyles.containerStatutGagnant ]}>
      {props.game.gagnant_partie == null
        ?
          <View style={DetailsPartieStyles.textStatutPartieContainer}>
            <Text style={ DetailsPartieStyles.textStatutPartie }>Partie en cours</Text>
          </View>
        :
          <View style={DetailsPartieStyles.textStatutPartieContainer}>
            <Text style={ DetailsPartieStyles.textStatutPartie }>Gagnant: {props.game.gagnant_partie}</Text>
          </View>
      }
      <View style={DetailsPartieStyles.containerDate}>
        <Text style={ DetailsPartieStyles.textDate }>Le {props.game.date} à {props.game.horaire}</Text>
      </View>
    </View>

  );

}
