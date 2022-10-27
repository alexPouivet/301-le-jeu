import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Share } from 'react-native';

// Packages
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Partager
export default function Partager({ navigation, route }) {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
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
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={GlobalStyles.buttonLeft}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422" style={GlobalStyles.buttonIcon}/>
        </TouchableOpacity>
        <Text style={GlobalStyles.textHeaderTitle}>Partager l'application</Text>
        <View style={{ width: 42 }}>
        </View>
      </View>

      <View style={ParametersStyles.container}>
        <Text style={ParametersStyles.text16}>Pour partager l'application, utilisez le qr-code ou le lien partageable situés ci-dessous (uniquement pour android pour le moment) :</Text>
        <Image
        style={ParametersStyles.partagerImage}
        source={
          require('../../assets/images/qrcode.png')}
        />

        <TouchableOpacity style={ParametersStyles.partagerButton} onPress={shareLink} title="Partager l'application">
            <Ionicons name='ios-share-social-outline' size={20} color="#fff" style={{marginLeft: "auto"}}/>
            <Text style={ParametersStyles.partagerTextButton}>Partager l'application</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
