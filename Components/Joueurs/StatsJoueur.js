import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// Styles
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Item d'un joueur dans une liste
export default function StatsJoueur(props) {

  const theme = props.theme;
  const [fontsLoaded] = font();
  let nbParties = props.joueur.nb_parties;
  let nbVictoires = props.joueur.nb_victoires;
  let nbPodiums = props.joueur.nb_podiums;
  let nbPoints = props.joueur.nb_points;
  let positionsParties = JSON.parse(props.joueur.positions_parties);
  let positionPartiesArray = positionsParties.map(x => x.position);
  let positionMoy = "";
  let positionMax = "";

  if (positionPartiesArray.length === 0) {

    positionMoy = "-";
    positionMax = "-";

  } else {

    let position = positionPartiesArray.reduce((a, b) => a + b, 0) / positionPartiesArray.length
    positionMoy = position.toString().substring(0,4);
    positionMax = Math.min(...positionPartiesArray);

  }

  return (
  <View style={DetailsJoueurStyles.statsContainer}>

    <Text  style={DetailsJoueurStyles.subtitle}>statistiques</Text>

    <View style={DetailsJoueurStyles.rowContainer}>

      { nbParties === 0
      ?
      <ItemStat theme={theme} title="Parties" data={0} icon="layer-bold" color="#7159DF" />
      :
      <ItemStat theme={theme} title="Parties" data={nbParties} icon="layer-bold" color="#7159DF" />
      }

      <ItemStat theme={theme} title="Victoires" data={nbVictoires} icon="cup" color="#FEC601" />

      <ItemStat theme={theme} title="Podiums" data={nbPodiums} icon="podium" color="#FD96A9" />

    </View>

    <View style={DetailsJoueurStyles.rowContainer}>

      <ItemStat theme={theme} title="Pts marqués" data={nbPoints} icon="points" color="#FEC601" />

      <ItemStat theme={theme} title="Pos. moy." data={positionMoy} icon="average" color="#FD96A9" />

      <ItemStat theme={theme} title="Pos. max" data={positionMax} icon="trend-up" color="#68B684" />

    </View>

  </View>
  );

}

const ItemStat = (props) => {

  let theme = props.theme;

  return (

    <View style={[ DetailsJoueurStyles.statItemContainer, theme === "dark" ? DetailsJoueurStyles.statItemContainerDarkTheme : DetailsJoueurStyles.statItemContainerLightTheme]}>

        <View style={[ DetailsJoueurStyles.iconStatItemContainer, { backgroundColor: theme === "dark" ? props.title === "Parties" ? ( props.color + "40" ) : ( props.color + "25" ) : ( props.color + "25" ) } ]}>

          <IconComponent name={props.icon} size="24" color={props.color} />


        </View>

        <View style={DetailsJoueurStyles.dataStatItemContainer}>

          <Text numberOfLines={1} style={[ DetailsJoueurStyles.titleStatItemContainer, { color: props.color } ]}>{props.title}</Text>

          { props.data
            ?
            <Text numberOfLines={1} style={[ DetailsJoueurStyles.textStatItemContainer, theme === "dark" ? DetailsJoueurStyles.textStatItemContainerDarkTheme : DetailsJoueurStyles.textStatItemContainerLightTheme ]}>{props.data}</Text>
            :
            <Text style={[ DetailsJoueurStyles.textStatItemContainer, theme === "dark" ? DetailsJoueurStyles.textStatItemContainerDarkTheme : DetailsJoueurStyles.textStatItemContainerLightTheme ]}>-</Text>
          }

        </View>

    </View>

  )

}
