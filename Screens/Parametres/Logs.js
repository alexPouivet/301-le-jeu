import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import logs from '../../logs.json';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Logs
export default function Logs({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  let reversedLogs = logs.map(item => item).reverse();

  if (!fontsLoaded) {
    return null;
  }

  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  return (
    <View style={GlobalStyles.container}>

      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Versions de l'app</Text>
        <View style={{ width: 42 }}>
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
