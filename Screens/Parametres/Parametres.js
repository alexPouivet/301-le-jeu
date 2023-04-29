import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Switch, Platform, useColorScheme } from 'react-native';
import Constants from 'expo-constants';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Components
import ModalDropdown from 'react-native-modal-dropdown';
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';
import { get, save } from '../../storage';
import * as NavigationBar from 'expo-navigation-bar';

// Paramètres
export default function Parametres({ navigation, setThemeForNavbar }) {

  const [fontsLoaded] = font();
  const version = Constants.manifest.version;
  const [themeValue, setThemeValue] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const themes = useColorScheme();
  const data = [
    {
      label: 'Activé',
      value: 'dark',
    },
    {
      label: 'Désactivé',
      value: 'light',
    },
    {
      label: 'Par défaut',
      value: 'default',
    },
  ];

  const changeNavigationBarColor = async (theme) => {
    if (theme === "dark") {
      NavigationBar.setBackgroundColorAsync("#3C3C3C");
    } else {
      NavigationBar.setBackgroundColorAsync("#ffffff");
    }
  }

  const themeOperations = theme => {
    switch (theme) {
      case 'dark':
        setTheme(theme, false);
        setInitialValue(0);
        setThemeForNavbar(theme);
        if (Platform.OS === "android") changeNavigationBarColor(theme);
        return;
      case 'light':
        setTheme(theme, false);
        setInitialValue(1);
        setThemeForNavbar(theme);
        if (Platform.OS === "android") changeNavigationBarColor(theme);
        return;
      case 'default':
        setTheme(themes, true);
        setInitialValue(2);
        setThemeForNavbar(themes);
        if (Platform.OS === "android") changeNavigationBarColor(themes);
        return;
    }
  };

  const getAppTheme = useCallback(async () => {
    const theme = await get('Theme');
    const isDefault = await get('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme);

  }, []);

  const setTheme = useCallback(async (theme, isDefault) => {
    save('Theme', theme);
    save('IsDefault', isDefault);
    setThemeValue(theme);
  }, []);

  useEffect(() => {
    getAppTheme();
  }, [getAppTheme]);

  if (!fontsLoaded) {
    return null;
  }

  const dropdownItem = (rowData, index) => {
    return (

      <View style={{
        flexDirection: "row",
        marginVertical: 12,
        marginHorizontal: 8,
        alignItems: "center",
      }}>

        <View style={{width: 16}}>

          { index == initialValue

            ?

            <IconComponent name="check-mark" size="16" color={themeValue === 'dark' ? "#fff" : "#252422"} />

            :

            null

          }

        </View>

        <Text style={{
          marginLeft: 4,
          fontSize: 13,
          color: themeValue === 'dark' ? "#fff" : "#252422",
          fontFamily: "Poppins-Regular"
        }}>{rowData.label}</Text>

      </View>

    )
  }

  return (
    <View style={[ GlobalStyles.container, themeValue === "dark" ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme ]}>
      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={[ GlobalStyles.textHeaderTitle, themeValue === 'dark' ? GlobalStyles.textHeaderTitleDarkTheme : GlobalStyles.textHeaderTitleLightTheme ]}>Paramètres</Text>
      </View>
      <View style={ParametersStyles.parametresContainer}>

        <View style={ParametersStyles.containerSubtitle}>

          <Text style={ParametersStyles.subtitle}>Paramètres</Text>

        </View>

        <View style={[ ParametersStyles.parametres, themeValue === 'dark' ? ParametersStyles.parametresDarkTheme : ParametersStyles.parametresLightTheme]}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={[ ParametersStyles.iconButtonParametres, themeValue === "dark" ? ParametersStyles.iconButtonParametresDarkTheme : ParametersStyles.iconButtonParametresLightTheme ]} >
              <IconComponent name="share" size="24" color="#7159DF" />
            </View>
            <Text style={[ ParametersStyles.textButtonParametres, themeValue === 'dark' ? ParametersStyles.textButtonParametresDarkMode : ParametersStyles.textButtonParametresLightMode]}>Partager l'application</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Configuration");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={[ ParametersStyles.iconButtonParametres, themeValue === "dark" ? ParametersStyles.iconButtonParametresDarkTheme : ParametersStyles.iconButtonParametresLightTheme ]} >
              <IconComponent name="config" size="24" color="#7159DF" />
            </View>
            <Text  style={[ ParametersStyles.textButtonParametres, themeValue === 'dark' ? ParametersStyles.textButtonParametresDarkMode : ParametersStyles.textButtonParametresLightMode]}>Configuration</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <View style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres ]}>

            <View style={[ ParametersStyles.iconButtonParametres, themeValue === "dark" ? ParametersStyles.iconButtonParametresDarkTheme : ParametersStyles.iconButtonParametresLightTheme ]} >
              <IconComponent name="moon" size="24" color="#7159DF" />
            </View>

            <Text  style={[ ParametersStyles.textButtonParametres, themeValue === 'dark' ? ParametersStyles.textButtonParametresDarkMode : ParametersStyles.textButtonParametresLightMode]}>Mode sombre</Text>

            <ModalDropdown
              options={data}
              defaultIndex={initialValue}
              renderRow={(rowData, index) => dropdownItem(rowData, index)}
              dropdownStyle={{borderRadius: 8, borderWidth: 0, backgroundColor: themeValue === 'dark' ? "#252422" : "#F3F3F3", marginTop: 2, width: 128, height: "auto"}}
              onSelect={(index, value) => {
                themeOperations(value.value);
              }}

            >
            <View style={{ width: 128, padding: 12, backgroundColor: themeValue === 'dark' ? "#252422" : "#F3F3F3", borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{fontSize: 13, fontFamily: "Poppins-Regular", color: themeValue === 'dark' ? "#fff" : "#252422"}}>{data[initialValue].label}</Text>
              <IconComponent name="chevron-down" size="16" color={themeValue === 'dark' ? "#fff" : "#252422"} />
            </View>
            </ModalDropdown>

          </View>

        </View>

        <View style={ParametersStyles.containerSubtitle}>

          <Text style={ParametersStyles.subtitle}>Informations</Text>

        </View>

        <View style={[ ParametersStyles.parametres, themeValue === 'dark' ? ParametersStyles.parametresDarkTheme : ParametersStyles.parametresLightTheme]}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Nouveautés");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={[ ParametersStyles.iconButtonParametres, themeValue === "dark" ? ParametersStyles.iconButtonParametresDarkTheme : ParametersStyles.iconButtonParametresLightTheme ]} >
              <IconComponent name="new" size="24" color="#7159DF" />
            </View>
            <Text style={[ ParametersStyles.textButtonParametres, themeValue === 'dark' ? ParametersStyles.textButtonParametresDarkMode : ParametersStyles.textButtonParametresLightMode]}>Nouvelles fonctionnalités</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={ParametersStyles.buttonParametres}
          >
            <View style={[ ParametersStyles.iconButtonParametres, themeValue === "dark" ? ParametersStyles.iconButtonParametresDarkTheme : ParametersStyles.iconButtonParametresLightTheme ]} >
              <IconComponent name="help" size="24" color="#7159DF" />
            </View>
            <Text  style={[ ParametersStyles.textButtonParametres, themeValue === 'dark' ? ParametersStyles.textButtonParametresDarkMode : ParametersStyles.textButtonParametresLightMode]}>Besoin d'aide ?</Text>
            <IconComponent name="chevron-right" size="24" color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Logs");
            }}
            style={[ ParametersStyles.buttonParametres, ParametersStyles.lastButtonParametres ]}
          >
            <View style={[ ParametersStyles.iconButtonParametres, themeValue === "dark" ? ParametersStyles.iconButtonParametresDarkTheme : ParametersStyles.iconButtonParametresLightTheme ]} >
              <IconComponent name="list" size="24" color="#7159DF" />
            </View>
            <Text  style={[ ParametersStyles.textButtonParametres, themeValue === 'dark' ? ParametersStyles.textButtonParametresDarkMode : ParametersStyles.textButtonParametresLightMode]}>Historique des versions</Text>
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
