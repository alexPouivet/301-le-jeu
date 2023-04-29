import { useState, useEffect, useCallback, useContest } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform, useColorScheme  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { get, save } from './storage';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from 'react-native-toast-notifications'
import { PortalProvider } from '@gorhom/portal';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import IconComponent from './Components/IconComponent';

import Tabs from './Navigation/tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Partie from './Screens/Partie/Partie'
import GagnantPartie from './Screens/Partie/GagnantPartie'
import Classement from './Screens/Partie/Classement'
import FinDeTour from './Screens/Partie/FinDeTour'
import DetailsPartie from './Screens/Parties/DetailsPartie'

import * as NavigationBar from 'expo-navigation-bar';


export default function App() {

  const appearance = useColorScheme();
  const [theme, setTheme] = useState('');

  const setAppTheme = useCallback(async () => {
    const IS_FIRST = await get('IS_FIRST');
    if (IS_FIRST === null) {
      save('Theme', appearance);
      save('IsDefault', true);
      save('IS_FIRST', true);
    }
  }, []);

  const changeNavigationBarColor = async (theme) => {
    if (theme === "dark") {
      NavigationBar.setBackgroundColorAsync("#3C3C3C");
    } else {
      NavigationBar.setBackgroundColorAsync("#ffffff");
    }
  }

  const declareTheme = async () => {
     try {
      let mode = await get('Theme') || '';
      setTheme(mode)
      if (Platform.OS === "android") changeNavigationBarColor(mode)
    } catch (error) {}
  }


  useEffect(() => {

    declareTheme()
    setAppTheme();

  }, [setAppTheme]);

  return (
    <>

      <SafeAreaView edges={["top"]} style={{ backgroundColor: theme === 'dark' ?  "#252422" : "#f3f3f3" }} />
      <SafeAreaView edges={["left", "right", "bottom"]} style={{ flex: 1, position: "relative", backgroundColor: theme === "dark" ? "#3C3C3C" : '#fff' }}>
      <StatusBar
        backgroundColor={ theme === 'dark' ?  "#252422" : "#f3f3f3" }
        barStyle={ theme === "dark" ? "light-content" : "dark-content" }
      />

        <SafeAreaProvider>
        <PortalProvider>

        <GestureHandlerRootView style={{flex: 1}}>

        <BottomSheetModalProvider>

          <ToastProvider
            offsetTop={40}
            duration={1125}
            successColor="#68B684"
            warningColor="#FF4B3E"
            successIcon={<IconComponent name="check" size="20" color="#ffffff" />}
            warningIcon={<IconComponent name="warning" size="20" color="#ffffff" />}
          >
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen name="Home">
                  {(props) => <Tabs {...props} theme={theme} setTheme={setTheme} />}
                </Stack.Screen>
                <Stack.Screen name="Partie">
                  {(props) => <Partie {...props} theme={theme} />}
                </Stack.Screen>
                <Stack.Screen name="Classement">
                  {(props) => <Classement {...props} theme={theme} />}
                </Stack.Screen>
                <Stack.Screen name="Fin de Tour">
                  {(props) => <FinDeTour {...props} theme={theme} />}
                </Stack.Screen>
                <Stack.Screen name="Gagnant Partie">
                  {(props) => <GagnantPartie {...props} theme={theme} />}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>

          </ToastProvider>

        </BottomSheetModalProvider>

        </GestureHandlerRootView>

        </PortalProvider>
        </SafeAreaProvider>

        </SafeAreaView>

    </>
  );
}
