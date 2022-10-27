import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, RefreshControl, FlatList } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import Avatar from 'react-native-boring-avatars';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';

// Components
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Joueurs
export default function Joueurs({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);
  const [errorText, onChangeErrorText] = React.useState("");
  const [participant, setParticipant] = React.useState("");
  const [joueurs, setJoueurs] = useState(null);
  const toast = useToast();

  const onRefresh = useCallback(() => {

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => setJoueurs(_array));
    });

  }, []);

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        // Recupère les données de toutes les parties
        tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => { setJoueurs(_array) });
      });
    });

    db.transaction((tx) => {
      // Recupère les données de toutes les parties
      tx.executeSql(`SELECT * FROM joueurs ORDER BY nom_joueur ASC`, [], (_, { rows: { _array } }) => {
        setJoueurs(_array)
      });
      // Supprimer tous les joueurs
      // tx.executeSql(`DELETE FROM joueurs`);
    });

  }, []);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={GlobalStyles.textHeaderTitle}>Joueurs</Text>
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

            <Ionicons name='ios-person-add' size={20} color="#F3F3F3"/>

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

        <FlatList
          data={ joueurs }
          refreshing={ refreshing }
          onRefresh={ () => onRefresh() }
          style={ JoueursStyles.listJoueursContainer }
          renderItem={({item, index}) => ( <ItemJoueur item={item} index={index} navigation={navigation} /> )}
        />

      }

    </View>
  );
}

const ItemJoueur = (props) => {

  return (
    <TouchableOpacity
      key={props.index}
      style={JoueursStyles.itemJoueurContainer}
      onPress={() => {

        if (props.item.profil) {
          props.navigation.navigate('Profil')
        } else {
          props.navigation.navigate('Details Joueur', { joueur_id: props.item.joueur_id })
        }

      }
      }
    >
      <View style={JoueursStyles.infosJoueurContainer}>

        <Avatar
          size={48}
          name={props.item.avatar_slug}
          variant="beam"
          colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
        />

        <Text style={JoueursStyles.nomJoueur}>{props.item.nom_joueur}</Text>

        { props.item.profil
          ?
          <Text style={JoueursStyles.profilJoueur}>(profil)</Text>
          :
          null
        }
      </View>

      <View>

        <Ionicons name='ios-chevron-forward-outline' size={24} color="#C0C0C0"/>

      </View>

    </TouchableOpacity>
  );

}

function addPlayer(player) {

  db.transaction((tx) => {
    // ajout d'un joueur dans la bdd
    tx.executeSql(
      "INSERT INTO joueurs (nom_joueur, avatar_slug, profil) VALUES (?, ?, ?)", [player, player, 0]
    );

  });
}
