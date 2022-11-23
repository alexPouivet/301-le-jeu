import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

// Packages
import GridFlatList from 'grid-flatlist-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Avatar from 'react-native-boring-avatars';
import Lottie from 'lottie-react-native';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import CreerPartieStyles from '../../Constants/Partie/CreerPartieStyles';

// Components
import SelectionJoueurComponent from '../../Components/Partie/SelectionJoueurComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Création de Partie
export default function CreerPartie({ route, navigation }) {

  const [errorText, onChangeErrorText] = useState("")
  const { nb_participants, nb_palets } = route.params;
  const [participant, setParticipant] = useState("");
  const [joueurs, setJoueurs] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [playersSelect, setPlayersSelect] = useState([]);
  const toast = useToast();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const onRefresh = useCallback((dataJ) => {

    setRefreshing(true);

    wait(500).then(() => {

      db.transaction((tx) => {
        // Récupère les données de tous les joueurs
        tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setJoueurs(_array));
      });

      setRefreshing(false);
    });

  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setJoueurs(_array));
    });
  }, []);

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
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        { nb_participants > 1
          ?
          <Text style={GlobalStyles.textHeaderTitle}>Sélectionnez {nb_participants} joueurs</Text>
          :
          <Text style={GlobalStyles.textHeaderTitle}>Sélectionnez {nb_participants} joueur</Text>
        }
        <View style={{ width: 42 }}>
        </View>
      </View>

      <View style={GlobalStyles.addPlayerContainer}>

        <Text style={GlobalStyles.addPlayerTitle}>Ajouter un joueur</Text>

        <View style={GlobalStyles.inputAddPlayerContainer}>

          <TextInput
            style={GlobalStyles.inputAddPlayer}
            placeholder="John Doe..."
            value={participant}
            onChangeText={setParticipant}
          />

          <TouchableOpacity
            style={GlobalStyles.addPlayerButton}
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

            <Ionicons name='ios-person-add' size={20} color="#F3F3F3" style={GlobalStyles.buttonIcon}/>

          </TouchableOpacity>

        </View>

        { errorText
          ?
          <Text style={GlobalStyles.errorText}>{errorText}</Text>
          :
          null
        }

      </View>

      <View>
        { joueurs === null || joueurs.length === 0

          ?

          <View style={CreerPartieStyles.listEmptyContainer}>

            <Text style={CreerPartieStyles.listEmptyText}>Aucun joueur n'a été créé pour le moment.</Text>

          </View>

          :

          <View>

            <GridFlatList
              data={joueurs}
              refreshing={refreshing}
              numColumns={3}
              gap={5}
              keyExtractor={item => item.joueur_id}
              style={CreerPartieStyles.listJoueursContainer}
              onRefresh={() => {
                onRefresh()
              }}
              renderItem={(item, index) => (
                <SelectionJoueurComponent joueur={ item } playersSelect={ playersSelect } setPlayersSelect={ setPlayersSelect } nb_participants={ nb_participants } index={ index } setIsLimit={setIsLimit} />
              )}
            />

          </View>

        }

        </View>

      <TouchableOpacity
        style={[CreerPartieStyles.button, !isLimit ? CreerPartieStyles.buttonDisabled : CreerPartieStyles.buttonAvailable]}
        disabled={ !isLimit }
        onPress={() => {

            create(playersSelect, nb_participants, nb_palets).then(function(game_id) {

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
          ( nb_participants - playersSelect.length ) > 1
          ?
            <Text style={CreerPartieStyles.textButtonWhite}>Encore { ( nb_participants - playersSelect.length ) } joueurs à sélectionner</Text>
          : ( nb_participants - playersSelect.length ) == 1
            ?
              <Text style={CreerPartieStyles.textButtonWhite}>Encore { ( nb_participants - playersSelect.length ) } joueur à sélectionner</Text>
            :
              <Text style={CreerPartieStyles.textButtonWhite}>Commencer la partie</Text>
        }

      </TouchableOpacity>
    </View>
  );
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const create = function(playersSelect, nb_participants, nb_palets) {

  return new Promise(function(resolve, reject) {

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    // config date d'une partie
    let year = new Date().getFullYear();
    let month = padTo2Digits(new Date('April 19, 1975 23:15:30').getMonth() + 1);
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
          };
          // return game
          resolve(res.insertId)
        }
      );
    });

  })

}

function addPlayer(player) {

  db.transaction((tx) => {
    // ajout d'un joueur dans la bdd
    tx.executeSql(
      "INSERT INTO joueurs (nom_joueur, avatar_slug, profil) VALUES (?, ?, ?)", [player, player, 0]
    );

  });
}
