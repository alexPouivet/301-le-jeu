import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Packages
import Avatar from 'react-native-boring-avatars';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Item d'une partie
export default class ItemJoueur extends React.Component {

  swipeable = null;
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {

    let index = this.props.index;
    let profil = this.props.profil;
    let joueur_id = this.props.joueur_id;
    let avatar_slug = this.props.avatar_slug;
    let nom_joueur = this.props.nom_joueur;
    let setListJoueurs = this.props.setListJoueurs;
    let db = this.props.db;
    let toast = this.props.toast;
    let setJoueurs = this.props.setJoueurs;

    const rightButtons = [
      <TouchableOpacity

        style={JoueursStyles.buttonEditSwipeable}
        onPress={() => {

          if (profil) {
            this.props.navigation.navigate("Profil", {
              screen: "Modifier Joueur",
              params: {
                joueur_id: joueur_id
              }
            });
          } else {
            this.props.navigation.navigate("Modifier Joueur", {joueur_id: joueur_id })
          }

          this.swipeable.recenter();

        }}
      >
        <Ionicons name='ios-create-outline' size={24} color="#C0C0C0" style={JoueursStyles.iconButtonSwipeable}/>
      </TouchableOpacity>
      ,
      <TouchableOpacity
        style={JoueursStyles.buttonSupprimerSwipeable}
        onPress={() => {
          this.swipeable.recenter();
          deleteJoueur(joueur_id, db).then(function() {
            onRefresh(db, setJoueurs, setListJoueurs);
            toast.show('Joueur supprimé !', {
              type: "success",
              placement: "top",
              animationType: "slide-in"
            });
          })

        }}
      >
        <Ionicons name='ios-trash-outline' size={24} color="#fff" style={JoueursStyles.iconButtonSwipeable}/>
      </TouchableOpacity>
    ]

    const rightButtonsProfil = [
      <TouchableOpacity

        style={JoueursStyles.buttonEditSwipeable}
        onPress={() => {

          this.props.navigation.navigate("Profil", {
            screen: "Modifier Joueur",
            params: {
              joueur_id: joueur_id
            }
          });
          this.swipeable.recenter();

        }}
      >
        <Ionicons name='ios-create-outline' size={24} color="#C0C0C0" style={JoueursStyles.iconButtonSwipeable}/>
      </TouchableOpacity>
    ]

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <View style={JoueursStyles.itemJoueurContainer}>

        <Swipeable
          onRef={ref => this.swipeable = ref}
          rightButtonWidth={64}
          style={JoueursStyles.swipeable}
          rightButtons={ profil ? rightButtonsProfil : rightButtons }
        >

          <TouchableOpacity
            key={index}
            style={JoueursStyles.wrapperJoueur}
            onPress={() => {

              if (profil) {
                this.props.navigation.navigate('Profil')
              } else {
                this.props.navigation.navigate('Details Joueur', { joueur_id: joueur_id })
              }

            }
            }
          >
            <View style={JoueursStyles.infosJoueurContainer}>

              <Avatar
                size={48}
                name={avatar_slug}
                variant="beam"
                colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
              />

              <Text style={JoueursStyles.nomJoueur}>{nom_joueur}</Text>

              { profil
                ?
                <Text style={JoueursStyles.profilJoueur}>(profil)</Text>
                :
                null
              }
            </View>

            <View>

              <Ionicons name='ios-chevron-forward-outline' size={24} color="#C0C0C0"/>

            </View>

          </TouchableOpacity>

        </Swipeable>

      </View>
    )
  }
}

const deleteJoueur = function(joueur_id, db) {

  return new Promise(function(resolve, reject) {

    selectGames(joueur_id, db).then((games) => {

      let arrayGames = null;

      if (games !== null) {

        arrayGames = games.map(game => { return game.partie_id });

      }

      db.transaction((tx) => {

        // si le joueur est dans des parties
        if (arrayGames !==  null) {

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

        resolve();

      })

    });


  })
}

const selectGames = function(joueur_id, db) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {

      tx.executeSql(
        `SELECT parties.partie_id, GROUP_CONCAT(infos_parties_joueurs.joueur_id) AS joueurs
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


          resolve(filterGames);

        });

    });

  });

}

const onRefresh = function(db, setJoueurs, setListJoueurs) {

  db.transaction((tx) => {

    tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setListJoueurs(setJoueurs, _array));

  });

}
