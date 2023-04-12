import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import AvatarComponent from '../../Components/AvatarComponent'

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
    victoires: null,
    parties: null,
    positionMoy: null
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
    let db = this.props.db;
    let onRefresh = this.props.onRefresh;
    let toast = this.props.toast;

    db.transaction((tx) => {

      tx.executeSql(`SELECT classement_joueur, SUM(classement_joueur = 1) AS victoires, AVG(SUBSTR(classement_joueur, 1, 2)) AS position_moy, COUNT(*) AS nombre FROM infos_parties_joueurs WHERE infos_parties_joueurs.joueur_id = ?`, [joueur_id], (_, { rows: { _array } }) => {

        let positionMoy = null;

        if(_array[0].position_moy == null) {
          positionMoy = _array[0].position_moy;
        } else {
          positionMoy = _array[0].position_moy.toString().substring(0,4);
        }

        this.setState({
          victoires: _array[0].victoires,
          parties: _array[0].nombre,
          positionMoy: positionMoy,
        })

      })
    });

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

        <View style={JoueursStyles.iconButtonSwipeable}>

          <IconComponent name="edit-person" size="24" color="#fff" />

        </View>

      </TouchableOpacity>
      ,
      <TouchableOpacity
        style={JoueursStyles.buttonSupprimerSwipeable}
        onPress={() => {
          this.swipeable.recenter();
          deleteJoueur(joueur_id, db).then(function() {
            onRefresh();
            toast.show('Joueur supprimé !', {
              type: "success",
              placement: "top",
              animationType: "slide-in"
            });
          })

        }}
      >

        <View style={JoueursStyles.iconButtonSwipeable}>

          <IconComponent name="trash" size="24" color="#fff" />

        </View>

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

        <View style={JoueursStyles.iconButtonSwipeable}>

          <IconComponent name="edit-person" size="24" color="#fff" />

        </View>

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

              <AvatarComponent size={48} name={avatar_slug} />

              <View style={JoueursStyles.infosContainer}>

                <View style={JoueursStyles.primaryInfosJoueurContainer}>

                  <Text style={JoueursStyles.nomJoueur}>{nom_joueur}</Text>

                  { profil
                    ?
                    <View style={JoueursStyles.profilJoueurContainer}>
                      <IconComponent name="user-bold" size="12" color="#7159df" />
                      <Text style={JoueursStyles.profilJoueur}>Profil</Text>
                    </View>
                    :
                    null
                  }

                </View>

                <View style={JoueursStyles.secondaryInfosJoueurContainer}>

                  { this.state.parties == null || this.state.parties == 0

                    ?

                    null

                    :

                    <View style={JoueursStyles.rowSecondaryInfosJoueur}>

                    <IconComponent name="layer-bold" size="12" color="#7159df" />

                    { this.state.parties == 1

                      ?

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{this.state.parties} partie</Text>

                      :

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{this.state.parties} parties</Text>

                    }

                    </View>

                  }

                  { this.state.victoires == null || this.state.victoires == 0

                    ?

                    null

                    :

                    <View style={JoueursStyles.rowSecondaryInfosJoueur}>

                    <Text style={JoueursStyles.separatorSecondaryInfosJoueur}>·</Text>
                    <IconComponent name="cup" size="12" color="#FEC601" />

                    { this.state.victoires == 1

                      ?

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{this.state.victoires} victoire</Text>

                      :

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{this.state.victoires} victoires</Text>

                    }

                    </View>

                  }

                  { this.state.positionMoy == null

                    ?

                    null

                    :

                    <View style={JoueursStyles.rowSecondaryInfosJoueur}>

                      <Text style={JoueursStyles.separatorSecondaryInfosJoueur}>·</Text>
                      <IconComponent name="average" size="12" color="#FD96A9" />
                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{this.state.positionMoy} de moy.</Text>

                    </View>

                  }

                </View>

              </View>

            </View>

            <View>

              <IconComponent name="chevron-right" size="24" color="#C0C0C0" />

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
