import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';

// Styles
import CreerPartieStyles from '../../Constants/Partie/CreerPartieStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Selection Joueur Créer Partie
export default class SelectionJoueurComponent extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {

    let joueur = this.props.joueur;
    let setIsLimit = this.props.setIsLimit;
    let setPlayersSelect = this.props.setPlayersSelect;
    let nb_participants = this.props.nb_participants;

    return (
      <TouchableOpacity
        style={ [CreerPartieStyles.itemJoueur, this.props.playersSelect.includes(joueur.joueur_id) ? CreerPartieStyles.selected : CreerPartieStyles.notSelected] }
        onPress={() => {
          checkNbOfPlayers(this.props.playersSelect, joueur.joueur_id, setIsLimit, nb_participants, setPlayersSelect).then((value) => {

            if (this.props.playersSelect.length == nb_participants) {

              setIsLimit(true);

            }

          })
          .catch(function(rej) {

            if( rej == "déjà selectionné") {

              setIsLimit(false)

            }

          })

        }}
      >

        {
          this.props.playersSelect.includes(joueur.joueur_id)
          ?
            <View style={CreerPartieStyles.counterJoueurSelected}>

              <Text style={CreerPartieStyles.counterJoueurSelectedText}>{ this.props.playersSelect.indexOf(joueur.joueur_id) + 1 }</Text>

            </View>
          :
            null
        }

        <View style={CreerPartieStyles.wrapperItemJoueur}>

          <AvatarComponent size={64} name={joueur.avatar_slug} />

          <Text numberOfLines={1} style={CreerPartieStyles.nomItemJoueur}>{joueur.nom_joueur}</Text>
        </View>

      </TouchableOpacity>
    )
  }
}

const checkNbOfPlayers = function(playersSelect, joueur_id, setIsLimit, nb_participants, setPlayersSelect) {

  return new Promise((resolve, reject) => {

    if( !playersSelect.includes(joueur_id) ) {

      if (playersSelect.length +1 <= nb_participants) {

        setPlayersSelect(current => [...current, joueur_id]);

        resolve("joueur ajouté à la liste")

      } else {

        reject("limite atteinte")

      }

    } else {

      playersSelect = playersSelect.filter(item => item !== joueur_id);

      setPlayersSelect(playersSelect);

      reject("déjà selectionné")

    }

  })
}
