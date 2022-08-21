import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Share } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from '../Constants/GlobalStyles';
import ParametersStyles from '../Constants/ParametersStyles';

// Page Détails d'une partie
export default function Partager({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: 'https://drive.google.com/drive/u/0/folders/1PfY16dfE2wGjwcjl7Rn25N7q1pHfpdLk',
        url:
          'https://drive.google.com/drive/u/0/folders/1PfY16dfE2wGjwcjl7Rn25N7q1pHfpdLk',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={[GlobalStyles.titrePage, { fontFamily: "Poppins-Medium" }]}>Partager l'application</Text>
      </View>

      <View style={GlobalStyles.parametresContainer}>
        <Text style={GlobalStyles.Text16}>Pour partager l'application, utilisez le qr-code ou le lien partageable situés ci-dessous :</Text>
        <Image
        style={GlobalStyles.partagerImage}
        source={
          require('../assets/images/qrcode.png')}
        />
      </View>
      <TouchableOpacity style={GlobalStyles.partagerButton} onPress={shareLink} title="Partager l'application">
          <Ionicons name='ios-share-social-outline' size={20} color="#fff" style={{marginLeft: "auto"}}/>
          <Text style={GlobalStyles.partagerTextButton}>Partager l'application</Text>
      </TouchableOpacity>
    </View>
  );
}
