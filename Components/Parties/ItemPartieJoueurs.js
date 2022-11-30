import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import PartiesStyles from '../../Constants/Parties/PartiesStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Item d'une partie
export default class ItemPartie extends React.Component {


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

    let statutFiltres = this.props.statutFiltres;
    let db = this.props.db;
    let setGames = this.props.setGames;
    let avatars = this.props.avatars.split(',');
    let toast = this.props.toast;

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <View style={PartiesStyles.itemPartieContainer} >
        <Swipeable
          onRef={ref => this.swipeable = ref}
          style={PartiesStyles.swipeable}
          rightButtonWidth={64}
          rightButtons={[
            <TouchableOpacity

              style={PartiesStyles.buttonSupprimerSwipeable}
              onPress={() => {
                this.swipeable.recenter();
                deletePartie(this.props.game_id, db).then(function() {
                  onRefresh(statutFiltres, db, setGames);
                  toast.show('Partie supprimée !', {
                    type: "success",
                    placement: "top",
                    animationType: "slide-in"
                  });
                })
              }}
            >
              <Ionicons name='ios-trash-outline' size={24} color="#fff" style={PartiesStyles.iconButtonSupprimerSwipeable}/>
            </TouchableOpacity>
          ]}
        >
          <TouchableOpacity style={[PartiesStyles.wrapperPartie] }
            onPress={() => this.props.navigation.navigate('Details Partie', { game_id: this.props.game_id }) }
          >

            <View style={[PartiesStyles.statutPartieContainer, this.props.statut == "finie" ? PartiesStyles.partieFinie : PartiesStyles.partieEnCours ]}>
            {
            this.props.statut ==  "finie"
            ?
              <Ionicons name='ios-trophy-outline' size={32} color="#FEC601"/>
            :
              <Ionicons name='ios-hourglass-outline' size={32} color="#7159DF"/>
            }

            </View>

            <View style={PartiesStyles.infosPartieContainer}>

              <View style={PartiesStyles.containerDateAndTime}>
                <Text style={PartiesStyles.libeleDateAndTime}>Le {this.props.date} à {this.props.time}</Text>
              </View>

              <View style={PartiesStyles.containerJoueurs}>

              {avatars.map(( avatar_slug, i) => (

                <View key={i} style={PartiesStyles.avatarContainer}>

                  <AvatarComponent size={24} name={avatar_slug} />

                </View>

              ))}

              </View>

            </View>

            <View style={PartiesStyles.arrowContainer}>
              <Ionicons name='ios-chevron-forward-outline' size={24} color="#C0C0C0"/>
            </View>

          </TouchableOpacity>
        </Swipeable>
      </View>
    )
  }
}

const deletePartie = function(game_id, db) {

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

const onRefresh = function(statutFiltres, db, setGames) {

  if (statutFiltres["statut"] == 'Toutes les parties') {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT parties.partie_id, parties.date, parties.horaire, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
          FROM parties
          INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
          INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
          GROUP BY infos_parties_joueurs.partie_id
          ORDER BY parties.partie_id DESC`
        , [], (_, { rows: { _array } }) => { setGames( _array) });
    });
  } else if (statutFiltres["statut"] == 'Parties en Cours'){
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT parties.partie_id, parties.date, parties.horaire, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
        FROM parties
        INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
        INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
        WHERE parties.statut == "en cours"
        GROUP BY infos_parties_joueurs.partie_id
        ORDER BY parties.partie_id DESC`
      , [], (_, { rows: { _array } }) => { setGames(_array) });
  });
  } else {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT parties.partie_id, parties.date, parties.horaire, parties.statut, GROUP_CONCAT(joueurs.avatar_slug) AS avatars
          FROM parties
          INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
          INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
          WHERE parties.statut == "finie"
          GROUP BY infos_parties_joueurs.partie_id
          ORDER BY parties.partie_id DESC`
        , [], (_, { rows: { _array } }) => { setGames(_array) });
    });
  }
};
