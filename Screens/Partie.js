import * as React from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import Ionicons from '@expo/vector-icons/Ionicons';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

function Points(props) {
  return (
    <View style={{backgroundColor: "#fff", width: 56, borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
      <Text style={{color: "#7159DF", fontWeight: "bold", fontSize: 28}}>{props.score}</Text>
      <Text style={{position: "absolute", bottom: 2, fontSize: 11, color: "#C0C0C0"}}>pts</Text>
    </View>
  )
}

export default function Partie({ navigation, route }) {

  const {game_id } = route.params;

  const [game, setGame] = React.useState(null);
  const [joueur, setJoueur] = React.useState(null);
  const [joueurs, setJoueurs] = React.useState(null);


  const [points20, setPoints20] = React.useState(0);
  const [points10, setPoints10] = React.useState(0);
  const [points8, setPoints8] = React.useState(0);
  const [points6, setPoints6] = React.useState(0);
  const [points4, setPoints4] = React.useState(0);
  const [points2, setPoints2] = React.useState(0);
  const [point1, setPoint1] = React.useState(0);


  React.useEffect(() => {
    db.transaction((tx) => {
      // Récupère de la bdd la partie en cours
      tx.executeSql(`SELECT * FROM game WHERE game.game_id = ?`, [game_id],
        function(tx, res) {
          setGame(res.rows["_array"][0])
          // Récupère le joueur dont c'est le tour de jouer
          tx.executeSql(`SELECT * FROM joueur WHERE joueur.game_id = ? AND joueur.position_joueur_en_cours = ?`, [game_id, res.rows["_array"][0].tour_joueur], (_, { rows: { _array } }) => setJoueur(_array[0]));
        }
      );
      tx.executeSql('SELECT nom_joueur, position_joueur, position_joueur_en_cours, joueur_id from joueur WHERE game_id = ?', [game_id], (_, { rows: { _array } }) => setJoueurs(_array))
    });
  }, []);

  if (joueur === null || joueurs === null) {
    return null;
  }

  let joueurPrecedent = []
  let joueurEnCours = []
  let joueurSuivant = []

  for(let i = 0; i < joueurs.length; i++) {

    joueurs[i].position_joueur_en_cours == (joueur.position_joueur_en_cours - 1 )
      ? joueurPrecedent.push(<Text key={i} style={[styles.joueurPrecedent]}>{joueurs[i].nom_joueur}</Text>)
      : null

    joueurs[i].joueur_id == joueur.joueur_id
      ? joueurEnCours.push(<Text key={i} style={[styles.joueurEnCours]}>{joueur.nom_joueur}</Text>)
      : null

    joueurs[i].position_joueur_en_cours == (joueur.position_joueur_en_cours + 1 )
      ? joueurSuivant.push(<Text key={i} style={[styles.joueurSuivant]}>{joueurs[i].nom_joueur}</Text>)
      : null
  }

  //  calcul du nombre de palets restants à jouer pendant le tour
  let totalPalets = game.nb_palets - (points20 + points10 + points8 + points6 + points4 + points2 + point1)
  let isPaletsEqualZero = false

  return(
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.navigate('Liste')
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonClassement}
          onPress={() => {
            navigation.navigate('Classement', {
              game_id: game_id
            })
        }}>
          <Ionicons name='ios-podium-outline' size={24} color="#252422"/>
        </TouchableOpacity>
      </View>
      <View style={styles.infosTour}>
            <View style={styles.listeJoueurs}>
              <View style={{width: "33%"}}>{joueurPrecedent}</View>
              <View style={{width: "33%" }}>{joueurEnCours}</View>
              <View style={{width: "33%"}}>{joueurSuivant}</View>
            </View>
            <View style={{width: "15%", height: 2, backgroundColor: "#fff", marginLeft: "auto", marginRight: "auto", marginBottom: 16, marginTop: 8}}></View>
            <View style={{flexDirection: "row", alignItems: "center", marginLeft: "auto", marginRight: "auto"}}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Ionicons name='ios-disc-outline' size={36} color="#fff"/>
                <View style={{marginLeft: 4}}>
                  <Text style={styles.textInfosTour}>{totalPalets}{totalPalets == 0 ? isPaletsEqualZero = true : isPaletsEqualZero = false } palets</Text>
                  <Text style={{fontSize: 12, color: "#fff", fontWeight: "500"}}>restant</Text>
                </View>
              </View>
              <View style={{width: 2, height: "80%", backgroundColor: "#fff", marginLeft: 12, marginRight: 12}}></View>
              <Text style={styles.textInfosTour}>Tour {game.tour_game}</Text>
              <View style={{width: 2, height: "80%", backgroundColor: "#fff", marginLeft: 12, marginRight: 12}}></View>
              <View>
                <Text style={styles.textInfosTour}>{joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1)} points</Text>
                <Text style={{fontSize: 12, color: "#fff", fontWeight: "500"}}>restant</Text>
              </View>
            </View>
          </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.scrollContainer}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Points score="20" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points20}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{
                  setPoints20(num)
                }}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 20 ? true : false}
              />
              <Points score="20" />
            </View>
            <View style={styles.inputContainer}>
              <Points score="10" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points10}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{
                  setPoints10(num)
                }}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 10 ? true : false}
              />
              <Points score="10" />
            </View>
            <View style={styles.inputContainer}>
              <Points score="8" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points8}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{setPoints8(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 8 ? true : false}
              />
              <Points score="8" />
            </View>
            <View style={styles.inputContainer}>
              <Points score="6" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points6}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{setPoints6(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 6 ? true : false}
              />
              <Points score="6" />
            </View>
            <View style={styles.inputContainer}>
              <Points score="4" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points4}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{setPoints4(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 4 ? true : false}
              />
              <Points score="4" />
            </View>
            <View style={styles.inputContainer}>
              <Points score="2" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points2}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{setPoints2(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 2 ? true : false}
              />
              <Points score="2" />
            </View>
            <View style={styles.inputContainer}>
              <Points score="1" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={point1}
                style={{width: "50%", borderWidth: 0}}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={{borderRadius:16, activityOpacity: 0, backgroundColor: "#7159df" }}
                inputStyle={{backgroundColor: "#fff", width: 56, height: 56, marginLeft: 16, marginRight: 16, borderRadius: 16, fontWeight: "bold", fontSize: 30, borderColor: "#7159df", borderWidth: 3 }}
                onChange={(num)=>{setPoint1(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 1 ? true : false}
              />
              <Points score="1" />
            </View>
          </View>
        </View>
      </ScrollView>
      {joueur.position_joueur_en_cours < game.nb_joueurs_restant ?
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Met à jour le joueur et passe au joueur suivant
                updateJoueur(points20, points10, points8, points6, points4, points2, point1, joueur, game).then(function(array) {
                  const [ game_id, isJoueurWin ] = array

                  if(isJoueurWin == true) {
                    navigation.push('Gagnant Partie', {
                      game_id: game_id,
                    })
                  } else {
                    navigation.push('Partie', {
                      game_id: game_id,
                    })
                  }
                })
              }}
            >
              <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Joueur suivant</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Met à jour le score du joueur et passe à la page Fin de Tour
                updateJoueur(points20, points10, points8, points6, points4, points2, point1, joueur, game).then(function(array) {
                  const [ game_id, isJoueurWin ]= array

                  if(isJoueurWin == true) {
                    navigation.push('Gagnant Partie', {
                      game_id: game_id,
                    })
                  } else {
                    navigation.push('Fin de Tour', {
                      game_id: game_id,
                    })
                  }
                })
              }}
            >
              <Text style={{textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Terminer le tour</Text>
            </TouchableOpacity>
          }
    </View>
  )
}

const updateJoueur = function(points20, points10, points8, points6, points4, points2, point1, joueur, game) {

  return new Promise(function(resolve, reject) {

    const points = points20 * 20 + points10 * 10 + points8 * 8 + points6 * 6 + points4 * 4 + points2 * 2 + point1

    db.transaction((tx) => {

      // Mise à jour du score du joueur en cours de partie et du nombre de tour joués
      tx.executeSql('UPDATE joueur SET score_joueur = score_joueur - ?, tour_joueur = tour_joueur +1 WHERE joueur_id = ?', [points, joueur.joueur_id]);
      if(joueur.position_joueur_en_cours < game.nb_joueurs_restant) {
        // Met à jour le tour du joueur pour faire jouer le joueur suivant
        tx.executeSql('UPDATE game SET tour_joueur = ? + 1 WHERE game_id = ?', [game.tour_joueur, game.game_id])
      }
      else {
        // Réinitialise le compteur du tour pour refaire jouer le premier joueur au prochain tour
        tx.executeSql('UPDATE game SET tour_joueur = ? WHERE game_id = ?', [1, game.game_id])
      }

      // Retourne l'id de la partie en cours
      if (joueur.score_joueur - points == 0) {

        if(game.gagnant_game == null) {
          // Mise à jour du gagnant de la partie lorsque le premier gagnant est déclaré
          tx.executeSql('UPDATE game SET gagnant_game = ? WHERE game_id = ?', [joueur.nom_joueur, game.game_id])
          // Mise à jour du classement du joueur ayant gagné la partie
          tx.executeSql('UPDATE joueur SET classement_joueur = ? WHERE joueur_id = ?', [1, joueur.joueur_id])
        } else {
          // Mise à jour du classement du joueur ayant terminé la partie mais pas en première position
          tx.executeSql('UPDATE joueur SET classement_joueur = ? WHERE joueur_id = ?', [game.nb_joueurs - (game.nb_joueurs_restant -1), joueur.joueur_id])
        }

        let isJoueurWin = true
        resolve([game.game_id, isJoueurWin])
      } else {

        let isJoueurWin = false
        resolve([game.game_id, isJoueurWin])
      }
    })

  })
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:16,
  },
  buttonClassement: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 2,
    marginLeft: "auto",
    marginRight: 16
  },
  infosTour: {
    backgroundColor: "#7159df",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    padding: 8
  },
  listeJoueurs: {
    flexDirection: "row",
    justifyContent: "center"
  },
  joueurPrecedent: {
    fontSize: 14,
    color: "#fff",
    textAlign: "right",
    marginTop: "auto",
  },
  joueurEnCours: {
    fontSize: 18,
    marginTop: "auto",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  joueurSuivant: {
    fontSize: 14,
    color: "#fff",
    textAlign: "left",
    marginTop: "auto",
  },
  textInfosTour: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: "bold"
  },
  scrollview: {
    width: "100%"
  },
  scrollContainer: {
    marginBottom: 70
  },

  inputsContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  inputContainer: {
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row"
  },
  button: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  }
})
