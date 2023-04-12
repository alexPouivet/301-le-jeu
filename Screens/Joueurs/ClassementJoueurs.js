import { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Packages
import SwitchSelector from "react-native-switch-selector";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ClassementJoueursStyles from '../../Constants/Joueurs/ClassementJoueursStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import ItemJoueurClassement from '../../Components/Joueurs/ItemJoueurClassement'
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Classement Joueurs
export default function ClassementJoueurs({ navigation }) {

  const [fontsLoaded] = font();
  const [joueurs, setJoueurs] = useState(null);
  const [switchValue, setSwitchValue] = useState({
    "statut": "Nb. Victoires"
  });


  const options = [
    { label: "Points", value: "Nb. Points", customIcon: <IconComponent name="points" size="20" color={ switchValue["statut"] === "Nb. Points" ? "#fff" : "#7159DF" } />  },
    { label: "Victoires", value: "Nb. Victoires", customIcon: <IconComponent name="cup" size="20" color={ switchValue["statut"] === "Nb. Victoires" ? "#fff" : "#7159DF" } /> },
    { label: "Pos. Moy.", value: "Position Moy.", customIcon: <IconComponent name="average" size="20" color={ switchValue["statut"] === "Position Moy." ? "#fff" : "#7159DF" } /> }
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



  if (joueurs === null || joueurs.length === 0) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>

      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <IconComponent name="arrow-back" size="24" color="#252422" />
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Classement général</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <SwitchSelector
        style={ClassementJoueursStyles.switchSelector}
        selectedTextStyle={ClassementJoueursStyles.switchSelectedText}
        selectedColor="#ffffff"
        textStyle={ClassementJoueursStyles.switchText}
        textColor="#7159DF"
        buttonColor="#7159DF"
        initial={1}
        backgroundColor="#f3f3f3"
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

          null

        :

        <FlatList
          style={ClassementJoueursStyles.classementBodyContainer}
          data={joueurs}
          renderItem={({ item, index }) =>  (
            <ItemJoueurClassement profil={item.profil} avatar_slug={item.avatar_slug} nom_joueur={item.nom_joueur} index={index} statut={item.statut} />
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

    tx.executeSql(`SELECT classement_joueur, SUM(classement_joueur = 1) AS victoires
    FROM infos_parties_joueurs
    WHERE infos_parties_joueurs.joueur_id = ?`
    , [joueur.joueur_id], (_, { rows: { _array } }) => {

      let victoires = 0;

      if(_array[0].victoires !== null) {
        victoires = _array[0].victoires;
      }

      let values = {
        statut: victoires,
      };

      Object.assign(joueur, values);
      classementArray.push(joueur);

      classementArray.sort(function( a, b) {

        return b.statut - a.statut

      });

      setJoueurs(classementArray);

    });

  });

}

function getClassementPosition(joueurs, tx, setJoueurs) {

  let classementArray = [];

  joueurs.map((joueur) => {

    tx.executeSql(`SELECT classement_joueur, AVG(SUBSTR(classement_joueur, 1, 2)) AS position_moy
    FROM infos_parties_joueurs
    WHERE infos_parties_joueurs.joueur_id = ?`
    , [joueur.joueur_id], (_, { rows: { _array } }) => {

      let position = "-";

      if(_array[0].position_moy !== null) {
        position = _array[0].position_moy.toString().substring(0,4);
      }

      let values = {
        statut: position,
      };

      Object.assign(joueur, values);
      classementArray.push(joueur);

      classementArray = classementArray.filter(joueur => joueur.statut !== null)
      classementArray.sort(function( a, b) {

        return a.statut - b.statut

      });

      setJoueurs(classementArray);

    });

  });

}

function getClassementPoints(joueurs, tx, setJoueurs) {

  let classementArray = [];

  joueurs.map((joueur) => {

    tx.executeSql(`SELECT SUM(score_joueur) AS pts, COUNT(*) AS nombre
    FROM infos_parties_joueurs
    WHERE infos_parties_joueurs.joueur_id = ?`
    , [joueur.joueur_id], (_, { rows: { _array } }) => {

      let values = {
        statut: _array[0].nombre *301 - _array[0].pts,
      };

      Object.assign(joueur, values);
      classementArray.push(joueur);

      classementArray.sort(function( a, b) {

        return b.statut - a.statut

      });

      setJoueurs(classementArray);

    });

  });

}
