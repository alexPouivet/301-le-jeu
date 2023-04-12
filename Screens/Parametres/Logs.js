import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import logs from '../../logs.json';
import font from '../../Components/FontComponent';

// Logs
export default function Logs({ navigation, route }) {

  const [fontsLoaded] = font();

  let reversedLogs = logs.map(item => item).reverse();

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
        <Text style={GlobalStyles.textHeaderTitle}>Versions de l'app</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <ScrollView>

        {reversedLogs.map((log, index) => (

          <View style={ParametersStyles.logContainer} key={index}>

            <View style={ParametersStyles.titreContainer}>

              <Text style={ParametersStyles.logTitreApp}>{log.titre}</Text>

              <View style={ParametersStyles.logVersionAppContainer}>

                <Text style={ParametersStyles.logVersionApp}>V.{log.version}</Text>

              </View>

              {log.special
                ?
                <View style={ParametersStyles.logSpecialContainer}>

                  <Text style={ParametersStyles.logSpecial}>{log.special}</Text>

                </View>
                :
                null
              }

            </View>

            <Text style={ParametersStyles.logDate}>{log.date}</Text>

            <Text style={ParametersStyles.logDescriptionApp}>{log.description}</Text>

          </View>

        ))}

      </ScrollView>

    </View>
  );
}
