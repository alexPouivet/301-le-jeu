import * as React from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import openDatabase from './OpenDatabase';
const db = openDatabase();

export default function updateAllPartiesComponent() {

	const [games, setGames] = React.useState(null);

	React.useEffect(() => {
		db.transaction((tx) => {
		  // Recupère les données de toutes les parties
		  tx.executeSql(`SELECT * FROM game ORDER BY date DESC, time DESC`, [], (_, { rows: { _array } }) => setGames(_array));
		});
	}, []);

	return (

		<TouchableOpacity
            style={styles.buttonUpdate}
            onPress={() => {
              updateGames(games).then(function() {
                navigation.navigate('Historique');
              })
            }}
          >
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 16, fontWeight: "500"}}>Mettre à jour les parties</Text>
        </TouchableOpacity>

	);

}

const updateGames = function(games) {

  return new Promise(function(resolve, reject) {

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    for (let i = 0; i < games.length; i ++) {

      let dateAChanger = games[i].date.split('/');

      let jourDateAChanger = padTo2Digits(dateAChanger[0]);
      let moisDateAChanger = padTo2Digits(dateAChanger[1]);
      let anneeDate = dateAChanger[2];

      let timeAChanger = games[i].time.split(':');

      let heuresTimeAChanger = padTo2Digits(timeAChanger[0]);
      let minutesTimeAChanger = padTo2Digits(timeAChanger[1]);

      let newDate = jourDateAChanger + '/' + moisDateAChanger + '/' + anneeDate;
      let newTime = heuresTimeAChanger + 'h' + minutesTimeAChanger;

      games[i].date = newDate;
      games[i].time = newTime;

    }

    db.transaction((tx) => {
      for (let i = 0; i < games.length; i ++) {
        tx.executeSql('UPDATE game SET date = ?, time = ? WHERE game_id = ?', [games[i].date, games[i].time, games[i].game_id])
      }
    })
  })
}

const styles = StyleSheet.create({
  buttonUpdate: {
    paddingVertical: 15,
    borderRadius: 10,
    margin: 16,
    marginBottom: 12,
    backgroundColor: "#7159DF",
  },
})
