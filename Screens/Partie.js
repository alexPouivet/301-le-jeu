import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import PartieStyles from '../Constants/PartieStyles';

import openDatabase from '../Components/OpenDatabase';
const db = openDatabase();

function Points(props) {
  return (
    <View style={PartieStyles.pointsContainer}>
      <Text style={[PartieStyles.textPoints, {fontFamily: "Poppins-Bold"} ]}>{props.score}</Text>
      <Text style={PartieStyles.textsPointsLabel}>pts</Text>
    </View>
  )
}

export default function Partie({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

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
      ? joueurPrecedent.push(<Text key={i} style={[PartieStyles.joueurPrecedent]}>{joueurs[i].nom_joueur}</Text>)
      : null

    joueurs[i].joueur_id == joueur.joueur_id
      ? joueurEnCours.push(<Text key={i} style={[PartieStyles.joueurEnCours, {fontFamily: "Poppins-Bold"}]}>{joueur.nom_joueur}</Text>)
      : null

    joueurs[i].position_joueur_en_cours == (joueur.position_joueur_en_cours + 1 )
      ? joueurSuivant.push(<Text key={i} style={[PartieStyles.joueurSuivant]}>{joueurs[i].nom_joueur}</Text>)
      : null
  }

  //  calcul du nombre de palets restants à jouer pendant le tour
  let totalPalets = game.nb_palets - (points20 + points10 + points8 + points6 + points4 + points2 + point1)
  let isPaletsEqualZero = false

  if (!fontsLoaded) {
    return null;
  }

  return(
    <View style={GlobalStyles.container}>
      <View style={PartieStyles.headerContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.navigate('Liste')
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[PartieStyles.titrePage, {fontFamily: "Poppins-Medium"} ]}>Tour n°{game.tour_game}</Text>
        <TouchableOpacity
          style={PartieStyles.buttonClassement}
          onPress={() => {
            navigation.navigate('Classement', {
              game_id: game_id
            })
        }}>
          <Ionicons name='ios-podium-outline' size={24} color="#252422"/>
        </TouchableOpacity>
      </View>
      <View style={PartieStyles.infosTour}>
            <View style={PartieStyles.listeJoueurs}>
              <View style={PartieStyles.joueursContainer}>{joueurPrecedent}</View>
              <View style={PartieStyles.joueursContainer}>{joueurEnCours}</View>
              <View style={PartieStyles.joueursContainer}>{joueurSuivant}</View>
            </View>
            <View style={PartieStyles.horizontalSeparator}></View>
            <View style={PartieStyles.informationsPartie}>
              <View style={PartieStyles.informationsPalets}>
                <Ionicons name='ios-disc-outline' size={36} color="#fff"/>
                <View style={PartieStyles.paletsTextsContainer}>
                  <Text style={[ PartieStyles.textInfosTour, {fontFamily: "Poppins-Bold"} ]}>{totalPalets}{totalPalets == 0 ? isPaletsEqualZero = true : isPaletsEqualZero = false } palets</Text>
                  <Text style={PartieStyles.textInfosTourLabel}>restant</Text>
                </View>
              </View>
              <View style={PartieStyles.verticalSeparator}></View>
              <View>
                <Text style={[ PartieStyles.textInfosTour, {fontFamily: "Poppins-Bold"} ]}>{joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1)} points</Text>
                <Text style={PartieStyles.textInfosTourLabel}>restant</Text>
              </View>
            </View>
          </View>
      <ScrollView>
        <View style={PartieStyles.scrollContainer}>
          <View style={PartieStyles.inputsContainer}>
            <View style={PartieStyles.inputContainer}>
              <Points score="20" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points20}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
                onChange={(num)=>{
                  setPoints20(num)
                }}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 20 ? true : false}
              />
              <Points score="20" />
            </View>
            <View style={PartieStyles.inputContainer}>
              <Points score="10" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points10}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
                onChange={(num)=>{
                  setPoints10(num)
                }}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 10 ? true : false}
              />
              <Points score="10" />
            </View>
            <View style={PartieStyles.inputContainer}>
              <Points score="8" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points8}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
                onChange={(num)=>{setPoints8(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 8 ? true : false}
              />
              <Points score="8" />
            </View>
            <View style={PartieStyles.inputContainer}>
              <Points score="6" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points6}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
                onChange={(num)=>{setPoints6(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 6 ? true : false}
              />
              <Points score="6" />
            </View>
            <View style={PartieStyles.inputContainer}>
              <Points score="4" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points4}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
                onChange={(num)=>{setPoints4(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 4 ? true : false}
              />
              <Points score="4" />
            </View>
            <View style={PartieStyles.inputContainer}>
              <Points score="2" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={points2}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
                onChange={(num)=>{setPoints2(num)}}
                editable={false}
                buttonRightDisabled={isPaletsEqualZero ? true : false || joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1) < 2 ? true : false}
              />
              <Points score="2" />
            </View>
            <View style={PartieStyles.inputContainer}>
              <Points score="1" />
              <InputSpinner
                max={game.nb_palets}
                min={0}
                step={1}
                value={point1}
                style={PartieStyles.spinner}
                width= {56}
                height= {56}
                buttonFontSize={52}
                textColor="#7159df"
                showBorder={true}
                buttonTextColor="#fff"
                buttonStyle={PartieStyles.buttonSpinner}
                inputStyle={PartieStyles.inputSpinner}
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
              style={PartieStyles.button}
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
              <Text style={PartieStyles.textButton}>Joueur suivant</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity
              style={PartieStyles.button}
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
              <Text style={PartieStyles.textButton}>Terminer le tour</Text>
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
