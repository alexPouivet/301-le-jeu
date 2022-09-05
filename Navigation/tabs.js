import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import Parametres from '../Screens/Parametres'
import ListeParties from '../Screens/ListeParties'
import DetailsPartie from '../Screens/DetailsPartie'
import NouvellePartie from '../Screens/NouvellePartie'
import CreerPartie from '../Screens/CreerPartie'
import Partager from '../Screens/Partager'
import Probleme from '../Screens/Probleme'

const Tab = createBottomTabNavigator();
const PartieStack = createNativeStackNavigator();
const ParametresStack = createNativeStackNavigator();
const ListePartiesStack = createNativeStackNavigator();

function PartieStackScreen() {
  return (
    <PartieStack.Navigator screenOptions={{headerShown: false}}>
      <PartieStack.Screen name="Creer partie" component={CreerPartie} />
      <PartieStack.Screen name="Nouvelle Partie" component={NouvellePartie}/>
      <PartieStack.Screen name="Partie" component={Partie} />
    </PartieStack.Navigator>
  );
}

function ParametresStackScreen() {
	return (
    <ParametresStack.Navigator screenOptions={{headerShown: false}}>
      <ParametresStack.Screen name="Parametres" component={Parametres} />
      <ParametresStack.Screen name="Partager" component={Partager} />
      <ParametresStack.Screen name="Probleme" component={Probleme} />
    </ParametresStack.Navigator>
  );
}

function ListePartiesStackScreen() {
  return (
    <ListePartiesStack.Navigator screenOptions={{headerShown: false}}>
      <ListePartiesStack.Screen name="Liste" component={ListeParties} />
      <ListePartiesStack.Screen name="Details" component={DetailsPartie} />
    </ListePartiesStack.Navigator>
  );
}

const Tabs = () => {
	return(
		<Tab.Navigator
			tabBarStyle={{
				style: {
					position: 'absolute',
				}
			}}
			initialRouteName="ListeParties"
			screenOptions={({ route }) => ({
          		headerShown: false,

      		})}
		>
        <Tab.Screen name="Historique" component={ListePartiesStackScreen} options={{
        	tabBarActiveTintColor: '#7159df',
        	tabBarInactiveTintColor: '#24334c',
          unmountOnBlur: true,
        	tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            iconName = focused
              ? 'ios-library'
              : 'ios-library-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }} />
        <Tab.Screen name="Nouvelle partie" component={NouvellePartie}

        	options={{
			  	tabBarLabel: () => null,
          unmountOnBlur: true,
			  	tabBarStyle: { display: "none" },
        		tabBarIcon: ({focused, color, size}) => {
        			let iconName = 'ios-add-outline';
        			let iconSize = 40;
        			let iconColor = "#fff"

        			return <Ionicons name={iconName} size={iconSize} color={iconColor} style={{ marginLeft: 4,}}/>;
        		},
        		tabBarButton: (props) => (
        			<CustomTabBarButton {...props} />)
        	}}
        	tabBarOptions={{
    			showLabel: false,
    		}}
        />
        <Tab.Screen name="Paramètres" component={ParametresStackScreen} options={{
        	tabBarActiveTintColor: '#7159df',
        	showLabel: false,
          unmountOnBlur: true,
        	tabBarInactiveTintColor: '#24334c',
        	tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            iconName = focused
              ? 'ios-settings'
              : 'ios-settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
		  }
		}}/>
      </Tab.Navigator>
	);
}

const CustomTabBarButton = ({children, onPress}) => (
	<TouchableOpacity
		onPress={onPress}
		style={{
			top: -30,
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<View style={{
			width: 60,
			height: 60,
			borderRadius: 35,
			backgroundColor: '#7159df'
		}}>
		{children}
		</View>
	</TouchableOpacity>
);

export default Tabs;
