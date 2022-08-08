import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function podiumJoueurComponent(props) {

	return (
		<View style={{ marginLeft: 16, marginRight: 16, alignItems: "center", justifyContent: "flex-end"}}>
      <View style={{ width: "90%", height: 150, flexDirection: "row"}}>
        <View style={{ width: "30%", height: "100%", marginLeft: "auto" }}>
          <View style={{height: "50%", alignItems: "center"}}>
            { props.joueurs1 == null 
              ? null 
              : <Text style={styles.podiumJoueurNom}>{props.joueurs1.nom_joueur}</Text>
            }
          </View>
          <View style={{height: "50%", backgroundColor: "#C0C0C0", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            {props.joueurs1 == null 
              ? null 
              : <View style={styles.podiumJoueur}>
                  <Text style={styles.podiumJoueurScore}>{props.joueurs1.score_joueur}</Text>
                  <Text style={styles.podiumJoueurPoints}>points restant</Text> 
                </View>
            }
          </View>
        </View>
        <View style={{ width: "30%", height: "100%"}}>
          <View style={{height: "35%", alignItems: "center"}}>
            { props.joueurs0 == null 
              ? null 
              : <Text style={styles.podiumJoueurNom}>{props.joueurs0.nom_joueur}</Text>
            }
          </View>
          <View style={{height: "65%", backgroundColor: "#FEC601", borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
            {props.joueurs0 == null 
              ? null 
              : <View style={styles.podiumJoueur}>
                  <Text style={styles.podiumJoueurScore}>{props.joueurs0.score_joueur}</Text>
                  <Text style={styles.podiumJoueurPoints}>points restant</Text> 
                </View>
            }
          </View>
        </View>
        <View style={{ width: "30%", height: "100%", marginRight: "auto"}}>
          <View style={{height: "60%", alignItems: "center"}}>
            { props.joueurs2 == null 
              ? null 
              : <Text style={styles.podiumJoueurNom}>{props.joueurs2.nom_joueur}</Text>
            }
          </View>
          <View style={{height: "40%", backgroundColor: "#C49C48", borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
            {props.joueurs2 == null 
              ? null 
              : <View style={styles.podiumJoueur}>
                  <Text style={styles.podiumJoueurScore}>{props.joueurs2.score_joueur}</Text>
                  <Text style={styles.podiumJoueurPoints}>points restant</Text> 
                </View>
            }
          </View>
        </View>
      </View>
    </View>
	);

}

const styles = StyleSheet.create({
  podiumJoueur: {
    alignItems: "center", 
    paddingTop: 8
  },
  podiumJoueurNom: {
    marginTop: "auto", 
    marginBottom: 16, 
    fontSize: 16, 
    fontWeight: "500"
  },
  podiumJoueurScore: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold"
  },
  podiumJoueurPoints: {
    color:'#fff', 
    fontSize: 12
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#d6d6d6",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 128,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
})