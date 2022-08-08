import * as React from 'react';
import { Alert, Dimensions, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfosPartieComponent from '../Components/InfosPartieComponent';
import ItemJoueurComponent from '../Components/ItemJoueurComponent';
import PodiumJoueurComponent from '../Components/PodiumJoueurComponent';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

// Page Détails d'une partie
export default function DetailsPartie({ navigation, route }) {

  const { game_id } = route.params;
  const [game, setGame] = React.useState(null);
  const [joueurs, setJoueurs] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id], (_, { rows: { _array } }) => setGame(_array[0]));
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? ORDER BY joueur.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

  if (game === null || game.length === 0 || joueurs === null || joueurs.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSupprimer}
          onPress={() => {
            showConfirmDialog(game_id, navigation);
          }}
        >
          <Ionicons name='ios-trash-outline' size={28} color="#252422"/>
        </TouchableOpacity>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView style={styles.scrollview}>
        <PodiumJoueurComponent joueurs1={joueurs[1]} joueurs0={joueurs[0]} joueurs2={joueurs[2]} />
        <View style={styles.containerJoueurs}>
          {joueurs.map(({ nom_joueur, score_joueur, classement_joueur }, i) => (
           i < 3
            ? null
            :
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
          ))}

        </View>
      </ScrollView>
      <View style={styles.buttons}>
        { game.statut == "en cours" ?
          <TouchableOpacity
            style={styles.buttonReprendre}
            onPress={() => navigation.navigate('Partie', {
              game_id: game_id
            })}
          >
            <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Reprendre la partie</Text>
          </TouchableOpacity>
          :
          null
        }
      </View>
    </View>
  );
}

const showConfirmDialog = (game_id, navigation) => {
  
  return Alert.alert(
    "Supprimer la partie ?",
    "Etes vous sûr de vouloir supprimer la partie ? Cette action est définitive et toutes les données seront perdues.",
    [
      {
        text: "Annuler",
      },
      {
        text: "Supprimer",
        onPress: () => {
          deletePartie(game_id).then(function() {
            showConfirmDeleteDialog(navigation);
          })
        }
      },
    ],
  );
}

const showConfirmDeleteDialog = (navigation) => {
  return Alert.alert(
    "Partie supprimée",
    "La partie à bien été supprimée",
    [
      {
        text: "Revenir aux parties",
        onPress: () => {
          navigation.goBack();
        }
      }
    ],
  );
}

const deletePartie = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM game WHERE game.game_id = ?", [game_id]
      );
      tx.executeSql(
        "DELETE FROM joueur WHERE joueur.game_id = ?", [game_id]
      )
    })
    resolve(game_id)
  })
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:16,
  },
  buttonSupprimer: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:16,
  },
  scrollview: {
    paddingTop: 16,
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#d6d6d6",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 128,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  buttons: {
    position: "absolute",
    bottom: 48,
  },
  buttonReprendre: {
    marginLeft: 16,
    marginRight: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  }
})
