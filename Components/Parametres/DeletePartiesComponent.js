import { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

// Packages
import { useToast } from "react-native-toast-notifications";

// Styles
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import font from '../../Components/FontComponent';
import openDatabase from '../OpenDatabase';
const db = openDatabase();

// Supprimer toutes les Parties
export default function deleteAllPartiesComponent() {

	const [fontsLoaded] = font();
	const [games, setGames] = useState(null);
	const toast = useToast();

	useEffect(() => {
		db.transaction((tx) => {
		  tx.executeSql(`SELECT * FROM parties`, [], (_, { rows: { _array } }) => setGames(_array));
		});
	}, []);

  if (!fontsLoaded) {
    return null;
  }

	return (

		<TouchableOpacity
        style={[ ParametersStyles.button, {marginBottom: 0} ]}
        onPress={() => showConfirmDialog(toast, games)}
      >
        <Text style={ParametersStyles.textButton}>Supprimer toutes les parties</Text>
    </TouchableOpacity>

	)
}

const showConfirmDialog = (toast, games) => {
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
          deleteGames(games).then(function(result) {

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


const deleteGames = function(games) {

  return new Promise(function(resolve, reject) {

		if(games.length !== 0) {

			db.transaction((tx) => {
	      tx.executeSql('DELETE from parties');
				tx.executeSql('DELETE from infos_parties_joueurs');
				tx.executeSql('UPDATE joueurs SET nb_parties = ?, nb_victoires = ?, nb_points = ?, nb_podiums = ?, positions_parties = ? WHERE nb_parties >= ?', [0, 0, 0, 0, "[]", 1]);
	  	})

			resolve("ok");

		} else {

			reject("vide");

		}

	})
}
