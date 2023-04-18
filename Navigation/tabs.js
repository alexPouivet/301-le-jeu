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

function PartiesStackScreen() {
  return (
    <PartiesStack.Navigator screenOptions={{headerShown: false}}>
      <PartiesStack.Screen name="Liste Parties" component={Parties} />
      <PartiesStack.Screen name="Details Partie" component={DetailsPartie} />
    </PartiesStack.Navigator>
  );
}

function JoueursStackScreen() {
  return (
    <JoueursStack.Navigator screenOptions={{headerShown: false}}>
      <JoueursStack.Screen name="Liste Joueurs" component={Joueurs} />
      <JoueursStack.Screen name="Details Joueur" component={DetailsJoueur} />
      <JoueursStack.Screen name="Classement Joueurs" component={ClassementJoueurs} />
      <PartiesStack.Screen name="Details Partie" component={DetailsPartie} />
      <JoueursStack.Screen name="Modifier Joueur" component={ModifierJoueur} />
    </JoueursStack.Navigator>
  );
}

function ParametresStackScreen() {
	return (
    <ParametresStack.Navigator screenOptions={{headerShown: false}}>
      <ParametresStack.Screen name="Parametres" component={Parametres} />
      <ParametresStack.Screen name="Partager" component={Partager} />
      <ParametresStack.Screen name="Probleme" component={Probleme} />
      <ParametresStack.Screen name="Configuration" component={Configuration} />
      <ParametresStack.Screen name="Nouveautés" component={Nouveautes} />
      <ParametresStack.Screen name="Logs" component={Logs} />
    </ParametresStack.Navigator>
  );
}

function ProfilStackScreen() {

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
        <ProfilStack.Screen name="Details Joueur" component={DetailsJoueur}/>
        <ProfilStack.Screen name="Details Partie" component={DetailsPartie} />
        <ProfilStack.Screen name="Modifier Joueur" component={ModifierJoueur} />
      </ProfilStack.Navigator>
    );

  } else if(isProfil == "none") {

    return (
      <ProfilStack.Navigator screenOptions={{headerShown: false}}>
      <ProfilStack.Screen name="Profil Vide" component={ProfilVide} />
        <ProfilStack.Screen name="Créer Profil">
          {(props) => <CreerProfilComponent {...props} extraData={{setIsProfil, toast, navigation}} />}
        </ProfilStack.Screen>
      </ProfilStack.Navigator>
    );

  }
}

const CreerProfilComponent = (isProfil) => {
  return (
    <CreerProfil isProfil={isProfil}/>
  )
}

const AddScreenComponent = () => {
  return null;
}

const Tabs = () => {

	return(
		<Tab.Navigator
			initialRouteName="Parties"
			screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#7159df',
            tabBarInactiveTintColor: '#BEBEBE',
        		headerShown: false,
            tabBarStyle: [
              {
                height: 64,
                paddingTop: 16,
                borderTopWidth: 0,
                paddingHorizontal: 16,
              }
            ],
            tabBarLabelStyle: {
              bottom: 2
            },
      		})}
		>

        <Tab.Screen name="Parties" component={PartiesStackScreen} options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="layer-bold" size="24" color="#7159df" />
              : <IconComponent name="layer" size="24" color="#BEBEBE" />;

            return icon;
          }
        }} />

        <Tab.Screen name="Joueurs" component={JoueursStackScreen} options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="persons-bold" size="24" color="#7159df" />
              : <IconComponent name="persons" size="24" color="#BEBEBE" />;

            return icon;
          }
        }} />

        <Tab.Screen name="Nouvelle partie" component={AddScreenComponent} options={{
  			  	tabBarLabel: () => null,
  			  	tabBarItemStyle: {
              maxWidth: 48,
              marginHorizontal: 12
            },
        		tabBarIcon: () => { return <BottomSheetModal/> },

          }}
        />

        <Tab.Screen name="Paramètres" component={ParametresStackScreen} options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="settings-bold" size="24" color="#7159df" />
              : <IconComponent name="settings" size="24" color="#BEBEBE" />;

            return icon;
    		  }
    		}}/>

        <Tab.Screen name="Profil" component={ProfilStackScreen} options={{
        	tabBarIcon: ({ focused, color, size}) => {
            let icon;
            icon = focused

              ? <IconComponent name="user-bold" size="24" color="#7159df" />
              : <IconComponent name="user" size="24" color="#BEBEBE" />;

            return icon;
          }
        }} />

      </Tab.Navigator>
	);
}

export default Tabs;
