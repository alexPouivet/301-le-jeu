import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import ModalDropdown from 'react-native-modal-dropdown';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';
import PartiesStyles from '../../Constants/Parties/PartiesStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import AvatarComponent from '../../Components/AvatarComponent'
import ItemPartieJoueurs from '../../Components/Parties/ItemPartieJoueurs';
import StatsJoueur from '../../Components/Joueurs/StatsJoueur';
import supprimerJoueur from '../../Components/Joueurs/SupprimerJoueur';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Détails d'un Joueur
export default function DetailsJoueur({ navigation, theme, route }) {

  const [fontsLoaded] = font();
  const [joueur, setJoueur] = useState(null);
  const [games, setGames] = useState(null);
  const [statutFiltres, setStatutFiltres] = useState({
    "statut": "Toutes les parties"
  });
  const toast = useToast();

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => initJoueur(route, db, setJoueur, setGames));

    initJoueur(route, db, setJoueur, setGames);

  }, [])

  if (joueur == null || joueur.length === 0) {
    return null
  }

  if (!fontsLoaded) {
    return null;
  }

  let modalOptions = []

  if(joueur.profil) {

    modalOptions = [
      {label: 'Modifier le profil', value: 'Modifier'},
    ];

  } else {

    modalOptions = [
      {label: 'Modifier le joueur', value: 'Modifier'},
      {label: 'Supprimer le joueur', value: 'Supprimer'}
    ];

  }

  const dropdownItem = (rowData) => {
    return (
      <View style={DetailsJoueurStyles.dropdownItem}>
        {rowData.value == "Modifier"
        ?
          <IconComponent name="edit-person" size="20" color={theme === "dark" ? "#fff" : "#252422"} />
        :
          <IconComponent name="trash" size="20" color={theme === "dark" ? "#fff" : "#252422"} />
        }
        <Text style={[theme === "dark" ? DetailsJoueurStyles.dropdownTextStyleDarkTheme : DetailsJoueurStyles.dropdownTextStyle]}>{rowData.label}</Text>
      </View>
    )
  }

  return (
    <View style={[ GlobalStyles.container, theme === "dark" ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme]}>

      <View style={GlobalStyles.buttonsHeaderContainer}>
        { joueur.profil
         ?
         <View>
         </View>
         :
         <TouchableOpacity
           style={[ GlobalStyles.buttonLeft, theme === "dark" ? GlobalStyles.buttonLeftDarkTheme : GlobalStyles.buttonLeftLightTheme]}
           onPress={() => {
             navigation.navigate('Liste Joueurs');
           }}
         >
           <IconComponent name="arrow-back" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
         </TouchableOpacity>
        }

        { joueur.profil

          ?

            <TouchableOpacity
              style={[ GlobalStyles.buttonRight, theme === "dark" ? GlobalStyles.buttonRightDarkTheme : GlobalStyles.buttonRightLightTheme]}
              onPress={() => {
                navigation.navigate("Modifier Joueur", {joueur_id: joueur.joueur_id })
              }}
            >
              <IconComponent name="edit-person" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
            </TouchableOpacity>

          :

          <ModalDropdown
            options={modalOptions}
            style={[ GlobalStyles.buttonRight, theme === "dark" ? GlobalStyles.buttonRightDarkTheme : GlobalStyles.buttonRightLightTheme]}
            renderRow={(rowData) => dropdownItem(rowData)}
            dropdownStyle={[ DetailsJoueurStyles.dropdownStyle, theme === "dark" ? DetailsJoueurStyles.dropdownStyleDarkTheme : DetailsJoueurStyles.dropdownStyleLightTheme]}
            onSelect={(index, value) => {
              if( value.value == "Modifier") {

                navigation.navigate("Modifier Joueur", {joueur_id: joueur.joueur_id })

              } else if (value.value == "Supprimer"){

                supprimerJoueur(joueur.joueur_id);
                navigation.goBack();
                toast.show('Joueur supprimé !', {
                  type: "success",
                  placement: "top",
                  animationType: "slide-in"
                });

              } else {

              }
            }}
          >
            <IconComponent name="dots" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
          </ModalDropdown>

        }

      </View>

      <ScrollView>

        <View style={DetailsJoueurStyles.infosJoueurContainer}>
          <AvatarComponent size={64} name={joueur.avatar_slug} />
          <Text style={[ DetailsJoueurStyles.joueur, theme === "dark" ? DetailsJoueurStyles.joueurDarkTheme : DetailsJoueurStyles.joueurLightTheme]}>{joueur.nom_joueur}</Text>
        </View>

        <StatsJoueur joueur={joueur} theme={theme}/>

        <View>

          <Text style={ DetailsJoueurStyles.subtitle }>historique des parties du joueur</Text>

          { games === null || games.length === 0
            ?
            <View style={PartiesStyles.listEmptyContainer}>

                  <Text style={[ PartiesStyles.listEmptyText, theme === "dark" ? PartiesStyles.listEmptyTextDarkTheme : PartiesStyles.listEmptyTextLightTheme ]}>L'historique est vide pour le moment.</Text>

            </View>
            :
            <View style={PartiesStyles.partiesContainer}>

              {games.map(({ partie_id, date, horaire, liste_joueurs, statut, gagnant_partie, nb_joueurs, avatars }, index) => (

                <ItemPartieJoueurs theme={theme} key={index} avatars={avatars} setGames={setGames} nbJoueurs={nb_joueurs} statutFiltres={statutFiltres} game_id={partie_id} date={date} time={horaire} statut={statut} gagnant_partie={gagnant_partie} navigation={navigation} db={db} index={index} />

              ))}

            </View>
          }

        </View>

      </ScrollView>
    </View>
  );
}

function initJoueur(route, db, setJoueur, setGames) {

  if( typeof route.params == 'undefined' ) {

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM joueurs WHERE joueurs.profil = ?`, [1], (_, { rows: { _array } }) => {

        setJoueur(_array[0]);
        addGames(_array[0], tx, setGames);

      })
    });

  } else {

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM joueurs WHERE joueurs.joueur_id = ?`, [route.params.joueur_id], (_, { rows: { _array } }) => {

        setJoueur(_array[0])
        addGames(_array[0], tx, setGames);

      });
    });

  }

}

function addGames(joueur, tx, setGames) {

  let joueur_id = joueur.joueur_id;


  tx.executeSql(
    `SELECT parties.partie_id, parties.gagnant_partie, parties.nb_joueurs, parties.date, parties.horaire, infos_parties_joueurs.joueur_id, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars, GROUP_CONCAT(infos_parties_joueurs.joueur_id) AS joueurs
      FROM parties
      INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
      INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
      GROUP BY infos_parties_joueurs.partie_id
      ORDER BY parties.partie_id DESC
      `
    , [], (_, { rows: { _array } }) => {

      const games = _array.map( game => {

        game.joueurs = game.joueurs.split(',');

        return game;

      })

      let filterGames = games.map(game => {

        let isInGame = null;

        for (const id_joueur of game.joueurs){

          if (id_joueur == joueur_id) {
            isInGame = "ok"
            break;
          } else {
            isInGame = null
          }

        }

        if (isInGame == "ok") {
          return game
        }
        else {

        }

      })

      filterGames = filterGames.filter(game => game !== undefined)

      setGames(filterGames)
    });
}
