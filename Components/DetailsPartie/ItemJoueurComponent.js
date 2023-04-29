import { View, Text } from 'react-native';

// Styles
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'
import font from '../../Components/FontComponent';

// Item Joueur Classement Partie
export default function itemJoueurComponent(props) {

	const theme = props.theme;
	const [fontsLoaded] = font();

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
	      <Text numberOfLines={1} style={[ DetailsPartieStyles.textNomJoueur, theme ==="dark" ? DetailsPartieStyles.textNomJoueurDarkTheme : DetailsPartieStyles.textNomJoueurLightTheme]}>{props.nom_joueur}</Text>
			</View>

      <View style={DetailsPartieStyles.containerPointsJoueur}>
        <Text style={DetailsPartieStyles.textPointsJoueur}>{props.score_joueur}</Text>
        <Text style={DetailsPartieStyles.libelePointsJoueur}>points restant</Text>
      </View>
    </View>

	)
}
