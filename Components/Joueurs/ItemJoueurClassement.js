import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';
import ClassementJoueursStyles from '../../Constants/Joueurs/ClassementJoueursStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Item d'une partie
export default class ItemJoueur extends React.Component {

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

    let profil = this.props.profil;
    let index = this.props.index;
    let joueur_id = this.props.joueur_id;
    let avatar_slug = this.props.avatar_slug;
    let nom_joueur = this.props.nom_joueur;
    let statut = this.props.statut

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (

      <View key={index} style={{borderStyle: "solid", flexDirection: "row", alignItems: "center", borderColor: "#F3F3F3", borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 4}}>
        <View style={[ ClassementJoueursStyles.classementNumberContainer, index == 0 ? ClassementJoueursStyles.classementNumberOneContainer : index == 1 ? ClassementJoueursStyles.classementNumberTwoContainer  : index == 2 ? ClassementJoueursStyles.classementNumberThreeContainer : ClassementJoueursStyles.classementNumberOtherContainer ]}>
          <Text style={[ ClassementJoueursStyles.classementNumberText, index == 0 ? ClassementJoueursStyles.classementNumberOneText : index == 1 ? ClassementJoueursStyles.classementNumberTwoText  : index == 2 ? ClassementJoueursStyles.classementNumberThreeText : ClassementJoueursStyles.classementNumberOtherText ]}>{ index + 1}</Text>
        </View>
        <AvatarComponent size={48} name={avatar_slug}/>
        <Text style={{marginLeft: 12}}>{nom_joueur}</Text>
        { profil
          ?
          <View style={JoueursStyles.profilJoueurContainer}>
            <Ionicons name='ios-person-circle-outline' size={12} color="#7159DF" style={JoueursStyles.profilIconJoueur}/>
            <Text style={JoueursStyles.profilJoueur}>Profil</Text>
          </View>
          :
          null
        }
        <Text style={{marginLeft: "auto", fontSize: 20,
        color: "#252422",
        fontFamily: "Poppins-Bold"}}>{statut}</Text>
      </View>

    )
  }
}
