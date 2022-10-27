import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Packages
import Avatar from 'react-native-boring-avatars';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Components
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Item d'un joueur dans une liste
export default function StatsJoueur(props) {

  const [pointsMarques, setPointsMarques] = useState(0);
  const [victoires, setVictoires] = useState(0);
  const [parties, setParties] = useState(0);
  const [podiums, setPodiums] = useState(0);
  const [positionMoy, setPositionMoy] = useState(0);
  const [meilleurePos, setMeilleurePos] = useState(0);
  let games = props.games;

  useEffect(() => {

    db.transaction((tx) => {

      tx.executeSql(`SELECT classement_joueur, SUM(score_joueur) AS pts, SUM(classement_joueur = 1) AS victoires, SUM(classement_joueur < 4) AS podiums, AVG(SUBSTR(classement_joueur, 1, 2)) AS position_moy, MIN(classement_joueur) AS meilleure_pos, COUNT(*) AS nombre FROM infos_parties_joueurs WHERE infos_parties_joueurs.joueur_id = ?`, [props.joueur_id], (_, { rows: { _array } }) => {

        let pointsTotal = _array[0].nombre *301 - _array[0].pts

        if(_array[0].position_moy == null) {
          setPositionMoy(_array[0].position_moy);
        } else {
          setPositionMoy(_array[0].position_moy.toString().substring(0,4));
        }

        setPointsMarques(pointsTotal);
        setVictoires(_array[0].victoires);
        setParties(_array[0].nombre);
        setPodiums(_array[0].podiums);
        setMeilleurePos(_array[0].meilleure_pos);

      })
    });

  }, [])

  return (
  <View style={DetailsJoueurStyles.statsContainer}>

    <Text  style={DetailsJoueurStyles.subtitle}>statistiques</Text>

    <View style={DetailsJoueurStyles.rowContainer}>

      { games == null || games.length === 0
      ?
      <ItemStat title="Parties" data={0} icon="ios-football-outline" color="#7159DF" />
      :
      <ItemStat title="Parties" data={games.length} icon="ios-football-outline" color="#7159DF" />
      }

      <ItemStat title="Victoires" data={victoires} icon="ios-trophy-outline" color="#FEC601" />

      <ItemStat title="Podiums" data={podiums} icon="ios-podium-outline" color="#FD96A9" />

    </View>

    <View style={DetailsJoueurStyles.rowContainer}>

      <ItemStat title="Pts marqués" data={pointsMarques} icon="ios-medal-outline" color="#FEC601" />

      <ItemStat title="Position moy." data={positionMoy} icon="ios-analytics-outline" color="#FD96A9" />

      <ItemStat title="Meilleure pos." data={meilleurePos} icon="ios-trending-up-outline" color="#68B684" />

    </View>

  </View>
  );

}

const ItemStat = (props) => {

  return (

    <View style={[ DetailsJoueurStyles.statItemContainer, { backgroundColor: ( props.color + "20" ) } ]}>

        <View style={[ DetailsJoueurStyles.iconStatItemContainer, { backgroundColor: ( props.color + "25" ) } ]}>

          <Ionicons name={props.icon} size={24} color={props.color}/>

        </View>

        <View style={DetailsJoueurStyles.dataStatItemContainer}>

          <Text numberOfLines={1} style={[ DetailsJoueurStyles.titleStatItemContainer, { color: props.color } ]}>{props.title}</Text>

          { props.data
            ?
            <Text numberOfLines={1} style={DetailsJoueurStyles.textStatItemContainer}>{props.data}</Text>
            :
            <Text style={DetailsJoueurStyles.textStatItemContainer}>-</Text>
          }

        </View>

    </View>

  )

}
