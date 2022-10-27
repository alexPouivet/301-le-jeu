import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Packages
import Avatar from 'react-native-boring-avatars';
import { useFonts } from 'expo-font';

// Styles
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Podium Partie
export default function PodiumPartieComponent(props) {

	const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

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
									<Avatar
										size={48}
										name={props.joueurs1.avatar_slug}
										variant="beam"
										colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
									/>
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
									<Avatar
										size={48}
										name={props.joueurs0.avatar_slug}
										variant="beam"
										colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
									/>
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
									<Avatar
										size={48}
										name={props.joueurs2.avatar_slug}
										variant="beam"
										colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
									/>
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
