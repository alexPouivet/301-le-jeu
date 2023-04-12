import { View, Text } from 'react-native';

// Styles
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'
import font from '../../Components/FontComponent';

// Podium Partie
export default function PodiumPartieComponent(props) {

	const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

	return (
		<View style={DetailsPartieStyles.containerPodium}>
      <View style={DetailsPartieStyles.subContainerPodium}>
        <View style={[DetailsPartieStyles.containerPlacePodium, {marginLeft: "auto"}]}>
          <View style={DetailsPartieStyles.secondPlaceTopPodium}>
            { props.joueurs1 == null
              ? null
              : <View style={DetailsPartieStyles.podiumJoueurContainer}>
									<AvatarComponent size={48} name={props.joueurs1.avatar_slug} />
									<Text numberOfLines={1} style={[ DetailsPartieStyles.podiumJoueurNom, { fontFamily: "Poppins-Medium"}]}>{props.joueurs1.nom_joueur}</Text>
								</View>
            }
          </View>
          <View style={DetailsPartieStyles.secondPlacePodium}>
            {props.joueurs1 == null
              ? null
              : <View style={[ DetailsPartieStyles.podiumJoueur, { backgroundColor:"#C0C0C025" } ]}>
                  <Text style={[ DetailsPartieStyles.podiumJoueurScore, { color: "#C0C0C0"} ]}>{props.joueurs1.score_joueur}</Text>
                  <Text style={[DetailsPartieStyles.podiumJoueurPoints, { color: "#C0C0C0"}]}>points restant</Text>
                </View>
            }
          </View>
        </View>
        <View style={DetailsPartieStyles.containerPlacePodium}>
          <View style={DetailsPartieStyles.firstPlaceTopPodium}>
            { props.joueurs0 == null
              ? null
              : <View style={DetailsPartieStyles.podiumJoueurContainer}>
									<AvatarComponent size={48} name={props.joueurs0.avatar_slug} />
									<Text numberOfLines={1} style={[ DetailsPartieStyles.podiumJoueurNom, { fontFamily: "Poppins-Medium"}]}>{props.joueurs0.nom_joueur}</Text>
							</View>
						}
          </View>
          <View style={DetailsPartieStyles.firstPlacePodium}>
            {props.joueurs0 == null
              ? null
              : <View style={[DetailsPartieStyles.podiumJoueur, { backgroundColor:"#FEC60125" } ]}>
                  <Text style={[ DetailsPartieStyles.podiumJoueurScore, { color: "#FEC601"} ]}>{props.joueurs0.score_joueur}</Text>
                  <Text style={[DetailsPartieStyles.podiumJoueurPoints, { color: "#FEC601" }]}>points restant</Text>
                </View>
            }
          </View>
        </View>
        <View style={[ DetailsPartieStyles.containerPlacePodium, {marginRight: "auto"}]}>
          <View style={DetailsPartieStyles.thirdPlaceTopPodium}>
            { props.joueurs2 == null
              ? null
              : <View style={DetailsPartieStyles.podiumJoueurContainer}>
									<AvatarComponent size={48} name={props.joueurs2.avatar_slug} />
									<Text numberOfLines={1} style={[ DetailsPartieStyles.podiumJoueurNom, { fontFamily: "Poppins-Medium"}]}>{props.joueurs2.nom_joueur}</Text>
								</View>
						}
          </View>
          <View style={DetailsPartieStyles.thirdPlacePodium}>
            {props.joueurs2 == null
              ? null
              : <View style={[DetailsPartieStyles.podiumJoueur, { backgroundColor:"#C49C4825" }]}>
                  <Text style={[ DetailsPartieStyles.podiumJoueurScore, { color: "#C49C48"} ]}>{props.joueurs2.score_joueur}</Text>
                  <Text style={[DetailsPartieStyles.podiumJoueurPoints, { color: "#C49C48" }]}>points restant</Text>
                </View>
            }
          </View>
        </View>
      </View>
    </View>
	);

}
