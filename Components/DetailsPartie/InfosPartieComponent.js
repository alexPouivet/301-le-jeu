import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Components
import Calendar from 'phosphor-react-native/src/icons/Calendar';
import CoinVertical from 'phosphor-react-native/src/icons/CoinVertical';

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

      <View style={[DetailsPartieStyles.containerDate, props.game.gagnant_partie == null ?  { backgroundColor: "#7159df25" } : {backgroundColor: "#FEC60125"} ]}>
        <Calendar size={24} weight="regular" color={props.game.gagnant_partie == null ? "#7159df" : "#FEC601" } style={{marginRight: 4}}/>
        <Text style={[ DetailsPartieStyles.textDate, props.game.gagnant_partie == null ?  { color: "#7159df" } : { color: "#FEC601" } ]}>Le {props.game.date} à {props.game.horaire}</Text>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between"}}>

        {props.game.gagnant_partie == null
          ?
            <View style={[ DetailsPartieStyles.textStatutPartieContainer, { backgroundColor: "#7159df25" } ]}>
              <Ionicons name='ios-hourglass-outline' size={24} color="#7159df" style={{marginRight: 4}}/>
              <Text style={[ DetailsPartieStyles.textStatutPartie, { color: "#7159df" } ]}>Partie en cours</Text>
            </View>
          :
            <View style={[ DetailsPartieStyles.textStatutPartieContainer, { backgroundColor: "#FEC60125" } ]}>
              <Ionicons name='ios-trophy-outline' size={24} color="#FEC601" style={{marginRight: 4}}/>
              <Text style={[ DetailsPartieStyles.textStatutPartie, { color: "#FEC601" } ]}>{props.game.gagnant_partie}</Text>
            </View>
        }

        <View style={[ DetailsPartieStyles.textStatutPartieContainer, props.game.gagnant_partie == null ?  { backgroundColor: "#7159df25" } : {backgroundColor: "#FEC60125"} ]}>
          <CoinVertical size={24} weight="regular" color={props.game.gagnant_partie == null ? "#7159df" : "#FEC601" } style={{marginRight: 4}}/>
          <Text style={[ DetailsPartieStyles.textStatutPartie, props.game.gagnant_partie == null ?  { color: "#7159df" } : { color: "#FEC601" } ]}>{props.game.nb_palets} palets</Text>
        </View>

      </View>

    </View>

  );

}
