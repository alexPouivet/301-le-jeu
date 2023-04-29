import { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Packages
import SwitchSelector from "react-native-switch-selector";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';
import ClassementJoueursStyles from '../../Constants/Joueurs/ClassementJoueursStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import ItemJoueurClassement from '../../Components/Joueurs/ItemJoueurClassement'
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Classement Joueurs
export default function ClassementJoueurs({ navigation, theme }) {

  const [fontsLoaded] = font();
  const [joueurs, setJoueurs] = useState(null);
  const [switchValue, setSwitchValue] = useState({
    "statut": "Nb. Victoires"
  });


  const options = [
    { label: "Points", value: "Nb. Points", customIcon: <IconComponent name="points" size="20" color={ switchValue["statut"] === "Nb. Points" ? "#fff" : theme === 'dark' ? "#fff" : "#7159DF" } />  },
    { label: "Victoires", value: "Nb. Victoires", customIcon: <IconComponent name="cup" size="20" color={ switchValue["statut"] === "Nb. Victoires" ? "#fff" : theme === 'dark' ? "#fff" : "#7159DF" } /> },
    { label: "Pos. Moy.", value: "Position Moy.", customIcon: <IconComponent name="average" size="20" color={ switchValue["statut"] === "Position Moy." ? "#fff" : theme === 'dark' ? "#fff" : "#7159DF" } /> }
  ];

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => {

      getListJoueurs(setJoueurs, db, switchValue);

    });

  }, []);

  const switchClassement = useCallback((value) => {

    const newStatut = { ...switchValue };
    newStatut["statut"] = value;
    setSwitchValue(newStatut);

    getListJoueurs(setJoueurs, db, newStatut);

  }, [switchValue]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[ GlobalStyles.container, theme === "dark" ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme]}>

      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={[ GlobalStyles.buttonLeft, theme === "dark" ? GlobalStyles.buttonLeftDarkTheme : GlobalStyles.buttonLeftLightTheme]}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <IconComponent name="arrow-back" size="24" color={theme === "dark" ? "#fff" : "#252422"}  />
        </TouchableOpacity>
        <Text style={[ GlobalStyles.textHeaderTitle, theme === "dark" ? GlobalStyles.textHeaderTitleDarkTheme : GlobalStyles.textHeaderTitleLightTheme]}>Classement général</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <SwitchSelector
        style={ClassementJoueursStyles.switchSelector}
        selectedTextStyle={ClassementJoueursStyles.switchSelectedText}
        selectedColor="#ffffff"
        textStyle={ClassementJoueursStyles.switchText}
        textColor={ theme === 'dark' ? "#fff" : "#7159DF" }
        buttonColor="#7159DF"
        initial={1}
        backgroundColor="transparent"
        height={48}
        onPress={value => switchClassement(value)}
        options={options}
      />

      <View style={ClassementJoueursStyles.classementHeadTable}>

        <Text style={ClassementJoueursStyles.classementHeadPositionCol}>Pos.</Text>
        <Text style={ClassementJoueursStyles.classementHeadJoueurCol}>Joueur</Text>
        <Text style={ClassementJoueursStyles.classementHeadSwitchValueCol}>{switchValue.statut}</Text>

      </View>

      { joueurs === null || joueurs.length === 0

        ?

        <View style={JoueursStyles.listEmptyContainer}>

          <Text style={[ JoueursStyles.listEmptyText, theme === "dark" ? JoueursStyles.listEmptyTextDarkTheme : JoueursStyles.listEmptyTextLightTheme ]}>Aucun classement n'est disponible pour le moment. Ajoutez des joueurs pour voir des statistiques.</Text>

        </View>

        :

        <FlatList
          style={ClassementJoueursStyles.classementBodyContainer}
          data={joueurs}
          renderItem={({ item, index }) =>  (
            <ItemJoueurClassement theme={theme} profil={item.profil} avatar_slug={item.avatar_slug} nom_joueur={item.nom_joueur} index={index} statut={item.statut} />
          )}
        />
      }

    </View>
  );
}

function getListJoueurs(setJoueurs, db, switchValue) {

  db.transaction((tx) => {

    tx.executeSql(`SELECT * FROM joueurs`, [], (_, { rows: { _array } }) => {

      getClassement(_array, tx, setJoueurs, switchValue);

    });
  })

}

function getClassement(joueurs, tx, setJoueurs, switchValue) {

  if (switchValue.statut == "Nb. Victoires") {

    getClassementVictoires(joueurs, tx, setJoueurs);

  } else if (switchValue.statut == "Position Moy.") {

    getClassementPosition(joueurs, tx, setJoueurs);

  } else {

    getClassementPoints(joueurs, tx, setJoueurs);

  }

}

function getClassementVictoires(joueurs, tx, setJoueurs) {

  let classementArray = [];

  joueurs.map((joueur) => {

      let values = {
        statut: joueur.nb_victoires,
      };

      Object.assign(joueur, values);
      classementArray.push(joueur);

      classementArray.sort(function( a, b) {

        return b.statut - a.statut

      });

      setJoueurs(classementArray);

  });

}

function getClassementPosition(joueurs, tx, setJoueurs) {

  let classementArray = [];

  joueurs.map((joueur) => {

      let positionsParties = JSON.parse(joueur.positions_parties);
      let positionPartiesArray = positionsParties.map(x => x.position);
      let positionMoy = "";

      if (positionPartiesArray.length === 0) {

        positionMoy = "-";

      } else {

        let position = positionPartiesArray.reduce((a, b) => a + b, 0) / positionPartiesArray.length
        positionMoy = position.toString().substring(0,4);

      }

      let values = {
        statut: positionMoy,
      };

      Object.assign(joueur, values);
      classementArray.push(joueur);

      let classementArrayEmpty = classementArray.filter(joueur => joueur.statut === "-");
      classementArray = classementArray.filter(joueur => joueur.statut !== "-");

      classementArray.sort(function( a, b) {

        return a.statut - b.statut

      });

      for (var i = 0; i < classementArrayEmpty.length; i++) {
        classementArray.push(classementArrayEmpty[i]);
      }

      setJoueurs(classementArray);


  });

}

function getClassementPoints(joueurs, tx, setJoueurs) {

  let classementArray = [];

  joueurs.map((joueur) => {

      let values = {
        statut: joueur.nb_points,
      };

      Object.assign(joueur, values);
      classementArray.push(joueur);

      classementArray.sort(function( a, b) {

        return b.statut - a.statut

      });

      setJoueurs(classementArray);

  });

}
