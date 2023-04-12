import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import PartiesStyles from '../../Constants/Parties/PartiesStyles';

// Components
import AvatarComponent from '../../Components/AvatarComponent';
import IconComponent from '../../Components/IconComponent';

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Item d'une partie
export default class ItemPartie extends React.Component {

  swipeable = null;
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

    let statutFiltres = this.props.statutFiltres;
    let db = this.props.db;
    let setGames = this.props.setGames;
    let listerGames = this.props.listerGames;
    let setListGames = this.props.setListGames;
    let avatars = this.props.avatars.split(',');
    let gagnant_partie = this.props.gagnant;
    let statut = this.props.statut;
    let nbJoueurs = this.props.nbJoueurs;
    let toast = this.props.toast;
    let onRefresh = this.props.onRefresh;

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <View style={PartiesStyles.itemPartieContainer} >
        <Swipeable
          onRef={ref => this.swipeable = ref}
          style={PartiesStyles.swipeable}
          rightButtonWidth={64}
          rightButtons={[
            <TouchableOpacity

              style={PartiesStyles.buttonSupprimerSwipeable}
              onPress={() => {
                this.swipeable.recenter();
                deletePartie(this.props.game_id, db).then(function() {
                  onRefresh(statutFiltres)
                  toast.show('Partie supprimée !', {
                    type: "success",
                    placement: "top",
                    animationType: "slide-in"
                  });
                })
              }}
            >

              <View style={PartiesStyles.iconButtonSupprimerSwipeable}>

                <IconComponent name="trash" size="24" color="#fff" />

              </View>

            </TouchableOpacity>
          ]}
        >
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

                <Text style={PartiesStyles.statutPartieText}>{nbJoueurs} joueurs</Text>

                {gagnant_partie == undefined

                  ?

                  null

                  :

                  <View style={PartiesStyles.containerGagnant}>

                    <Text style={PartiesStyles.separatorGagnantPartie}> · </Text>
                    <IconComponent name="cup" size="12" color="#FEC601" />
                    <Text style={PartiesStyles.gagnantPartieText}>{gagnant_partie}</Text>

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
        </Swipeable>
      </View>
    )
  }
}

const deletePartie = function(game_id, db) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM parties WHERE parties.partie_id = ?", [game_id]
      );
      tx.executeSql(
        "DELETE FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [game_id]
      )
    })
    resolve(game_id)
  })
}
