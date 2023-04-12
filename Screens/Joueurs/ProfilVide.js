import { View, Text, TouchableOpacity } from 'react-native';

// Components
import font from '../../Components/FontComponent';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import DetailsJoueurStyles from '../../Constants/Joueur/DetailsJoueurStyles';

// Page Profil vide
export default function ProfilVide({ navigation }) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={GlobalStyles.container}>

      <View style={GlobalStyles.textHeaderContainer}>
        <Text style={GlobalStyles.textHeaderTitle}>Pas de profil disponible</Text>
      </View>

      <View style={DetailsJoueurStyles.descriptionContainer}>

        <Text style={DetailsJoueurStyles.subtitle}>Informations profil</Text>

        <Text style={DetailsJoueurStyles.description}>Le profil n’a pas été initialisé, les infos et les statistiques ne sont donc pas disponibles pour le moment. Cliquez sur le bouton “Se créer un profil” juste en dessous pour vous enregistrer un profil et ainsi accéder à toutes les fonctionnalités.</Text>

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
