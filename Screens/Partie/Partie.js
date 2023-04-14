import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import PartieStyles from '../../Constants/Partie/PartieStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import AvatarComponent from '../../Components/AvatarComponent'
import PointsPartieInputSpinner from '../../Components/Partie/PointsPartieInputSpinner';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Partie
export default function Partie({ navigation, route }) {

  const [fontsLoaded] = font();
  const { game_id } = route.params;
  const [game, setGame] = useState(null);
  const [joueur, setJoueur] = useState(null);
  const [joueurs, setJoueurs] = useState(null);
  const [points20, setPoints20] = useState(0);
  const [points10, setPoints10] = useState(0);
  const [points8, setPoints8] = useState(0);
  const [points6, setPoints6] = useState(0);
  const [points4, setPoints4] = useState(0);
  const [points2, setPoints2] = useState(0);
  const [point1, setPoint1] = useState(0);


  useEffect(() => {
    db.transaction((tx) => {
      // Récupère de la bdd la partie en cours
      tx.executeSql(`SELECT * FROM parties WHERE parties.partie_id = ?`, [game_id],
        function(tx, res) {
          setGame(res.rows["_array"][0])
          // Récupère le joueur dont c'est le tour de jouer
          tx.executeSql(`SELECT * FROM joueurs INNER JOIN infos_parties_joueurs ON joueurs.joueur_id = infos_parties_joueurs.joueur_id AND infos_parties_joueurs.partie_id = ? AND infos_parties_joueurs.position_joueur_en_cours = ?`, [game_id, res.rows["_array"][0].tour_joueur], (_, { rows: { _array } }) => {
            setJoueur(_array[0])
          });
        }
      );
      tx.executeSql('SELECT * from joueurs INNER JOIN infos_parties_joueurs ON joueurs.joueur_id = infos_parties_joueurs.joueur_id AND infos_parties_joueurs.partie_id = ?', [game_id], (_, { rows: { _array } }) => {
        setJoueurs(_array)
      })
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
      ? joueurPrecedent.push(
        <View key={i} style={PartieStyles.joueurWrapper}>
          <AvatarComponent size={32} name={joueurs[i].avatar_slug} />
          <Text numberOfLines={1} style={PartieStyles.joueurPrecedent}>{joueurs[i].nom_joueur}</Text>
        </View>
      )
      : null

    joueurs[i].joueur_id == joueur.joueur_id
      ? joueurEnCours.push(
        <View key={i} style={PartieStyles.joueurWrapper}>
          <AvatarComponent size={44} name={joueur.avatar_slug} />
          <Text numberOfLines={1} style={PartieStyles.joueurEnCours}>{joueur.nom_joueur}</Text>
        </View>
      )
      : null

    joueurs[i].position_joueur_en_cours == (joueur.position_joueur_en_cours + 1 )
      ? joueurSuivant.push(
        <View key={i} style={PartieStyles.joueurWrapper}>
          <AvatarComponent size={32} name={joueurs[i].avatar_slug} />
          <Text numberOfLines={1} style={PartieStyles.joueurSuivant}>{joueurs[i].nom_joueur}</Text>
        </View>
      )
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
      <View style={GlobalStyles.buttonsTextHeaderContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.navigate('Parties', {screen: "Liste Parties"});
          }}
        >
          <IconComponent name="arrow-back" size="24" color="#252422" />
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Tour n°{game.tour_partie}</Text>
        <TouchableOpacity
          style={GlobalStyles.buttonRight}
          onPress={() => {
            navigation.navigate('Classement', {
              game_id: game_id
            })
        }}>
          <IconComponent name="podium" size="24" color="#252422" />
        </TouchableOpacity>
      </View>
      <View style={PartieStyles.infosTour}>
            <View style={PartieStyles.listeJoueurs}>

              <View style={PartieStyles.joueursContainer}>{joueurPrecedent}</View>

              <View style={PartieStyles.separatorJoueursContainer}>
              { joueurPrecedent.length !== 0
                ? <IconComponent name="chevron-right" size="12" color="#7159df" />
                : null
              }
              </View>

              <View style={PartieStyles.joueursContainer}>{joueurEnCours}</View>

              <View style={PartieStyles.separatorJoueursContainer}>
                { joueurSuivant.length !== 0
                ? <IconComponent name="chevron-right" size="12" color="#7159df" />
                : null
                }
              </View>

              <View style={PartieStyles.joueursContainer}>{joueurSuivant}</View>

            </View>

            <View style={PartieStyles.informationsPartie}>

              <View style={PartieStyles.informationsContainer}>
                <View style={PartieStyles.iconeWrapper}>
                  <IconComponent name="points" size="24" color="#7159df" />
                </View>
                <View>
                  <Text style={PartieStyles.textInfosTour}>{joueur.score_joueur - (points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1)}</Text>
                  <Text style={PartieStyles.textInfosTourLabel}>points restant</Text>
                </View>
              </View>

              <View style={PartieStyles.informationsContainer}>
                <View style={PartieStyles.iconeWrapper}>
                  <IconComponent name="palet" size="24" color="#7159df" />
                </View>
                <View>
                  <Text style={PartieStyles.textInfosTour}>{totalPalets}{totalPalets == 0 ? isPaletsEqualZero = true : isPaletsEqualZero = false }</Text>
                  <Text style={PartieStyles.textInfosTourLabel}>palets restant</Text>
                </View>
              </View>

            </View>
          </View>
      <ScrollView>
        <View style={PartieStyles.scrollContainer}>
          <View style={PartieStyles.inputsContainer}>

            <PointsPartieInputSpinner score={20} max={game.nb_palets} value={points20} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />
            <PointsPartieInputSpinner score={10} max={game.nb_palets} value={points10} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />
            <PointsPartieInputSpinner score={8} max={game.nb_palets} value={points8} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />
            <PointsPartieInputSpinner score={6} max={game.nb_palets} value={points6} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />
            <PointsPartieInputSpinner score={4} max={game.nb_palets} value={points4} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />
            <PointsPartieInputSpinner score={2} max={game.nb_palets} value={points2} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />
            <PointsPartieInputSpinner score={1} max={game.nb_palets} value={point1} isPaletsEqualZero={isPaletsEqualZero} joueur={joueur} points20={points20} setPoints20={setPoints20} points10={points10} setPoints10={setPoints10} points8={points8} setPoints8={setPoints8} points6={points6} setPoints6={setPoints6} points4={points4} setPoints4={setPoints4} points2={points2} setPoints2={setPoints2} point1={point1} setPoint1={setPoint1} />

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
                      gagnant: joueur
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
                      gagnant: joueur
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
      tx.executeSql('UPDATE infos_parties_joueurs SET score_joueur = score_joueur - ?, tour_joueur = tour_joueur +1 WHERE joueur_id = ? AND partie_id = ?', [points, joueur.joueur_id, game.partie_id]);

      // Ajoute les points au total des points du joueurs
      tx.executeSql('UPDATE joueurs SET nb_points = nb_points + ? WHERE joueur_id = ?', [points, joueur.joueur_id]);

      if(joueur.position_joueur_en_cours < game.nb_joueurs_restant) {
        // Met à jour le tour du joueur pour faire jouer le joueur suivant
        tx.executeSql('UPDATE parties SET tour_joueur = ? + 1 WHERE partie_id = ?', [game.tour_joueur, game.partie_id])
      }
      else {
        // Réinitialise le compteur du tour pour refaire jouer le premier joueur au prochain tour
        tx.executeSql('UPDATE parties SET tour_joueur = ? WHERE partie_id = ?', [1, game.partie_id])
      }

      // Retourne l'id de la partie en cours
      if (joueur.score_joueur - points == 0) {

        if (game.nb_joueurs - (game.nb_joueurs_restant -1) <= 3) {
          // Ajoute un podium au total du nombre de podium du joueur
          tx.executeSql('UPDATE joueurs SET nb_podiums = nb_podiums + ? WHERE joueur_id = ?', [1, joueur.joueur_id]);
        }

        if(game.gagnant_partie == null) {
          // Mise à jour du gagnant de la partie lorsque le premier gagnant est déclaré
          tx.executeSql('UPDATE parties SET gagnant_partie = ? WHERE partie_id = ?', [joueur.nom_joueur, game.partie_id])
          // Mise à jour du classement du joueur ayant gagné la partie
          tx.executeSql('UPDATE infos_parties_joueurs SET classement_joueur = ? WHERE joueur_id = ? AND partie_id = ?', [1, joueur.joueur_id, game.partie_id])
          // Ajoute une victoire au total du nombre de victoires du joueur
          tx.executeSql('UPDATE joueurs SET nb_victoires = nb_victoires + ? WHERE joueur_id = ?', [1, joueur.joueur_id]);
        } else {
          // Mise à jour du classement du joueur ayant terminé la partie mais pas en première position
          tx.executeSql('UPDATE infos_parties_joueurs SET classement_joueur = ? WHERE joueur_id = ? AND partie_id = ?', [game.nb_joueurs - (game.nb_joueurs_restant -1), joueur.joueur_id, game.partie_id])
        }

        let isJoueurWin = true
        resolve([game.partie_id, isJoueurWin])
      } else {

        let isJoueurWin = false
        resolve([game.partie_id, isJoueurWin])
      }
    })

  })
}
