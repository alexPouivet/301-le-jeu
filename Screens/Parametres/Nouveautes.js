import React from 'react';
import {  StyleSheet, View, Text, Animated, FlatList, TouchableOpacity, Image, useWindowDimensions } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScalingDot, SlidingBorder, ExpandingDot, SlidingDot } from 'react-native-animated-pagination-dots';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';
import { useFonts } from 'expo-font';

interface ItemProps {
  key: string;
  title: string;
  image: string;
  description: string;
}

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
];

export default function Probleme({ navigation, route }) {

  const {width} = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((item: ItemProps) => item.key, []);
  const renderItem = React.useCallback(
    ({item}: {item: ItemProps}) => {
      return (
        <View style={[styles.itemContainer, {width: width }]}>

          <View style={{flex: 4/7, justifyContent: "flex-end"}}>

            <Image style={{width: width - 96, resizeMode: "contain", marginBottom: 8}} source={item.image} />

          </View>

          <View style={{flex: 3/7, alignItems: "center"}}>

            <Text  style={{textAlign: "center", marginBottom: 8, fontSize: 16, fontFamily: "Poppins-Medium", color: "#252422"}}>{item.title}</Text>
            <Animated.Text style={{textAlign: "center"}}>{item.description}</Animated.Text>

          </View>

        </View>
      );
    },
    [width],
  );
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

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
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Nouvelles fonctionnalités</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>

      <View style={styles.container}>

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
          style={styles.flatList}
          pagingEnabled
          horizontal
          decelerationRate={'normal'}
          scrollEventThrottle={24}
          renderItem={renderItem}
        />

        <View style={styles.dotContainer}>
          <ExpandingDot
            data={INTRO_DATA}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotColor={'#7159df50'}
            activeDotColor={'#7159df'}
            inActiveDotOpacity={0.5}
            dotStyle={styles.dotStyles}
            containerStyle={styles.constainerStyles}
          />
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 64
  },

  dotContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dotStyles: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },

});
