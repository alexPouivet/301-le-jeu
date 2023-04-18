import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// Packages
import * as Font from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import AvatarComponent from '../../Components/AvatarComponent'
import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Créer le Profil
export default class CreerProfil extends React.Component {

  state = {
    fontsLoaded: false,
    nomJoueur: "",
    avatarJoueur: null,
    errorText: ""
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async _loadAvatar() {
    this.setState({ avatarJoueur: (Math.random() + 1).toString(36).substring(3) })
  }

  componentDidMount() {
    this._loadFontsAsync();
    this._loadAvatar();
  }

  render() {

    if (!this.state.fontsLoaded) {
      return null;
    }

    if (!this.state.avatarJoueur) {
      return null;
    }

    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.buttonLeftTextContainer}>
          <TouchableOpacity
            style={GlobalStyles.buttonLeft}
            onPress={() => {
              this.props.isProfil.extraData.navigation.navigate("Profil Vide")
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
          <AvatarComponent size={64} name={this.state.avatarJoueur} />

          <View style={DetailsJoueurStyles.buttonsContainerChangeAvatar}>

            <TouchableOpacity
              style={DetailsJoueurStyles.buttonWithIcon}
              onPress={() => {

                this.setState({avatarJoueur: (Math.random() + 1).toString(36).substring(3)});

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
              value={this.state.nomJoueur}
              onChangeText={ nomJoueur => { this.setState({nomJoueur: nomJoueur}) }}
            />

          </View>

          { this.state.errorText
            ?
            <Text style={[ GlobalStyles.errorText, {marginHorizontal: 16} ]}>{this.state.errorText}</Text>
            :
            null
          }

        </View>

        <TouchableOpacity
          style={[DetailsJoueurStyles.validerModifButton, this.state.nomJoueur == "" ? this.state.nomJoueur.length < 2 ? DetailsJoueurStyles.disabledValiderModifButton : DetailsJoueurStyles.enableValiderModifButton : DetailsJoueurStyles.enableValiderModifButton]}
          disabled={ this.state.nomJoueur == "" ? this.state.nomJoueur.length < 2 ? true : false : false }
          onPress={() => {

            if( this.state.nomJoueur == "" || this.state.nomJoueur.length < 2 ){

              this.setState({errorText: "Deux lettres au minimum pour valider votre nom."});

            } else {

              this.setState({errorText: ""});
              createProfile(this.state.nomJoueur, this.state.avatarJoueur).then(() => {
                this.props.isProfil.extraData.navigation.navigate("Joueurs");
                this.props.isProfil.extraData.setIsProfil("profil");
                this.props.isProfil.extraData.toast.show('Profil créé avec succès !', {
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
}

const createProfile = function(nomJoueur, avatarJoueur) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      //
      tx.executeSql(
        'INSERT INTO joueurs (nom_joueur, avatar_slug, profil, nb_points, nb_parties, nb_victoires, nb_podiums, positions_parties) VALUES  (?, ?, ?, ?, ?, ?, ?, ?)', [nomJoueur, avatarJoueur, 1, 0, 0, 0, 0, "[]"],
        function(tx, res) {

          resolve("ok")

        }
      )

    });

  })

}
