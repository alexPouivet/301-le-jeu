import * as React from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import InfosPartieComponent from '../Components/InfosPartieComponent';
import ItemJoueurComponent from '../Components/ItemJoueurComponent';
import PodiumJoueurComponent from '../Components/PodiumJoueurComponent';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import DetailsPartieStyles from '../Constants/DetailsPartieStyles';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

// Page Détails d'une partie
export default function DetailsPartie({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={DetailsPartieStyles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={GlobalStyles.buttonSupprimer}
          onPress={() => {
            showConfirmDialog(game_id, navigation);
          }}
        >
          <Ionicons name='ios-trash-outline' size={28} color="#252422"/>
        </TouchableOpacity>
      </View>
      <InfosPartieComponent game={game}/>
      <ScrollView style={GlobalStyles.scrollview}>
        <PodiumJoueurComponent joueurs1={joueurs[1]} joueurs0={joueurs[0]} joueurs2={joueurs[2]} />
        <View style={DetailsPartieStyles.containerJoueurs}>
          {joueurs.map(({ nom_joueur, score_joueur, classement_joueur }, i) => (
           i < 3
            ? null
            :
            <ItemJoueurComponent key={i} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
          ))}

        </View>
      </ScrollView>
      <View style={DetailsPartieStyles.containerButton}>
        { game.statut == "en cours" ?
          <TouchableOpacity
            style={DetailsPartieStyles.buttonReprendre}
            onPress={() => navigation.navigate('Partie', {
              game_id: game_id
            })}
          >
            <Text style={DetailsPartieStyles.textButtonReprendre}>Reprendre la partie</Text>
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
        style: "cancel",
      },
      {
        text: "Supprimer",
        style: "destructive",
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
