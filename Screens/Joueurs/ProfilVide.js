import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import { useFonts } from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Page Profil vide
export default function ProfilVide({ navigation }) {

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

      <View style={[GlobalStyles.textHeaderContainer]}>
        <Text style={GlobalStyles.textHeaderTitle}>Pas de profil disponible</Text>
      </View>

      <View style={{marginHorizontal: 16, marginTop: "auto", marginBottom: "auto"}}>

        <Text style={[DetailsJoueurStyles.subtitle]}>Informations profil</Text>

        <Text style={{textAlign: "center", fontFamily: "Poppins-Regular", fontSize: 14, marginBottom: 32}}>Le profil n’a pas été initialisé, les infos et les statistiques ne sont donc pas disponibles pour le moment. Cliquez sur le bouton “Se créer un profil” juste en dessous pour vous enregistrer un profil et ainsi accéder à toutes les fonctionnalités.</Text>

        <TouchableOpacity
          style={DetailsJoueurStyles.button}
          onPress={() => navigation.navigate('Créer Profil')}
        >
          <Text style={DetailsJoueurStyles.textButton}>Se créer un profil</Text>
        </TouchableOpacity>

      </View>

    </View>
  );

}
