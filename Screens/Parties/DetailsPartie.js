import * as React from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Components
import InfosPartieComponent from '../../Components/DetailsPartie/InfosPartieComponent';
import ItemJoueurComponent from '../../Components/DetailsPartie/ItemJoueurComponent';
import PodiumPartieComponent from '../../Components/DetailsPartie/PodiumPartieComponent';


import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Détails d'une Partie
export default function DetailsPartie({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const { game_id } = route.params;
  const [game, setGame] = React.useState(null);
  const [joueurs, setJoueurs] = React.useState(null);
  const toast = useToast();

  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère les données de la partie en cours
      tx.executeSql(`SELECT * FROM parties WHERE parties.partie_id = ?`, [game_id], (_, { rows: { _array } }) => { setGame(_array[0]) });
      // Récupère la liste des joueurs de la partie en cours
      tx.executeSql(`SELECT * FROM joueurs INNER JOIN infos_parties_joueurs ON joueurs.joueur_id = infos_parties_joueurs.joueur_id AND infos_parties_joueurs.partie_id = ? ORDER BY infos_parties_joueurs.score_joueur ASC`, [game_id], (_, { rows: { _array } }) => setJoueurs(_array));
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

      <View style={GlobalStyles.buttonsHeaderContainer}>

        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.buttonRight}
          onPress={() => {
            showConfirmDialog(game_id, navigation, toast);
          }}
        >
          <Ionicons name='ios-trash-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>

      </View>

      <InfosPartieComponent game={game}/>

      <ScrollView>

        <PodiumPartieComponent joueurs1={joueurs[1]} joueurs0={joueurs[0]} joueurs2={joueurs[2]} />

        { joueurs.length > 3
          ?
            <View style={DetailsPartieStyles.containerJoueurs}>
              {joueurs.map(({ nom_joueur, score_joueur, classement_joueur, avatar_slug }, i) => (
               i < 3
                ? null
                :
                <ItemJoueurComponent key={i} avatar_slug={avatar_slug} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
              ))}

            </View>
          :
            null
        }

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

const showConfirmDialog = (game_id, navigation, toast) => {

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
            navigation.goBack();
            toast.show('Partie supprimée !', {
              type: "success",
              placement: "top",
              animationType: "slide-in"
            });
          })
        }
      },
    ],
  );
}

const deletePartie = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM parties WHERE parties.partie_id = ?", [game_id]
      );
      tx.executeSql(
        "DELETE FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [game_id]
      )
    })
    resolve(game_id)
  })
}
