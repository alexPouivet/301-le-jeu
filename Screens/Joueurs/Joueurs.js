import { useCallback, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SectionList } from 'react-native';

// Packages
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import ItemJoueur from '../../Components/Joueurs/ItemJoueur';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Joueurs
export default function Joueurs({ navigation }) {

  const [fontsLoaded] = font();
  const [refreshing, setRefreshing] = useState(false);
  const [errorText, onChangeErrorText] = useState("");
  const [participant, setParticipant] = useState("");
  const [joueurs, setJoueurs] = useState(null);
  const toast = useToast();

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    wait(500).then(() => {

      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setListJoueurs(setJoueurs, _array, db));
      });

    });

    setRefreshing(false);


  }, []);

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        // Recupère la liste des joueurs
        tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setListJoueurs(setJoueurs, _array, db));
      });
    });

    db.transaction((tx) => {
      // Recupère la liste des joueurs
      tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setListJoueurs(setJoueurs, _array, db));
    });

  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={GlobalStyles.textHeaderTitle}>Joueurs</Text>
      </View>

      <TouchableOpacity onPress={() => {
        navigation.navigate("Classement Joueurs");
      }} style={JoueursStyles.classementButton}>

        <Text style={JoueursStyles.classementTitle}>Classement des joueurs</Text>
        <Text style={JoueursStyles.classementDescription}>Cliquez et découvrez le classement entre tous les joueurs en fonction de leurs parties jouées.</Text>

        <View style={{position: "absolute", bottom: 0, right: -16, transform: [{rotate: '-20deg'}] }}>
          <IconComponent name="cup" size="80" color="#ffffff35" />
        </View>

        <View style={{position: "absolute", top: 12, right: 128, transform: [{rotate: '30deg'}] }}>
          <IconComponent name="points" size="24" color="#ffffff35" />
        </View>

      </TouchableOpacity>

      <View style={GlobalStyles.addPlayerContainer}>

        <Text style={GlobalStyles.addPlayerTitle}>Ajouter un joueur</Text>

        <View style={GlobalStyles.inputAddPlayerContainer}>

          <TextInput
            style={[ participant.length < 2 ? GlobalStyles.inputAddPlayerFull : GlobalStyles.inputAddPlayer ]}
            placeholder="Nom du joueur..."
            value={participant}
            onChangeText={setParticipant}
          />

          <TouchableOpacity
            style={[ participant.length < 2 ? GlobalStyles.addPlayerButtonNone : GlobalStyles.addPlayerButton ]}
            onPress={() => {

              if( participant == "" || participant.length < 2 ){
                onChangeErrorText("Deux lettres au minimum pour ajouter un joueur.")
              } else {
                onChangeErrorText("");
                addPlayer(participant);
                onRefresh();
                setParticipant("");
                toast.show('Joueur ajouté avec succès !', {
                  type: "success",
                  placement: "top",
                  animationType: "slide-in"
                });
              }
            }}
          >

            <IconComponent name="add-person" size="24" color="#fff" />

          </TouchableOpacity>

        </View>

        { errorText
          ?
          <Text style={GlobalStyles.errorText}>{errorText}</Text>
          :
          null
        }

      </View>

      { joueurs === null || joueurs.length === 0

        ?
          <View style={JoueursStyles.listEmptyContainer}>

            <Text style={JoueursStyles.listEmptyText}>Aucun joueur n'a été créé pour le moment.</Text>

          </View>

        :

        <SectionList
          sections={ joueurs }
          refreshing={ refreshing }
          onRefresh={ () => onRefresh() }
          style={ JoueursStyles.listJoueursContainer }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={ JoueursStyles.sectionHeader }>{title}</Text>
          )}
          renderItem={({ item, index }) => ( <ItemJoueur joueur={item} key={index} navigation={navigation} toast={toast} onRefresh={onRefresh} db={db} /> )}
        />

      }

    </View>
  );
}

function setListJoueurs(setJoueurs, joueurs, db) {

  let listJoueurs = [];

  if (joueurs === null || joueurs.length === 0 ) {

    setJoueurs(joueurs)

  } else {

    const removeAccents = str =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    joueurs.forEach((item, index) => {

      const firstNameLetter = item.nom_joueur.substring(0, 1);

      let newItem = {
        title: removeAccents(firstNameLetter),
        data: [ item ]
      }

      if (index == 0) {

        listJoueurs.push(newItem);

      } else {

        if (listJoueurs.some( listJoueur => removeAccents(listJoueur.title) === removeAccents(firstNameLetter) )) {

          let i = listJoueurs.findIndex( listJoueur => removeAccents(listJoueur.title) === removeAccents(firstNameLetter) );

          listJoueurs[i]["data"].push(item);

        } else {

          listJoueurs.push(newItem);

        }

      }

    });

    listJoueurs.forEach((item, i) => {

      let joueur = item.data.sort(function(a, b) {
        a = a.nom_joueur;
        b = b.nom_joueur;

        return a.localeCompare(b);
      });

    });

    listJoueurs.sort(function(a, b) {
      a = a.title;
      b = b.title;

      return a.localeCompare(b);
    })

    setJoueurs(listJoueurs);

  }

}

function addPlayer(player) {

  db.transaction((tx) => {
    // ajout d'un joueur dans la bdd
    tx.executeSql(
      "INSERT INTO joueurs (nom_joueur, avatar_slug, profil, nb_points, nb_parties, nb_victoires, nb_podiums, positions_parties) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [player, player, 0, 0, 0, 0, 0, "[]"]
    );

  });
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
