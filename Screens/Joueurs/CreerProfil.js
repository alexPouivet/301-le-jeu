import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import Avatar from 'react-native-boring-avatars';
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Components
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Créer le Profil
export default function CreerProfil({ navigation }) {

  // const [joueur, setJoueur] = useState(null);
  const [nomJoueur, setNomJoueur] = useState("");
  const [avatarJoueur, setAvatarJoueur] = useState(null);
  const [errorText, onChangeErrorText] = useState("");
  const toast = useToast();

  useEffect(() => {

    let generate = (Math.random() + 1).toString(36).substring(3);

    setAvatarJoueur(generate);

  }, []);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!avatarJoueur) {
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
        <Text style={GlobalStyles.textHeaderTitle}>Créer votre profil</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>
      <View style={DetailsJoueurStyles.changeAvatarContainer}>

        <Text style={DetailsJoueurStyles.subtitle}>choisir votre avatar</Text>
        <Avatar
          size={64}
          name={avatarJoueur}
          variant="beam"
          colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
        />

        <View style={DetailsJoueurStyles.buttonsContainerChangeAvatar}>

          <TouchableOpacity
            style={DetailsJoueurStyles.buttonWithIcon}
            onPress={() => {

              let generate = (Math.random() + 1).toString(36).substring(3);

              setAvatarJoueur(generate)

            }}
          >
            <View style={DetailsJoueurStyles.wrapperTextIconButton}>

              <Ionicons name='ios-shuffle-outline' size={28} color="#F3F3F3"/>

              <Text style={DetailsJoueurStyles.textIconButton}>Modifier aléatoirement</Text>

            </View>

          </TouchableOpacity>

        </View>

      </View>

      <View>

        <Text style={DetailsJoueurStyles.subtitle}>choisir votre nom</Text>

        <View style={DetailsJoueurStyles.changeNomContainer}>

          <TextInput
            style={DetailsJoueurStyles.changeNomInput}
            placeholder="John Doe..."
            value={nomJoueur}
            onChangeText={ nomJoueur => {setNomJoueur(nomJoueur)}}
          />

        </View>

        { errorText
          ?
          <Text style={[ GlobalStyles.errorText, {marginHorizontal: 16} ]}>{errorText}</Text>
          :
          null
        }

      </View>

      <TouchableOpacity
        style={[DetailsJoueurStyles.validerModifButton, nomJoueur == "" ? nomJoueur.length < 2 ? DetailsJoueurStyles.disabledValiderModifButton : DetailsJoueurStyles.enableValiderModifButton : DetailsJoueurStyles.enableValiderModifButton]}
        disabled={ nomJoueur == "" ? nomJoueur.length < 2 ? true : false : false }
        onPress={() => {

          if( nomJoueur == "" || nomJoueur.length < 2 ){
            onChangeErrorText("Deux lettres au minimum pour valider votre nom.");
          } else {
            onChangeErrorText("");
            createProfile(nomJoueur, avatarJoueur).then(() => {
              navigation.navigate("Joueurs");
              toast.show('Profil créé avec succès !', {
                type: "success",
                placement: "top",
                animationType: "slide-in"
              });
            });
          }

        }}
      >

        <Text style={DetailsJoueurStyles.textValiderModifButton}>Créer mon profil</Text>

      </TouchableOpacity>

    </View>
  );
}

const createProfile = function(nomJoueur, avatarJoueur) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      //
      tx.executeSql(
        'INSERT INTO joueurs (nom_joueur, avatar_slug, profil) VALUES (?, ?, ?)', [nomJoueur, avatarJoueur, 1],
        function(tx, res) {

          resolve("ok")

        }
      )

    });

  })

}
