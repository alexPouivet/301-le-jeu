import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export default function Partie({ navigation, route }) {

  const {game_id } = route.params;

  const [game, setGame] = React.useState(null);
  const [joueur, setJoueur] = React.useState(null);

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
      tx.executeSql(`select * from game where game.game_id = ?`, [game_id],
        function(tx, res) {
          setGame(res.rows["_array"][0])
          // Récupère le joueur dont c'est le tour de jouer
          tx.executeSql(`select * from joueur where joueur.game_id = ? AND joueur.position_joueur = ?`, [game_id, res.rows["_array"][0].tour_joueur], (_, { rows: { _array } }) => setJoueur(_array[0]));
        });
    });
  }, []);

  if (joueur === null) {
    return null;
  }

  return(
    <View>
      <Text>Partie en cours</Text>
      <Button
        title="Classement"
        onPress={() => {
          navigation.navigate('Classement', {
            game_id: game_id
          })
        }}
      />
      <Text>Tour n°{game.tour_game}</Text>
      <Text>{joueur.nom_joueur}</Text>
      <Text>TOTAL POINTS: {points20*20 + points10*10 + points8*8 + points6*6 + points4*4 + points2*2 + point1}</Text>
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={points20}
        onChange={(num)=>{setPoints20(num)}}
        editable={false}
      />
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={points10}
        onChange={(num)=>{setPoints10(num)}}
        editable={false}
      />
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={points8}
        onChange={(num)=>{setPoints8(num)}}
        editable={false}
      />
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={points6}
        onChange={(num)=>{setPoints6(num)}}
        editable={false}
      />
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={points4}
        onChange={(num)=>{setPoints4(num)}}
        editable={false}
      />
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={points2}
        onChange={(num)=>{setPoints2(num)}}
        editable={false}
      />
      <InputSpinner
        max={6}
        min={0}
        step={1}
        value={point1}
        onChange={(num)=>{setPoint1(num)}}
        editable={false}
      />
      {joueur.position_joueur < game.nb_joueurs ?
        <Button
          title="Joueur suivant"
          onPress={() => {
            // Met à jour le joueur et passe au joueur suivant
            updateJoueur(points20, points10, points8, points6, points4, points2, point1, joueur, game).then(function(game_id) {
              navigation.push('Partie', {
                game_id: game_id,
              })
            })
          }}
        />
        :
        <Button
          title="Terminer le Tour 1"
          onPress={() => {
            // Met à jour le score du joueur et passe à la page Fin de Tour
            updateJoueur(points20, points10, points8, points6, points4, points2, point1, joueur, game).then(function(game_id) {
              navigation.push('Fin de Tour', {
                game_id: game_id
              })
            })
          }}
        />
      }
      <Button
        title="Retourner à l'accueil"
        onPress={() => {
          navigation.navigate('Accueil')
        }}
      />
    </View>
  )
}

const updateJoueur = function(points20, points10, points8, points6, points4, points2, point1, joueur, game) {

  return new Promise(function(resolve, reject) {

    const points = points20 * 20 + points10 * 10 + points8 * 8 + points6 * 6 + points4 * 4 + points2 * 2 + point1

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE joueur SET score_joueur = score_joueur - ?, tour_joueur = tour_joueur +1 WHERE joueur_id = ?', [points, joueur.joueur_id]
      );
      if(joueur.position_joueur < game.nb_joueurs) {
        // Met à jour le tour du joueur pour faire jouer le joueur suivant
        tx.executeSql(
          'UPDATE game SET tour_joueur = ? + 1 WHERE game_id = ?', [game.tour_joueur, game.game_id]
        )
      }
      else {
        // Réinitialise le compteur du tour pour refaire jouer le premier joueur au prochain tour
        tx.executeSql(
          'UPDATE game SET tour_joueur = ? WHERE game_id = ?', [1, game.game_id]
        )
      }
      // Retourne l'id de la partie en cours
      resolve(game.game_id)
    })

  })
}
