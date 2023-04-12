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

// Modifier les infos d'un Joueur
export default function ModifierJoueur({ navigation, route }) {

  const [fontsLoaded] = font();
  const { joueur_id } = route.params;
  const [joueur, setJoueur] = useState(null);
  const [nomJoueur, setNomJoueur] = useState(null);
  const [avatarJoueur, setAvatarJoueur] = useState(null);
  const toast = useToast();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM joueurs WHERE joueurs.joueur_id = ?`, [joueur_id], (_, { rows: { _array } }) => {
        setJoueur(_array[0]);
        setNomJoueur(_array[0].nom_joueur);
        setAvatarJoueur(_array[0].avatar_slug);
      });
    });
  }, []);

  if (joueur === null || joueur.length === 0) {
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
            if (joueur.profil) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Profil' }],
              });
            } else {
              navigation.navigate('Details Joueur', { joueur_id: joueur.joueur_id })
            }
          }}
        >
          <IconComponent name="arrow-back" size="24" color="#252422" />
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Modifier joueur</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>
      <View style={DetailsJoueurStyles.changeAvatarContainer}>

        <Text style={DetailsJoueurStyles.subtitle}>changer d'avatar</Text>

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

              <Text style={DetailsJoueurStyles.textIconButton}>Changer aléatoirement</Text>

            </View>

          </TouchableOpacity>

          <TouchableOpacity
            style={[ DetailsJoueurStyles.resetButton, avatarJoueur == joueur.avatar_slug ? DetailsJoueurStyles.disabledResetButton : DetailsJoueurStyles.enableResetButton ]}
            onPress={() => setAvatarJoueur(joueur.avatar_slug)}
          >

            <IconComponent name="close" size="24" color="#7159df" />

          </TouchableOpacity>

        </View>

      </View>

      <View>

        <Text style={DetailsJoueurStyles.subtitle}>changer de nom</Text>

        <View style={ DetailsJoueurStyles.changeNomContainer }>

          <TextInput
            style={DetailsJoueurStyles.changeNomInput}
            placeholder="Nom du joueur ..."
            value={nomJoueur}
            onChangeText={ nomJoueur => {setNomJoueur(nomJoueur)}}
          />

        </View>

      </View>

      <TouchableOpacity
        style={[ DetailsJoueurStyles.validerModifButton, avatarJoueur == joueur.avatar_slug ? nomJoueur == joueur.nom_joueur ? DetailsJoueurStyles.disabledValiderModifButton : DetailsJoueurStyles.enableValiderModifButton : DetailsJoueurStyles.enableValiderModifButton ]}
        disabled={ avatarJoueur == joueur.avatar_slug ? nomJoueur == joueur.nom_joueur ? true : false : false }
        onPress={() => updateJoueur(joueur.joueur_id, avatarJoueur, nomJoueur).then(() => {
          navigation.goBack()
          toast.show('Informations modifiées avec succès !', {
            type: "success",
            placement: "top",
            animationType: "slide-in"
          });
        })}
      >

        <Text style={DetailsJoueurStyles.textValiderModifButton}>Valider les informations</Text>

      </TouchableOpacity>

    </View>
  );
}

const updateJoueur = function(joueur_id, avatarJoueur, nomJoueur) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      //
      tx.executeSql(
        'UPDATE joueurs SET nom_joueur = ?, avatar_slug = ? WHERE joueur_id = ?', [nomJoueur, avatarJoueur, joueur_id],
        function(tx, res) {

          resolve("ok")

        }
      )

    });

  })

}
