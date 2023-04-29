import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import IconComponent from '../Components/IconComponent';
import BottomSheetModal from '../Components/BottomSheetModal/BottomSheetModal';
import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

// Stack Parties
import Parties from '../Screens/Parties/Parties'
import DetailsPartie from '../Screens/Parties/DetailsPartie'
const PartiesStack = createNativeStackNavigator();

// Stack Joueurs
import Joueurs from '../Screens/Joueurs/Joueurs'
import ClassementJoueurs from '../Screens/Joueurs/ClassementJoueurs'
import ModifierJoueur from '../Screens/Joueurs/ModifierJoueur'
const JoueursStack = createNativeStackNavigator();

// Stack Paramètres
import Parametres from '../Screens/Parametres/Parametres'
import Partager from '../Screens/Parametres/Partager'
import Probleme from '../Screens/Parametres/Probleme'
import Logs from '../Screens/Parametres/Logs'
import Configuration from '../Screens/Parametres/Configuration'
import Nouveautes from '../Screens/Parametres/Nouveautes'
const ParametresStack = createNativeStackNavigator();

// Stack Profil
import ProfilVide from '../Screens/Joueurs/ProfilVide'
import CreerProfil from '../Screens/Joueurs/CreerProfil'
import DetailsJoueur from '../Screens/Joueurs/DetailsJoueur'
const ProfilStack = createNativeStackNavigator();

import { useToast } from "react-native-toast-notifications";
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function PartiesStackScreen(props) {

  let theme = props.theme;

  return (
    <PartiesStack.Navigator screenOptions={{headerShown: false}}>
      <PartiesStack.Screen name="Liste Parties">
        {(props) => <Parties {...props} theme={theme} />}
      </PartiesStack.Screen>
      <PartiesStack.Screen name="Details Partie">
        {(props) => <DetailsPartie {...props} theme={theme} />}
      </PartiesStack.Screen>
    </PartiesStack.Navigator>
  );
}

function JoueursStackScreen(props) {

  let theme = props.theme;

  return (
    <JoueursStack.Navigator screenOptions={{headerShown: false}}>
      <JoueursStack.Screen name="Liste Joueurs" >
        {(props) => <Joueurs {...props} theme={theme} />}
      </JoueursStack.Screen>
      <JoueursStack.Screen name="Details Joueur">
        {(props) => <DetailsJoueur {...props} theme={theme} />}
      </JoueursStack.Screen>
      <JoueursStack.Screen name="Classement Joueurs">
        {(props) => <ClassementJoueurs {...props} theme={theme} />}
      </JoueursStack.Screen>
      <PartiesStack.Screen name="Details Partie">
        {(props) => <DetailsPartie {...props} theme={theme} />}
      </PartiesStack.Screen>
      <JoueursStack.Screen name="Modifier Joueur">
        {(props) => <ModifierJoueur {...props} theme={theme} />}
      </JoueursStack.Screen>
    </JoueursStack.Navigator>
  );
}

function ParametresStackScreen(props) {

  let { theme, setTheme } = props

	return (
    <ParametresStack.Navigator screenOptions={{headerShown: false}}>
      <ParametresStack.Screen name="Parametres">
        {(props) => <Parametres{...props} setThemeForNavbar={setTheme} />}
      </ParametresStack.Screen>
      <ParametresStack.Screen name="Partager">
        {(props) => <Partager{...props} theme={theme} />}
      </ParametresStack.Screen>
      <ParametresStack.Screen name="Probleme">
        {(props) => <Probleme{...props} theme={theme} />}
      </ParametresStack.Screen>
      <ParametresStack.Screen name="Configuration">
        {(props) => <Configuration{...props} theme={theme} />}
      </ParametresStack.Screen>
      <ParametresStack.Screen name="Nouveautés">
        {(props) => <Nouveautes{...props} theme={theme} />}
      </ParametresStack.Screen>
      <ParametresStack.Screen name="Logs">
        {(props) => <Logs{...props} theme={theme} />}
      </ParametresStack.Screen>
    </ParametresStack.Navigator>
  );
}

function ProfilStackScreen(props) {

  const theme = props.theme;
  const [isProfil, setIsProfil] = useState(null);
  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {

      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM joueurs WHERE joueurs.profil = ?`, [1], (_, { rows: { _array } }) => {

          if (_array[0] !== undefined) {

            setIsProfil("profil");

          } else {
            setIsProfil("none");
          }

        })
      });

  }, [])

  if(isProfil == "profil") {

    return (
      <ProfilStack.Navigator screenOptions={{headerShown: false}}>
        <ProfilStack.Screen name="Details Joueur">
          {(props) => <DetailsJoueur {...props} theme={theme} />}
        </ProfilStack.Screen>
        <ProfilStack.Screen name="Details Partie">
          {(props) => <DetailsPartie {...props} theme={theme} />}
        </ProfilStack.Screen>
        <ProfilStack.Screen name="Modifier Joueur">
          {(props) => <ModifierJoueur {...props} theme={theme} />}
        </ProfilStack.Screen>
      </ProfilStack.Navigator>
    );

  } else if(isProfil == "none") {

    return (
      <ProfilStack.Navigator screenOptions={{headerShown: false}}>
        <ProfilStack.Screen name="Profil Vide">
          {(props) => <ProfilVide {...props} theme={theme}/>}
        </ProfilStack.Screen>
        <ProfilStack.Screen name="Créer Profil">
          {(props) => <CreerProfil {...props} theme={theme} extraData={{setIsProfil, toast, navigation}} />}
        </ProfilStack.Screen>
      </ProfilStack.Navigator>
    );

  }
}

const AddScreenComponent = () => {
  return null;
}

const Tabs = (props) => {

  let theme = props.theme;
  let setTheme = props.setTheme;

  let tabBarActiveTintColor = '#7159df';
  let tabBarInactiveTintColor = theme === "dark" ? "#fff" : '#BEBEBE'

	return(
		<Tab.Navigator
			initialRouteName="Parties"
			screenOptions={({ route }) => ({
            tabBarActiveTintColor: tabBarActiveTintColor,
            tabBarInactiveTintColor: tabBarInactiveTintColor,
        		headerShown: false,
            tabBarStyle: [
              {
                height: 64,
                paddingTop: 16,
                borderTopWidth: 0,
                paddingHorizontal: 16,
                backgroundColor: theme === "dark" ? "#3C3C3C" : '#fff'
              }
            ],
            tabBarLabelStyle: {
              bottom: 2
            },
      		})}
		>

        <Tab.Screen name="Parties" options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="layer-bold" size="24" color={tabBarActiveTintColor} />
              : <IconComponent name="layer" size="24" color={tabBarInactiveTintColor} />;

            return icon;
          }
        }}>
          {(props) => <PartiesStackScreen {...props} theme={theme} />}
        </Tab.Screen>

        <Tab.Screen name="Joueurs" options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="persons-bold" size="24" color={tabBarActiveTintColor} />
              : <IconComponent name="persons" size="24" color={tabBarInactiveTintColor} />;

            return icon;
          }
        }}>
          {(props) => <JoueursStackScreen {...props} theme={theme} />}
        </Tab.Screen>

        <Tab.Screen name="Nouvelle partie" component={AddScreenComponent} options={{
  			  	tabBarLabel: () => null,
  			  	tabBarItemStyle: {
              maxWidth: 48,
              marginHorizontal: 12
            },
        		tabBarIcon: () => { return <BottomSheetModal theme={theme}/> },

          }}
        />

        <Tab.Screen name="Paramètres" options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="settings-bold" size="24" color={tabBarActiveTintColor} />
              : <IconComponent name="settings" size="24" color={tabBarInactiveTintColor} />;

            return icon;
    		  }
    		}}>
          {(props) => <ParametresStackScreen {...props} setTheme={setTheme} theme={theme}/>}
        </Tab.Screen>

        <Tab.Screen name="Profil" options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="user-bold" size="24" color={tabBarActiveTintColor} />
              : <IconComponent name="user" size="24" color={tabBarInactiveTintColor} />;

            return icon;
          }
        }}>
          {(props) => <ProfilStackScreen {...props} theme={theme}/>}
        </Tab.Screen>

      </Tab.Navigator>
	);
}

export default Tabs;
