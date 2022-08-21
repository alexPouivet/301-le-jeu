import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import DetailsPartieStyles from '../Constants/DetailsPartieStyles';

export default function itemJoueurComponent(props) {

	const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

	return (

		<View key={props.i} style={[ DetailsPartieStyles.joueur, props.i+1 == props.joueurs.length ? DetailsPartieStyles.lastJoueur : null ]}>
      <View style={DetailsPartieStyles.containerClassementJoueur}>
        <Text style={[DetailsPartieStyles.textClassementJoueur, { fontFamily: "Poppins-Medium" }]}>{props.classement_joueur == null ? props.i+1 : props.classement_joueur}</Text>
      </View>
      <Text style={[DetailsPartieStyles.textNomJoueur, { fontFamily: "Poppins-Medium" } ]}>{props.nom_joueur}</Text>
      <View style={DetailsPartieStyles.containerPointsJoueur}>
        <Text style={[ DetailsPartieStyles.textPointsJoueur, { fontFamily: "Poppins-Bold" } ]}>{props.score_joueur}</Text>
        <Text style={DetailsPartieStyles.libelePointsJoueur}>points restant</Text>
      </View>
    </View>

	)
}
