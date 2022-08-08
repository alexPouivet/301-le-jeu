import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function infosPartieComponent(props) {

  return (

    <View style={[styles.containerStatutPartie, props.game.gagnant_game == null ? styles.containerStatutPartieEnCours : styles.containerStatutGagnant ]}>
      <View>
        {props.game.gagnant_game == null
          ?
            <Text style={styles.textStatutPartie}>Partie en cours</Text>
          :
            <Text style={styles.textStatutPartie}>Gagnant: {props.game.gagnant_game}</Text>
        }
      </View>
      <View style={{marginLeft: 8, marginRight: 8}}>
        <Text style={{color: "#fff"}}>|</Text>
      </View>
      <View style={styles.containerDate}>
        <Ionicons name='ios-calendar-outline' size={20} color="#fff"/>
        <Text style={styles.partieDate}>Le {props.game.date} à {props.game.time}</Text>
      </View>
    </View>

  );

}

const styles = StyleSheet.create({
  containerStatutPartie: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 16,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
  },
  containerStatutGagnant: {
    backgroundColor: "#FEC601",
  },
  containerStatutPartieEnCours: {
    backgroundColor: "#7159df",
  },
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: 'uppercase'
  },
  containerDateAndTime: {
    flexDirection: "row",
    marginBottom: 20
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center"
  },
  partieDate: {
    fontWeight: "500",
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
})
