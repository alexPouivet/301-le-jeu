import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Packages
import Avatar from 'react-native-boring-avatars';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';
import PartiesStyles from '../../Constants/Parties/PartiesStyles';

// Components
import ItemPartieJoueurs from '../../Components/Parties/ItemPartieJoueurs';
import StatsJoueur from '../../Components/Joueurs/StatsJoueur';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Détails d'un Joueur
export default function DetailsJoueur({ route, navigation }) {

  const [joueur, setJoueur] = React.useState(null);
  const [games, setGames] = useState(null);
  const [statutFiltres, setStatutFiltres] = useState({
    "statut": "Toutes les parties"
  });
  const toast = useToast();

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => initJoueur(route, db, setJoueur, setGames));

    initJoueur(route, db, setJoueur, setGames);

  }, [])

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (joueur == null || joueur.length === 0) {
    return null
  }

  if (!fontsLoaded) {
    return null;
  }

  let modalOptions = []

  if(joueur.profil) {

    modalOptions = [
      {label: 'Modifier le profil', value: 'Modifier', icon: 'ios-create-outline'},
    ];

  } else {

    modalOptions = [
      {label: 'Modifier le joueur', value: 'Modifier', icon: 'ios-create-outline'},
      {label: 'Supprimer le joueur', value: 'Supprimer', icon: 'ios-trash-outline'}
    ];

  }

  const dropdownItem = (rowData) => {
    return (
      <View style={DetailsJoueurStyles.dropdownItem}>
        <Ionicons name={rowData.icon} size={20} color="#252422"/>
        <Text style={DetailsJoueurStyles.dropdownTextStyle}>{rowData.label}</Text>
      </View>
    )
  }

  return (
    <View style={GlobalStyles.container}>

      <View style={GlobalStyles.buttonsHeaderContainer}>
        { joueur.profil
         ?
         <View>
         </View>
         :
         <TouchableOpacity
           style={GlobalStyles.buttonLeft}
           onPress={() => {
             navigation.navigate('Liste Joueurs');
           }}
         >
           <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
         </TouchableOpacity>
        }

        <ModalDropdown
          options={modalOptions}
          style={GlobalStyles.buttonRight}
          renderRow={(rowData) => dropdownItem(rowData)}
          dropdownStyle={DetailsJoueurStyles.dropdownStyle}
          onSelect={(index, value) => {
            if( value.value == "Modifier") {

              navigation.navigate("Modifier Joueur", {joueur_id: joueur.joueur_id })

            } else if (value.value == "Supprimer"){

              deleteJoueur(joueur.joueur_id, db, games);
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
          <Ionicons name='ios-ellipsis-vertical' size={24} color="#252422"  style={GlobalStyles.buttonIcon}/>
        </ModalDropdown>
      </View>

      <ScrollView>

        <View style={DetailsJoueurStyles.infosJoueurContainer}>
          <Avatar
            size={64}
            name={joueur.avatar_slug}
            variant="beam"
            colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
          />
          <Text style={DetailsJoueurStyles.joueur}>{joueur.nom_joueur}</Text>
        </View>

        <StatsJoueur games={games} joueur_id={joueur.joueur_id}/>

        <View>

          <Text style={ DetailsJoueurStyles.subtitle }>historique des parties</Text>

          { games === null || games.length === 0
            ?
            <View style={PartiesStyles.listEmptyContainer}>

                  <Text style={PartiesStyles.listEmptyText}>L'historique est vide pour le moment.</Text>

            </View>
            :
            <View style={PartiesStyles.partiesContainer}>

              {games.map(({ partie_id, date, horaire, liste_joueurs, statut, gagnant_game, avatars }, index) => (

                <ItemPartieJoueurs key={index} toast={toast} avatars={avatars} setGames={setGames} statutFiltres={statutFiltres} game_id={partie_id} date={date} time={horaire} statut={statut} gagnant_game={gagnant_game} navigation={navigation} db={db} index={index} />

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

function deleteJoueur(joueur_id, db, games) {

  let arrayGames = null;

  if (games !== null) {

    arrayGames = games.map(game => { return game.partie_id });

  }

  db.transaction((tx) => {

    // si le joueur est dans des parties
    if (arrayGames !== null) {

      //  boucle pour mettre à jour les données des parties
      for (var i = 0; i < arrayGames.length; i++) {

        let partie_id = arrayGames[i];

        tx.executeSql(`UPDATE parties SET nb_joueurs = nb_joueurs - 1, nb_joueurs_restant = nb_joueurs_restant - 1 WHERE partie_id = ?`, [ partie_id ], (_, { rows: _array } ) => {

          // suppression du joueur de la table infos_parties_joueurs
          tx.executeSql("DELETE FROM infos_parties_joueurs WHERE infos_parties_joueurs.joueur_id = ?", [joueur_id]);

          tx.executeSql("SELECT parties.nb_joueurs FROM parties WHERE parties.partie_id = ?", [partie_id], (_, { rows: { _array } } ) => {

            let nbJoueurs = _array[0].nb_joueurs;

            tx.executeSql("SELECT * FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [partie_id], (_, { rows: { _array } } ) => {

              let compteur = 1;

              for (var i = 0; i < nbJoueurs; i++) {

                if( _array[i].score_joueur !== 0 && _array[i].position_joueur_en_cours !== null) {

                  // Mise à jour de la position des joueurs en cours qui n'ont pas fini la partie
                  tx.executeSql('UPDATE infos_parties_joueurs SET position_joueur_en_cours = ?, position_joueur = ? WHERE joueur_id = ? AND partie_id = ?', [compteur, i + 1, _array[i].joueur_id, partie_id]);

                  compteur++;

                }

              }

            });

            tx.executeSql("SELECT * FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [partie_id]);

          })

        });

      }

    }

    // suppression du joueur de la table joueurs
    tx.executeSql(`DELETE FROM joueurs WHERE joueur_id = ?`, [joueur_id]);

  })

}

function addGames(joueur, tx, setGames) {

  let joueur_id = joueur.joueur_id;


  tx.executeSql(
    `SELECT parties.partie_id, parties.date, parties.horaire, infos_parties_joueurs.joueur_id, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars, GROUP_CONCAT(infos_parties_joueurs.joueur_id) AS joueurs
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
