import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import DetailsPartieStyles from '../Constants/DetailsPartieStyles';

export default function podiumJoueurComponent(props) {

	const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
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
              : <Text style={[ DetailsPartieStyles.podiumJoueurNom, { fontFamily: "Poppins-Medium"}]}>{props.joueurs1.nom_joueur}</Text>
            }
          </View>
          <View style={DetailsPartieStyles.secondPlacePodium}>
            {props.joueurs1 == null
              ? null
              : <View style={DetailsPartieStyles.podiumJoueur}>
                  <Text style={[ DetailsPartieStyles.podiumJoueurScore, { fontFamily: "Poppins-Bold"} ]}>{props.joueurs1.score_joueur}</Text>
                  <Text style={DetailsPartieStyles.podiumJoueurPoints}>points restant</Text>
                </View>
            }
          </View>
        </View>
        <View style={DetailsPartieStyles.containerPlacePodium}>
          <View style={DetailsPartieStyles.firstPlaceTopPodium}>
            { props.joueurs0 == null
              ? null
              : <Text style={[ DetailsPartieStyles.podiumJoueurNom, { fontFamily: "Poppins-Medium"}]}>{props.joueurs0.nom_joueur}</Text>
            }
          </View>
          <View style={DetailsPartieStyles.firstPlacePodium}>
            {props.joueurs0 == null
              ? null
              : <View style={DetailsPartieStyles.podiumJoueur}>
                  <Text style={[ DetailsPartieStyles.podiumJoueurScore, { fontFamily: "Poppins-Bold"} ]}>{props.joueurs0.score_joueur}</Text>
                  <Text style={DetailsPartieStyles.podiumJoueurPoints}>points restant</Text>
                </View>
            }
          </View>
        </View>
        <View style={[ DetailsPartieStyles.containerPlacePodium, {marginRight: "auto"}]}>
          <View style={DetailsPartieStyles.thirdPlaceTopPodium}>
            { props.joueurs2 == null
              ? null
              : <Text style={[ DetailsPartieStyles.podiumJoueurNom, { fontFamily: "Poppins-Medium"}]}>{props.joueurs2.nom_joueur}</Text>
            }
          </View>
          <View style={DetailsPartieStyles.thirdPlacePodium}>
            {props.joueurs2 == null
              ? null
              : <View style={DetailsPartieStyles.podiumJoueur}>
                  <Text style={[ DetailsPartieStyles.podiumJoueurScore, { fontFamily: "Poppins-Bold"} ]}>{props.joueurs2.score_joueur}</Text>
                  <Text style={DetailsPartieStyles.podiumJoueurPoints}>points restant</Text>
                </View>
            }
          </View>
        </View>
      </View>
    </View>
	);

}
