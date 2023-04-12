import { View, Text } from 'react-native';

// Components
import IconComponent from '../../Components/IconComponent';
import Calendar from 'phosphor-react-native/src/icons/Calendar';
import CoinVertical from 'phosphor-react-native/src/icons/CoinVertical';
import font from '../../Components/FontComponent';

// Styles
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Infos Partie
export default function infosPartieComponent(props) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={[ DetailsPartieStyles.containerStatutPartie ]}>

      <View style={{flexDirection: "row", justifyContent: "space-between"}}>

        {props.game.gagnant_partie == null
          ?
            <View style={DetailsPartieStyles.textStatutPartieContainer}>
              <View style={DetailsPartieStyles.iconePartieEnCoursWrapper}>
                <IconComponent name="hourglass" size="24" color="#7159df" />
              </View>
              <Text style={[ DetailsPartieStyles.textStatutPartie, { color: "#7159df" } ]}>Partie en cours</Text>
            </View>
          :
            <View style={[ DetailsPartieStyles.textStatutPartieContainer ]}>
              <View style={DetailsPartieStyles.iconePartieTermineeWrapper}>
                <IconComponent name="cup" size="24" color="#FEC601" />
              </View>
              <Text style={[ DetailsPartieStyles.textStatutPartie, { color: "#FEC601" } ]}>{props.game.gagnant_partie}</Text>
            </View>
        }

        <View style={[ DetailsPartieStyles.textStatutPartieContainer ]}>
          <View style={DetailsPartieStyles.iconePaletsWrapper}>
            <IconComponent name="palet" size="24" color="#BEBEBE" />
          </View>
          <Text style={DetailsPartieStyles.textStatutPartie}>{props.game.nb_palets} palets</Text>
        </View>

      </View>

    </View>

  );

}
