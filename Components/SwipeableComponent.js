import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';
import ListPartiesStyles from '../Constants/ListPartiesStyles';

let customFonts = {
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
};

export default class SwipeableComponent extends React.Component {

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
    let setGames = this.props.setGames

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <Swipeable
        onRef={ref => this.swipeable = ref}
        rightButtons={[
          <TouchableOpacity

            style={ListPartiesStyles.buttonSupprimerSwipeable}
            onPress={() => {
              this.swipeable.recenter();
              deletePartie(this.props.game_id, db).then(function() {
                onRefresh(statutFiltres, db, setGames);
              })
            }}
          >
            <Ionicons name='ios-trash-outline' size={24} color="#fff" style={ListPartiesStyles.iconButtonSupprimerSwipeable}/>
          </TouchableOpacity>
        ]}
        style={ListPartiesStyles.swipeable}
        rightButtonWidth={64}
      >
        <TouchableOpacity style={[ListPartiesStyles.partie] }
          onPress={() => this.props.navigation.navigate('Details', {
            game_id: this.props.game_id
          })}
        >
          <View style={[ListPartiesStyles.partieInfosContainer, this.props.statut == "finie" ? ListPartiesStyles.partieFinie : ListPartiesStyles.partieEnCours ]}>
          {
          this.props.statut ==  "finie"
          ?
            <Ionicons name='ios-trophy-outline' size={32} color="#fff"/>
          :
            <Ionicons name='ios-hourglass-outline' size={32} color="#fff"/>
          }

          </View>
          <View style={ListPartiesStyles.infosContainer}>
            <View style={ListPartiesStyles.containerDateAndTime}>
              <Text style={[ListPartiesStyles.libeleDateAndTime, { fontFamily: "Poppins-Medium" }]}>Le {this.props.date} à {this.props.time}</Text>
            </View>
            <View style={ListPartiesStyles.containerJoueurs}>
              <Ionicons name='ios-people' size={20} color="#252422"/>
              <Text style={[ListPartiesStyles.libeleJoueurs, {fontFamily: "Poppins-Regular"}]} numberOfLines={1} ellipsizeMode='tail'> {this.props.liste_joueurs}</Text>
            </View>
          </View>
          <View style={ListPartiesStyles.arrowContainer}>
            <Ionicons name='ios-chevron-forward-outline' size={28} color="#252422"/>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}

const deletePartie = function(game_id, db) {

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

const onRefresh = function(statutFiltres, db, setGames) {

  if (statutFiltres["statut"] == 'Toutes les parties') {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM game ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array) );
    });
  } else if (statutFiltres["statut"] == 'Parties en Cours'){
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM game WHERE game.statut == "en cours" ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
  });
  } else {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM game WHERE game.statut == "finie" ORDER BY game_id DESC`, [], (_, { rows: { _array } }) => setGames(_array));
    });
  }
};
