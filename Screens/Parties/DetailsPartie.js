import { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsPartieStyles from '../../Constants/Parties/DetailsPartieStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import InfosPartieComponent from '../../Components/DetailsPartie/InfosPartieComponent';
import ItemJoueurComponent from '../../Components/DetailsPartie/ItemJoueurComponent';
import PodiumPartieComponent from '../../Components/DetailsPartie/PodiumPartieComponent';
import font from '../../Components/FontComponent';
import supprimerPartie from '../../Components/Parties/SupprimerPartie';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Détails d'une Partie
export default function DetailsPartie({ navigation, theme, route } ) {

  const [fontsLoaded] = font();
  const { game_id } = route.params;
  const [game, setGame] = useState(null);
  const [joueurs, setJoueurs] = useState(null);
  const toast = useToast();

  useEffect(() => {
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
    <View style={[ GlobalStyles.container, theme === 'dark' ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme]}>

      <View style={GlobalStyles.buttonsTextHeaderContainer}>

        <TouchableOpacity
          style={[ GlobalStyles.buttonLeft, theme === "dark" ? GlobalStyles.buttonLeftDarkTheme : GlobalStyles.buttonLeftLightTheme]}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <IconComponent name="arrow-back" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
        </TouchableOpacity>

        <Text style={[ DetailsPartieStyles.textDate, theme === "dark" ? DetailsPartieStyles.textDateDarkTheme : DetailsPartieStyles.textDateLightTheme ]}>Partie du {game.date} à {game.horaire}</Text>

        <TouchableOpacity
          style={[ GlobalStyles.buttonRight, theme === "dark" ? GlobalStyles.buttonRightDarkTheme : GlobalStyles.buttonRightLightTheme]}
          onPress={() => {
            showConfirmDialog(game_id, navigation, toast);
          }}
        >
          <IconComponent name="trash" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
        </TouchableOpacity>

      </View>

      <InfosPartieComponent game={game} theme={theme}/>

      <ScrollView>

        <PodiumPartieComponent joueurs1={joueurs[1]} joueurs0={joueurs[0]} joueurs2={joueurs[2]} theme={theme} />

        { joueurs.length > 3
          ?
            <View style={[ DetailsPartieStyles.containerJoueurs, theme === "dark" ? DetailsPartieStyles.containerJoueursDarkTheme : DetailsPartieStyles.containerJoueursLightTheme]}>
              {joueurs.map(({ nom_joueur, score_joueur, classement_joueur, avatar_slug }, i) => (
               i < 3
                ? null
                :
                <ItemJoueurComponent key={i} theme={theme} avatar_slug={avatar_slug} nom_joueur={nom_joueur} score_joueur={score_joueur} classement_joueur={classement_joueur} joueurs={joueurs} i={i}/>
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
          supprimerPartie(game_id).then(function() {
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
