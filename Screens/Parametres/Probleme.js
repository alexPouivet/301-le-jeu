import { View, Text, TouchableOpacity } from 'react-native';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

// Problème
export default function Probleme({ navigation, route }) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

  const B = (props) => <Text style={{fontFamily: "Poppins-Medium"}}>{props.children}</Text>

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <IconComponent name="arrow-back" size="24" color="#252422" />
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Besoin d'aide ?</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <View style={ParametersStyles.container}>
        <Text style={ParametersStyles.text16}>Un problème concernant le fonctionnement de l'application et ce n'est pas normal ?</Text>
        <Text style={[ ParametersStyles.text16, ParametersStyles.marginText12 ]}>En cas de problème, contactez moi directement : </Text>
        <Text style={[ ParametersStyles.text16, ParametersStyles.marginText12 ]}>Par message au <B>07 52 67 88 47</B></Text>
        <Text style={[ ParametersStyles.text16, ParametersStyles.marginText12 ]}>Par mail: <B>pouivet.alexandre@gmail.com</B></Text>
      </View>
    </View>
  );
}
