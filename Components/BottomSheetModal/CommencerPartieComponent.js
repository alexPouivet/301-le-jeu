import { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';

// Packages
import GridFlatList from 'grid-flatlist-react-native';
import InputSpinner from "react-native-input-spinner";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import CreerPartieModalStyles from '../../Constants/Partie/CreerPartieModalStyles';

// Components
import SelectionJoueurComponent from '../Partie/SelectionJoueurComponent';
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

let width = Dimensions.get("screen").width;

export default function ComposerPartie({ participants, palets, toast, changePosition, changeStepModal, closeModal, navigation, theme }) {

  const [fontsLoaded] = font();
  const [errorText, onChangeErrorText] = useState("")
  const [participant, setParticipant] = useState("");
  const [joueurs, setJoueurs] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [playersSelect, setPlayersSelect] = useState([]);

  const onRefresh = useCallback((dataJ) => {

    setRefreshing(true);

    wait(500).then(() => {

      db.transaction((tx) => {
        // Récupère les données de tous les joueurs
        tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setOrderJoueurs(setJoueurs, _array) );
      });

      setRefreshing(false);
    });

  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setOrderJoueurs(setJoueurs, _array) );
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={CreerPartieModalStyles.stepTwoContainer}>

      <View style={CreerPartieModalStyles.textHeaderContainer}>
        { participants > 1
          ?
          <Text style={[ CreerPartieModalStyles.textHeaderTitle, theme === "dark" ? CreerPartieModalStyles.textHeaderTitleDarkTheme : CreerPartieModalStyles.textHeaderTitleLightTheme ]}>Sélectionnez {participants} joueurs</Text>
          :
          <Text style={[ CreerPartieModalStyles.textHeaderTitle, theme === "dark" ? CreerPartieModalStyles.textHeaderTitleDarkTheme : CreerPartieModalStyles.textHeaderTitleLightTheme ]}>Sélectionnez {participants} joueur</Text>
        }
      </View>

      <View style={[GlobalStyles.addPlayerContainer, { marginHorizontal: 0, marginBottom: 16 }]}>

        <Text style={[ GlobalStyles.addPlayerTitle, theme === "dark" ? GlobalStyles.addPlayerTitleDarkTheme : GlobalStyles.addPlayerTitleLightTheme]}>Ajouter un joueur</Text>

        <View style={GlobalStyles.inputAddPlayerContainer}>

          <TextInput
            style={[ participant.length < 2 ? theme === "dark" ? GlobalStyles.inputAddPlayerFullDarkTheme : GlobalStyles.inputAddPlayerFull : theme === "dark" ? GlobalStyles.inputAddPlayerDarkTheme : GlobalStyles.inputAddPlayer ]}
            placeholder="Nom du joueur..."
            value={participant}
            onChangeText={setParticipant}
            placeholderTextColor="#C0C0C0"
          />

          <TouchableOpacity
            style={[ participant.length < 2 ? GlobalStyles.addPlayerButtonNone : GlobalStyles.addPlayerButton ]}
            onPress={() => {

              if( participant == "" || participant.length < 2 ){

                onChangeErrorText("Deux lettres au minimum pour ajouter un joueur.")

              } else {

                onChangeErrorText("")
                addPlayer(participant)
                onRefresh()
                setParticipant("")
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

      </View>

      <View>

        { joueurs === null || joueurs.length === 0

          ?

          <View style={CreerPartieModalStyles.listEmptyContainer}>

            <Text style={[ CreerPartieModalStyles.listEmptyText, theme === "dark" ? CreerPartieModalStyles.listEmptyTextDarkTheme : CreerPartieModalStyles.listEmptyTextLightTheme ]}>Aucun joueur n'a été créé pour l'instant. Ajoutez un joueur pour pouvoir le sélectionner.</Text>

          </View>

          :

        <View>

          <GridFlatList
            data={joueurs}
            refreshing={refreshing}
            numColumns={3}
            gap={5}
            keyExtractor={item => item.joueur_id}
            style={CreerPartieModalStyles.listJoueursContainer}
            onRefresh={() => {
              onRefresh()
            }}
            renderItem={(item, index) => (
              <SelectionJoueurComponent  theme={theme} joueur={ item } playersSelect={ playersSelect } setPlayersSelect={ setPlayersSelect } nb_participants={ participants } index={ index } setIsLimit={setIsLimit} />
            )}
          />

        </View>

        }

      </View>

      <View style={CreerPartieModalStyles.buttonsContainer}>

        <TouchableOpacity
          style={CreerPartieModalStyles.buttonReturnBackContainer}
          onPress={() => {
            Platform.OS === "android" ? changePosition(428) : changePosition(404)
            changeStepModal('step one')
          }}
        >

          <IconComponent name="arrow-back" size="24" color="#7159DF" />

        </TouchableOpacity>

        <TouchableOpacity
          style={[CreerPartieModalStyles.buttonQuarter, !isLimit ? CreerPartieModalStyles.buttonDisabled : CreerPartieModalStyles.buttonAvailable]}
          disabled={ !isLimit }
          onPress={() => {

            create(playersSelect, participants, palets).then(function(game_id) {

              closeModal();
              navigation.navigate('Partie', {
                game_id: game_id,
              })
              toast.show('Partie créée avec succès !', {
                type: "success",
                placement: "top",
                animationType: "slide-in"
              });

            })

          }}
        >
          {
            ( participants - playersSelect.length ) > 1
            ?
              <Text style={CreerPartieModalStyles.textButton}>Encore { ( participants - playersSelect.length ) } joueurs à sélectionner</Text>
            : ( participants - playersSelect.length ) == 1
              ?
                <Text style={CreerPartieModalStyles.textButton}>Encore { ( participants - playersSelect.length ) } joueur à sélectionner</Text>
              :
                <Text style={CreerPartieModalStyles.textButton}>Commencer la partie</Text>
          }

        </TouchableOpacity>

      </View>

    </View>

  );

};

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function setOrderJoueurs(setJoueurs, joueurs) {

  joueurs.sort(function(a, b) {

    a = a.nom_joueur;
    b = b.nom_joueur;

    return a.localeCompare(b);

  });

  setJoueurs(joueurs);

}

function addPlayer(player) {

  db.transaction((tx) => {
    // ajout d'un joueur dans la bdd
    tx.executeSql(
      "INSERT INTO joueurs (nom_joueur, avatar_slug, profil, nb_points, nb_parties, nb_victoires, nb_podiums, positions_parties) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [player, player, 0, 0, 0, 0, 0, "[]"]
    );

  });
}

const create = function(playersSelect, nb_participants, nb_palets) {

  return new Promise(function(resolve, reject) {

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    // config date d'une partie
    let year = new Date().getFullYear();
    let month = padTo2Digits(new Date().getMonth() + 1);
    let day = padTo2Digits(new Date().getDate());
    let hour = padTo2Digits(new Date().getHours());
    let minutes = padTo2Digits(new Date().getMinutes());
    let date =  day + '/' + month + '/' + year;
    let horaire = hour + 'h' + minutes;

    db.transaction((tx) => {
      // création d'une partie dans la bdd
      tx.executeSql(
        "INSERT INTO parties (date, horaire, statut, nb_palets, nb_joueurs, nb_joueurs_restant, tour_partie, tour_joueur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [date, horaire, 'en cours', nb_palets, nb_participants, nb_participants, 1, 1],
        function(tx, res) {
          // création des joueurs dans la bdd
          for(let i = 0; i < nb_participants; i++ ){
            tx.executeSql(
              "INSERT INTO infos_parties_joueurs (partie_id, joueur_id, score_joueur, tour_joueur, position_joueur, position_joueur_en_cours) VALUES (?, ?, ?, ?, ?, ?)", [res.insertId, playersSelect[i] , 301, 0, i+1, i+1],
            )
            tx.executeSql('UPDATE joueurs SET nb_parties = nb_parties + ? WHERE joueur_id = ?', [1, playersSelect[i]]);
          };
          // return game
          resolve(res.insertId)
        }
      );
    });

  })

}
