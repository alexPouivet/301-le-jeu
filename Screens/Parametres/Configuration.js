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
export default function Configuration({ navigation, route }) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

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
        <Text style={GlobalStyles.textHeaderTitle}>Configuration</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <View style={ParametersStyles.container}>

        <Text style={ParametersStyles.text16}>Un problème concernant l'affichage des parties ? Réinitialisez pour essayer de règler le soucis.</Text>

        <UpdateAllPartiesComponent />

        <Text style={ParametersStyles.text16}>Supprimez toutes les parties enregistrées jusqu'à maintenant.</Text>

        <DeletePartiesComponent />

      </View>

    </View>
  );
}
