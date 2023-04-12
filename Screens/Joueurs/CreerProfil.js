import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// Packages
import { useFonts } from 'expo-font';
import { useToast } from "react-native-toast-notifications";

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import AvatarComponent from '../../Components/AvatarComponent'
import font from '../../Components/FontComponent';
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

// Créer le Profil
export default function CreerProfil({ navigation }) {

  const [fontsLoaded] = font();
  const [nomJoueur, setNomJoueur] = useState("");
  const [avatarJoueur, setAvatarJoueur] = useState(null);
  const [errorText, onChangeErrorText] = useState("");
  const toast = useToast();

  useEffect(() => {

    let generate = (Math.random() + 1).toString(36).substring(3);

    setAvatarJoueur(generate);

  }, []);

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

          <IconComponent name="arrow-back" size="24" color="#252422" />

        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Créer votre profil</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>
      <View style={DetailsJoueurStyles.changeAvatarContainer}>

        <Text style={DetailsJoueurStyles.subtitle}>choisir votre avatar</Text>
        <AvatarComponent size={64} name={avatarJoueur} />

        <View style={DetailsJoueurStyles.buttonsContainerChangeAvatar}>

          <TouchableOpacity
            style={DetailsJoueurStyles.buttonWithIcon}
            onPress={() => {

              let generate = (Math.random() + 1).toString(36).substring(3);

              setAvatarJoueur(generate)

            }}
          >
            <View style={DetailsJoueurStyles.wrapperTextIconButton}>

              <IconComponent name="shuffle" size="24" color="#fff" />

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
            placeholder="Nom du joueur..."
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
