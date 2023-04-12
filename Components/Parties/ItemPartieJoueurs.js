import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import * as Font from 'expo-font';

// Styles
import PartiesStyles from '../../Constants/Parties/PartiesStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent'
import IconComponent from '../../Components/IconComponent';

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Item d'une partie
export default class ItemPartie extends React.Component {

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

    let db = this.props.db;
    let avatars = this.props.avatars.split(',');

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <View style={PartiesStyles.itemPartieContainer} >

          <TouchableOpacity style={[PartiesStyles.wrapperPartie] }
            onPress={() => this.props.navigation.navigate('Details Partie', { game_id: this.props.game_id }) }
          >

            <View style={[PartiesStyles.statutPartieContainer, this.props.statut == "finie" ? PartiesStyles.partieFinie : PartiesStyles.partieEnCours ]}>

              {
              this.props.statut ==  "finie"
              ?
                <IconComponent name="flag" size="24" color="#FEC601" />
              :
                <IconComponent name="hourglass" size="24" color="#7159DF" />
              }

            </View>

            <View style={PartiesStyles.infosPartieContainer}>

              <View style={PartiesStyles.containerDateAndTime}>
                <Text style={PartiesStyles.libeleDateAndTime}>Partie du {this.props.date} à {this.props.time}</Text>
              </View>

              <View style={PartiesStyles.containerJoueurs}>

                <Text style={PartiesStyles.statutPartieText}>{this.props.nbJoueurs} joueurs</Text>

                {this.props.gagnant_partie == undefined

                  ?

                  null

                  :

                  <View style={PartiesStyles.containerGagnant}>

                    <Text style={PartiesStyles.separatorGagnantPartie}> · </Text>
                    <IconComponent name="cup" size="12" color="#FEC601" />
                    <Text style={PartiesStyles.gagnantPartieText}>{this.props.gagnant_partie}</Text>

                  </View>

                }

              </View>

              <View  style={{ flexDirection: "row", marginTop: 4}}>

                {avatars.map(( avatar_slug, i) => (

                  <View key={i} style={PartiesStyles.avatarContainer}>

                    <AvatarComponent size={24} name={avatar_slug} />

                  </View>

                ))}

              </View>

            </View>

            <View style={PartiesStyles.arrowContainer}>

              <IconComponent name="chevron-right" size="24" color="#C0C0C0" />

            </View>

          </TouchableOpacity>
      </View>
    )
  }
}
