import React from 'react';
import { View, Text } from 'react-native';

// Packages
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';
import ClassementJoueursStyles from '../../Constants/Joueurs/ClassementJoueursStyles';

// Components
import IconComponent from '../../Components/IconComponent';
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

      <View key={index} style={ClassementJoueursStyles.classementJoueurItemContainer}>
        <View style={[ ClassementJoueursStyles.classementNumberContainer, index == 0 ? ClassementJoueursStyles.classementNumberOneContainer : index == 1 ? ClassementJoueursStyles.classementNumberTwoContainer  : index == 2 ? ClassementJoueursStyles.classementNumberThreeContainer : ClassementJoueursStyles.classementNumberOtherContainer ]}>
          <Text style={[ ClassementJoueursStyles.classementNumberText, index == 0 ? ClassementJoueursStyles.classementNumberOneText : index == 1 ? ClassementJoueursStyles.classementNumberTwoText  : index == 2 ? ClassementJoueursStyles.classementNumberThreeText : ClassementJoueursStyles.classementNumberOtherText ]}>{ index + 1}</Text>
        </View>
        <AvatarComponent size={32} name={avatar_slug}/>
        <Text style={[ JoueursStyles.nomJoueur ,{marginLeft: 12}]}>{nom_joueur}</Text>
        { profil
          ?
          <View style={JoueursStyles.profilJoueurContainer}>
          <IconComponent name="user-bold" size="12" color="#7159DF" />
            <Text style={JoueursStyles.profilJoueur}>Profil</Text>
          </View>
          :
          null
        }
        <Text style={ClassementJoueursStyles.classementJoueurItemStatut}>{statut}</Text>
      </View>

    )
  }
}
