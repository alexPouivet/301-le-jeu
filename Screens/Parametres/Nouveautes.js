import { useRef, useCallback } from 'react';
import {  View, Text, Animated, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

// Packages
import { ExpandingDot } from 'react-native-animated-pagination-dots';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

interface ItemProps {
  key: string;
  title: string;
  image: string;
  description: string;
}

const width = Dimensions.get("screen").width;

const INTRO_DATA = [
  {
    key: '1',
    title: 'Nouveau menu',
    image: require('../../assets/images/menu.png'),
    description:
      "Le nouveau menu se compose de 5 onglets correspondant aux éléments les plus importants de la nouvelle version de l'application: Parties, Joueurs, Nouvelle partie, Paramètres et Profil."
  },
  {
    key: '2',
    title: 'Les joueurs apparaissent !',
    image: require('../../assets/images/joueurs.png'),
    description:
      "Créez des joueurs et retrouvez-les dans l'onglet dédié \"Joueurs\" ! Accédez aux données de chaque joueur, modifiez-les ou supprimez-les facilement en cliquant sur le joueur pour accéder aux détails.",
  },
  {
    key: '3',
    title: 'Création du profil',
    image: require('../../assets/images/profil.png'),
    description:
      "Cliquez sur l'onglet dédié \"Profil\" et remplissez les informations pour créer votre profil et accéder à des informations plus détaillées une fois terminé.",
  },
  {
    key: '4',
    title: 'Statistiques des joueurs',
    image: require('../../assets/images/statistiques.png'),
    description:
      "Avec la nouveauté des joueurs, vient les statistiques ! Chaque joueur aura accès à des statistiques sur ses parties jouées : son nombre de Parties, de Victoires, de Podiums, le total de Points marqués pendant toutes ses parties, la Moyenne de son classement et sa Meilleure position atteinte.",
  },
  {
    key: '5',
    title: 'Affichage des parties',
    image: require('../../assets/images/parties.png'),
    description:
      "Une nouvelle manière d'afficher les parties est disponible dans l'onglet \"Parties\", où il est possible de filtrer les parties selon leurs statuts encore plus facilement qu'avant.",
  },
  {
    key: '6',
    title: 'Sélection des joueurs',
    image: require('../../assets/images/selection.png'),
    description:
      "Il est maintenant encore plus facile de créer une nouvelle partie ! Lors de la sélection des joueurs, le nouvel affichage vous permet de sélectionner ou de créer plus rapidement les joueurs pour votre partie.",
  },
  {
    key: '7',
    title: 'Classement des joueurs',
    image: require('../../assets/images/classement.png'),
    description:
      "Regardez votre classement en fonction de votre nombre de victoires, de vos points inscrits ou de la moyenne de votre position.",
  },
];

export default function Probleme({ navigation, route }) {

  const scrollX = useRef(new Animated.Value(0)).current;
  const keyExtractor = useCallback((item: ItemProps) => item.key, []);
  const renderItem = useCallback(
    ({item}: {item: ItemProps}) => {
      return (
        <View style={[ParametersStyles.itemContainer]}>

          <View style={ParametersStyles.itemWrap}>

            <View style={ParametersStyles.imageContainer}>

              <Image style={ParametersStyles.image} source={item.image} />

            </View>

            <View style={ParametersStyles.descriptionContainer}>

              <Text  style={ParametersStyles.itemTitle}>{item.title}</Text>
              <Animated.Text style={ParametersStyles.itemDescription}>{item.description}</Animated.Text>

            </View>

          </View>

        </View>
      );
    },
    [width],
  );

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
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
        <Text style={GlobalStyles.textHeaderTitle}>Derniers ajouts</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <View style={ParametersStyles.containerList}>

        <FlatList
          data={INTRO_DATA}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          style={ParametersStyles.flatList}
          pagingEnabled
          horizontal
          decelerationRate={'normal'}
          scrollEventThrottle={24}
          renderItem={renderItem}
        />

        <View style={ParametersStyles.dotContainer}>
          <ExpandingDot
            data={INTRO_DATA}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotColor={'#7159df50'}
            activeDotColor={'#7159df'}
            inActiveDotOpacity={0.5}
            dotStyle={ParametersStyles.dotStyles}
          />
        </View>

      </View>

    </View>
  );
};
