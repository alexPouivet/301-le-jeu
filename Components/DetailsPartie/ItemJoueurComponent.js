import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Packages
import { useFonts } from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'

// Item Joueur Classement Partie
export default function itemJoueurComponent(props) {

	const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

	return (

		<View key={props.i} style={[ DetailsPartieStyles.joueur, props.i+1 == props.joueurs.length ? DetailsPartieStyles.lastJoueur : null ]}>
      <View style={DetailsPartieStyles.containerClassementJoueur}>
        <Text style={DetailsPartieStyles.textClassementJoueur}>{props.classement_joueur == null ? props.i+1 : props.classement_joueur}</Text>
      </View>

			<View style={DetailsPartieStyles.infosClassementJoueur}>
				<AvatarComponent size={24} name={props.avatar_slug} />
	      <Text numberOfLines={1} style={DetailsPartieStyles.textNomJoueur}>{props.nom_joueur}</Text>
			</View>

      <View style={DetailsPartieStyles.containerPointsJoueur}>
        <Text style={DetailsPartieStyles.textPointsJoueur}>{props.score_joueur}</Text>
        <Text style={DetailsPartieStyles.libelePointsJoueur}>points restant</Text>
      </View>
    </View>

	)
}
