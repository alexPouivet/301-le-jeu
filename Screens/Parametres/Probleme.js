import { View, Text, TouchableOpacity } from 'react-native';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

// Problème
export default function Probleme({ navigation, theme }) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

  const B = (props) => <Text style={{fontFamily: "Poppins-Medium"}}>{props.children}</Text>

  return (
    <View style={[ GlobalStyles.container, theme === "dark" ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme ]}>
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={[ GlobalStyles.buttonLeft, theme === "dark" ? GlobalStyles.buttonLeftDarkTheme : GlobalStyles.buttonLeftLightTheme]}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <IconComponent name="arrow-back" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
        </TouchableOpacity>
        <Text style={[ GlobalStyles.textHeaderTitle, theme === "dark" ? GlobalStyles.textHeaderTitleDarkTheme : GlobalStyles.textHeaderTitleLightTheme ]}>Besoin d'aide ?</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <View style={[ ParametersStyles.container, theme === "dark" ? ParametersStyles.containerDarkTheme : ParametersStyles.containerLightTheme ]}>
        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme]}>Un problème concernant le fonctionnement de l'application et ce n'est pas normal ?</Text>
        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme, ParametersStyles.marginText12 ]}>En cas de problème, contactez moi directement : </Text>
        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme, ParametersStyles.marginText12 ]}>Par message au : <B>07 52 67 88 47</B></Text>
        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme, ParametersStyles.marginText12 ]}>Par mail : <B>pouivet.alexandre@gmail.com</B></Text>
      </View>
    </View>
  );
}
