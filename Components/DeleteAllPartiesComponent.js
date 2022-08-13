import * as React from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import openDatabase from './OpenDatabase';
const db = openDatabase();

export default function deleteAllPartiesComponent() {

	return (

		<TouchableOpacity
        style={styles.button}
        onPress={() => showConfirmDialog()}
      >
        <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 16, fontWeight: "500"}}>Supprimer toutes les parties</Text>
    </TouchableOpacity>

	)
}

const showConfirmDialog = () => {
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
          deleteGames().then(function() {
            showConfirmDeleteDialog();
          })
        }
      },
    ],
  );
}

const showConfirmDeleteDialog = () => {
  return Alert.alert(
    "Parties supprimées",
    "Toutes les parties ont bien étés supprimées",
    [
      {
        text: "Ok",
      }
    ],
  );
}

const deleteGames = function(games) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql('DELETE from game');
    })

    resolve('ok');

  })
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    margin: 16,
    marginTop: 0,
    marginBottom: 12,
    backgroundColor: "#FF4B3E",
  },
})
