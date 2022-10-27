import * as React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

// Packages
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import openDatabase from '../OpenDatabase';
const db = openDatabase();

// Supprimer toutes les Parties
export default function deleteAllPartiesComponent() {

	const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });
	const toast = useToast();

  if (!fontsLoaded) {
    return null;
  }

	return (

		<TouchableOpacity
        style={[ ParametersStyles.button, {marginBottom: 0} ]}
        onPress={() => showConfirmDialog(toast)}
      >
        <Text style={ParametersStyles.textButton}>Supprimer toutes les parties</Text>
    </TouchableOpacity>

	)
}

const showConfirmDialog = (toast) => {
  return Alert.alert(
    "Supprimer toutes les parties ?",
    "Etes vous sûr de vouloir supprimer toutes les parties enregistrées ? Cette action est définitive.",
    [
      {
        text: "Annuler",
				style: "cancel",
      },
      {
        text: "Supprimer",
				style: "destructive",
        onPress: () => {
          deleteGames().then(function(result) {

						toast.show('Toutes les parties ont été supprimées !', {
							type: "success",
							placement: "top",
							animationType: "slide-in"
						});

          })
					.catch(function(rej) {

						if(rej == "vide") {

							toast.show('Aucune partie à supprimer', {
								type: "warning",
								placement: "top",
								animationType: "slide-in"
							});

						}

					})
        }
      },
    ],
  );
}


const deleteGames = function() {

  return new Promise(function(resolve, reject) {

		db.transaction((tx) => {
      tx.executeSql('DELETE from parties');
			tx.executeSql('DELETE from infos_parties_joueurs');
  	})
		
		resolve('ok');

	})
}
