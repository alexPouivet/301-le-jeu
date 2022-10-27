import * as React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import openDatabase from '../OpenDatabase';
const db = openDatabase();

export default function updateAllPartiesComponent() {

	const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

	const [games, setGames] = React.useState(null);
	const toast = useToast();

	React.useEffect(() => {
		db.transaction((tx) => {
		  // Recupère les données de toutes les parties
		  tx.executeSql(`SELECT * FROM parties`, [], (_, { rows: { _array } }) => setGames(_array));
		});
	}, []);

	if (!fontsLoaded) {
    return null;
  }

	return (

		<TouchableOpacity
      style={ParametersStyles.buttonUpdate}
      onPress={() => {
        updateGames(games).then(function(result) {

					toast.show('Parties réinitialisées !', {
						type: "success",
						placement: "top",
						animationType: "slide-in"
					});

				})
				.catch(function(rej) {

					if(rej == "vide") {

						toast.show('Aucune partie à réinitialiser', {
							type: "warning",
							placement: "top",
							animationType: "slide-in"
						});

					}

				})
      }}
    >
      <Text style={ParametersStyles.textButton}>Réinitialiser les parties</Text>
  </TouchableOpacity>

	);

}

const updateGames = function(games) {

  return new Promise(function(resolve, reject) {

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

		function containsAnyLetters(str) {
  		return /[h]/.test(str);
		}

		if(games.length !== 0) {

			for (let i = 0; i < games.length; i ++) {

	      let dateAChanger = games[i].date.split('/');


	      let jourDateAChanger = padTo2Digits(dateAChanger[0]);
	      let moisDateAChanger = padTo2Digits(dateAChanger[1]);
	      let anneeDate = dateAChanger[2];

				if (!containsAnyLetters(games[i].horaire)) {

					let timeAChanger = games[i].horaire.split(':');

					let heuresTimeAChanger = padTo2Digits(timeAChanger[0]);
					let minutesTimeAChanger = padTo2Digits(timeAChanger[1]);

					let newDate = jourDateAChanger + '/' + moisDateAChanger + '/' + anneeDate;
		      let newTime = heuresTimeAChanger + 'h' + minutesTimeAChanger;

		      games[i].date = newDate;
		      games[i].horaire = newTime;

				} else {

					let newDate = jourDateAChanger + '/' + moisDateAChanger + '/' + anneeDate;
		      let newTime = games[i].horaire;

		      games[i].date = newDate;
		      games[i].horaire = newTime;

				}

	    }

	    db.transaction((tx) => {
	      for (let i = 0; i < games.length; i ++) {
	        tx.executeSql('UPDATE parties SET date = ?, horaire = ? WHERE partie_id = ?', [games[i].date, games[i].horaire, games[i].game_id])
	      }
	    })

			resolve("ok");

		} else {

			reject("vide");

		}


  })
}
