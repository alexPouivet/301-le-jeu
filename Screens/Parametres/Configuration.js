import { View, Text, TouchableOpacity } from 'react-native';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import DeletePartiesComponent from '../../Components/Parametres/DeletePartiesComponent';
import UpdateAllPartiesComponent from '../../Components/Parametres/UpdateAllPartiesComponent';
import font from '../../Components/FontComponent';

// Configuration
export default function Configuration({ navigation, theme }) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

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
        <Text style={[ GlobalStyles.textHeaderTitle, theme === "dark" ? GlobalStyles.textHeaderTitleDarkTheme : GlobalStyles.textHeaderTitleLightTheme ]}>Configuration</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <View style={[ ParametersStyles.container, theme === "dark" ? ParametersStyles.containerDarkTheme : ParametersStyles.containerLightTheme ]}>

        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme]}>Un problème concernant l'affichage des parties ? Réinitialisez pour essayer de règler le soucis.</Text>

        <UpdateAllPartiesComponent />

        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme]}>Supprimez toutes les parties enregistrées jusqu'à maintenant.</Text>

        <DeletePartiesComponent />

      </View>

    </View>
  );
}
