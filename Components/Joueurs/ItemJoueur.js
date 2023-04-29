import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import Swipeable from 'react-native-swipeable';
import * as Font from 'expo-font';

// Styles
import JoueursStyles from '../../Constants/Joueurs/JoueursStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import AvatarComponent from '../../Components/AvatarComponent'
import supprimerJoueur from '../../Components/Joueurs/SupprimerJoueur';

let customFonts = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
};

// Item d'une partie
export default class ItemJoueur extends React.Component {

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

    let theme = this.props.theme;
    let db = this.props.db;
    let index = this.props.index;
    let onRefresh = this.props.onRefresh;
    let toast = this.props.toast;

    let joueur_id = this.props.joueur.joueur_id;
    let nom_joueur = this.props.joueur.nom_joueur;
    let avatar_slug = this.props.joueur.avatar_slug;
    let profil = this.props.joueur.profil;
    let nbParties = this.props.joueur.nb_parties;
    let nbVictoires = this.props.joueur.nb_victoires;
    let positionsParties = JSON.parse(this.props.joueur.positions_parties);
    let positionPartiesArray = positionsParties.map(x => x.position);
    let positionMoy = positionPartiesArray.reduce((a, b) => a + b, 0) / positionPartiesArray.length
    positionMoy = positionMoy.toString().substring(0,4);

    const rightButtons = [
      <TouchableOpacity

        style={JoueursStyles.buttonEditSwipeable}
        onPress={() => {

          if (profil) {
            this.props.navigation.navigate("Profil", {
              screen: "Modifier Joueur",
              params: {
                joueur_id: joueur_id
              }
            });
          } else {
            this.props.navigation.navigate("Modifier Joueur", {joueur_id: joueur_id })
          }

          this.swipeable.recenter();

        }}
      >

        <View style={JoueursStyles.iconButtonSwipeable}>

          <IconComponent name="edit-person" size="24" color="#fff" />

        </View>

      </TouchableOpacity>
      ,
      <TouchableOpacity
        style={JoueursStyles.buttonSupprimerSwipeable}
        onPress={() => {
          this.swipeable.recenter();
          supprimerJoueur(joueur_id).then(function() {
            onRefresh();
            toast.show('Joueur supprimé !', {
              type: "success",
              placement: "top",
              animationType: "slide-in"
            });
          })

        }}
      >

        <View style={JoueursStyles.iconButtonSwipeable}>

          <IconComponent name="trash" size="24" color="#fff" />

        </View>

      </TouchableOpacity>
    ]

    const rightButtonsProfil = [
      <TouchableOpacity

        style={JoueursStyles.buttonEditSwipeable}
        onPress={() => {

          this.props.navigation.navigate("Profil", {
            screen: "Modifier Joueur",
            params: {
              joueur_id: joueur_id
            }
          });
          this.swipeable.recenter();

        }}
      >

        <View style={JoueursStyles.iconButtonSwipeable}>

          <IconComponent name="edit-person" size="24" color="#fff" />

        </View>

      </TouchableOpacity>
    ]

    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <View style={[ JoueursStyles.itemJoueurContainer, theme === "dark" ? JoueursStyles.itemJoueurContainerDarkTheme : JoueursStyles.itemJoueurContainerLightTheme ]}>

        <Swipeable
          onRef={ref => this.swipeable = ref}
          rightButtonWidth={64}
          style={JoueursStyles.swipeable}
          rightButtons={ profil ? rightButtonsProfil : rightButtons }
        >

          <TouchableOpacity
            key={index}
            style={JoueursStyles.wrapperJoueur}
            onPress={() => {

              if (profil) {
                this.props.navigation.navigate('Profil')
              } else {
                this.props.navigation.navigate('Details Joueur', { joueur_id: joueur_id })
              }

            }
            }
          >
            <View style={JoueursStyles.infosJoueurContainer}>

              <AvatarComponent size={48} name={avatar_slug} />

              <View style={JoueursStyles.infosContainer}>

                <View style={JoueursStyles.primaryInfosJoueurContainer}>

                  <Text style={[ JoueursStyles.nomJoueur, theme === "dark" ? JoueursStyles.nomJoueurDarkTheme : JoueursStyles.nomJoueurLightTheme ]}>{nom_joueur}</Text>

                  { profil
                    ?
                    <View style={JoueursStyles.profilJoueurContainer}>
                      <IconComponent name="user-bold" size="12" color="#7159df" />
                      <Text style={JoueursStyles.profilJoueur}>Profil</Text>
                    </View>
                    :
                    null
                  }

                </View>

                <View style={JoueursStyles.secondaryInfosJoueurContainer}>

                  { nbParties == null || nbParties == 0

                    ?

                    null

                    :

                    <View style={JoueursStyles.rowSecondaryInfosJoueur}>

                    <IconComponent name="layer-bold" size="12" color="#7159df" />

                    { nbParties == 1

                      ?

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{nbParties} partie</Text>

                      :

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{nbParties} parties</Text>

                    }

                    </View>

                  }

                  { nbVictoires == null || nbVictoires == 0

                    ?

                    null

                    :

                    <View style={JoueursStyles.rowSecondaryInfosJoueur}>

                    <Text style={JoueursStyles.separatorSecondaryInfosJoueur}>·</Text>
                    <IconComponent name="cup" size="12" color="#FEC601" />

                    { nbVictoires == 1

                      ?

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{nbVictoires} victoire</Text>

                      :

                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{nbVictoires} victoires</Text>

                    }

                    </View>

                  }

                  { positionsParties.length === 0

                    ?

                    null

                    :

                    <View style={JoueursStyles.rowSecondaryInfosJoueur}>

                      <Text style={JoueursStyles.separatorSecondaryInfosJoueur}>·</Text>
                      <IconComponent name="average" size="12" color="#FD96A9" />
                      <Text style={JoueursStyles.secondaryInfosJoueurText}>{positionMoy} de moy.</Text>

                    </View>

                  }

                </View>

              </View>

            </View>

            <View>

              <IconComponent name="chevron-right" size="24" color="#C0C0C0" />

            </View>

          </TouchableOpacity>

        </Swipeable>

      </View>
    )
  }
}
