import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function itemJoueurComponent(props) {

	return (

		<View key={props.i} style={[ styles.joueur, props.i+1 == props.joueurs.length ? styles.lastJoueur : null ]}>
      <View style={styles.containerClassementJoueur}>
        <Text style={[styles.textClassementJoueur]}>{props.classement_joueur == null ? props.i+1 : props.classement_joueur}</Text>
      </View>
      <Text style={[styles.textNomJoueur]}>{props.nom_joueur}</Text>
      <View style={styles.containerPointsJoueur}>
        <Text style={styles.textPointsJoueur}>{props.score_joueur}</Text>
        <Text style={styles.libelePointsJoueur}>points restant</Text>
      </View>
    </View>

	)
}

const styles = StyleSheet.create({
  joueur: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastJoueur: {
    borderBottomWidth: 0,
    marginBottom: 4
  },
  containerClassementJoueur: {
    backgroundColor: '#7159df', 
    height: 40, 
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textClassementJoueur: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  textNomJoueur: {
    width: "50%",
    fontSize: 16,
    paddingLeft: 16,
    fontWeight: "500",
    color: "#252422",
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#252422",
  },
  containerPointsJoueur: {
    width: "35%",
    alignItems: "center"
  },
  textPointsJoueur: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 10,
    color: "#252422",
  },
  libelePointsJoueur: {
    fontSize: 12,
    fontWeight: "500",
    color: "#BEBEBE",
    marginTop: 4
  }
})