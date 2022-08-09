import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import Swipeable from 'react-native-swipeable';
class SwipeableComponent extends React.Component {

  swipeable = null;

  render() {

    let statutFiltres = this.props.statutFiltres;
    let db = this.props.db;
    let setGames = this.props.setGames

    return (
      <Swipeable
        onRef={ref => this.swipeable = ref}
        rightButtons={[
          <TouchableOpacity

            style={{ justifyContent: "center", height: "100%", backgroundColor: "#FF4B3E", borderTopRightRadius: 16, borderBottomRightRadius: 16}}
            onPress={() => {
              this.swipeable.recenter();
              deletePartie(this.props.game_id, db).then(function() {
                onRefresh(statutFiltres, db, setGames);
              })
            }}
          >
            <Ionicons name='ios-trash-outline' size={24} color="#fff" style={{ marginRight: "auto", marginLeft: 20}}/>
          </TouchableOpacity>
        ]}
        style={styles.swipeable}
        rightButtonWidth={64}
      >
        <TouchableOpacity style={[styles.partie] }
          onPress={() => this.props.navigation.navigate('Details', {
            game_id: this.props.game_id
          })}
        >
          <View style={[styles.partieInfosContainer, this.props.statut == "finie" ? styles.partieFinie : styles.partieEnCours ]}>
          {
          this.props.statut ==  "finie"
          ?
            <Ionicons name='ios-trophy-outline' size={32} color="#fff"/>
          :
            <Ionicons name='ios-hourglass-outline' size={32} color="#fff"/>
          }

          </View>
          <View style={styles.infosContainer}>
            <View style={styles.containerDateAndTime}>
              <Text style={styles.libeleDateAndTime}>Le {this.props.date} à {this.props.time}</Text>
            </View>
            <View style={styles.containerJoueurs}>
              <Ionicons name='ios-people' size={20} color="#252422"/>
              <Text style={styles.libeleJoueurs} numberOfLines={1} ellipsizeMode='tail'> {this.props.liste_joueurs}</Text>
            </View>
          </View>
          <View style={styles.arrowContainer}>
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

export default SwipeableComponent;

const styles = StyleSheet.create({
  swipeable: {
    overflow: "hidden",
    height: "auto",
    borderRadius: 16,
  },
  partie: {
    paddingVertical: 12,
    paddingHorizontal: 12,

    width: "100%",
    flexDirection: "row",
  },
  partieInfosContainer: {
    height: 64,
    width: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  partieFinie: {
    backgroundColor: "#FEC601",
  },
  partieEnCours: {
    backgroundColor: "#7159DF"
  },
  infosContainer: {
    justifyContent: "space-evenly",
    marginLeft: 12,
    width: "60%"
  },
  containerDateAndTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  libeleDateAndTime: {
    color: "#252422",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerJoueurs: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  libeleJoueurs: {
    color: "#252422",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 4,
    flex: 1,
  },
  arrowContainer: {
    justifyContent: "center",
    marginLeft: "auto",
  },
})
