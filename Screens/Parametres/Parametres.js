import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import Constants from 'expo-constants';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

// Paramètres
export default function Parametres({ navigation, route }) {

  const [fontsLoaded] = font();
  const version = Constants.manifest.version;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={GlobalStyles.textHeaderTitle}>Paramètres</Text>
      </View>
      <View style={ParametersStyles.parametresContainer}>

        <View style={ParametersStyles.containerSubtitle}>

          <Text style={ParametersStyles.subtitle}>Paramètres</Text>

        </View>

        <View style={ParametersStyles.parametres}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <IconComponent name="share" size="24" color="#7159DF" />
            </View>
            <Text style={ParametersStyles.textButtonParametres}>Partager l'application</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Configuration");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <IconComponent name="config" size="24" color="#7159DF" />
            </View>
            <Text  style={ParametersStyles.textButtonParametres}>Configuration</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <View style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres ]}>

            <View style={ParametersStyles.iconButtonParametres} >
              <IconComponent name="moon" size="24" color="#7159DF" />
            </View>

            <Text  style={ParametersStyles.textButtonParametres}>Mode sombre <Text style={{color: "#D9D9D9", fontFamily: "Poppins-Regular"}}>(à venir)</Text> </Text>

            <Switch
              trackColor={{false: '#D9D9D9', true: '#7159DF'}}
              thumbColor={"#fff"}
              onValueChange={toggleSwitch}
              disabled={true}
              value={isEnabled}
            />

          </View>

        </View>

        <View style={ParametersStyles.containerSubtitle}>

          <Text style={ParametersStyles.subtitle}>Informations</Text>

        </View>

        <View style={ ParametersStyles.parametres }>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Nouveautés");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <IconComponent name="new" size="24" color="#7159DF" />
            </View>
            <Text style={ParametersStyles.textButtonParametres}>Nouvelles fonctionnalités</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <IconComponent name="help" size="24" color="#7159DF" />
            </View>
            <Text  style={ParametersStyles.textButtonParametres}>Besoin d'aide ?</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Logs");
            }}
            style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres ]}
          >
            <View style={ParametersStyles.iconButtonParametres} >
              <IconComponent name="list" size="24" color="#7159DF" />
            </View>
            <Text  style={ParametersStyles.textButtonParametres}>Historique des versions</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

        </View>
        <View style={ParametersStyles.containerVersionApp}>

          <Text style={ParametersStyles.versionApp}>V.{version} · 301 le Jeu · Alexandre Pouivet</Text>

        </View>
      </View>
    </View>
  );
}
