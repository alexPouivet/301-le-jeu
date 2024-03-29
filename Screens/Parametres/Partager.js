import { View, Text, TouchableOpacity, Image, Share } from 'react-native';

// Styles
import GlobalStyles from '../../Constants/GlobalStyles';
import ParametersStyles from '../../Constants/Parametres/ParametersStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

// Partager
export default function Partager({ navigation, theme }) {

  const [fontsLoaded] = font();

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
    <View style={[ GlobalStyles.container, theme === "dark" ? GlobalStyles.containerDarkTheme : GlobalStyles.containerLightTheme ]}>
      <View style={GlobalStyles.buttonLeftTextContainer}>
        <TouchableOpacity
          style={[ GlobalStyles.buttonLeft, theme === "dark" ? GlobalStyles.buttonLeftDarkTheme : GlobalStyles.buttonLeftLightTheme]}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <IconComponent name="arrow-back" size="24" color={theme === "dark" ? "#fff" : "#252422"} />
        </TouchableOpacity>
        <Text style={[ GlobalStyles.textHeaderTitle, theme === "dark" ? GlobalStyles.textHeaderTitleDarkTheme : GlobalStyles.textHeaderTitleLightTheme ]}>Partager l'application</Text>
        <View style={GlobalStyles.buttonEmpty}>
        </View>
      </View>

      <View style={[ ParametersStyles.container, theme === "dark" ? ParametersStyles.containerDarkTheme : ParametersStyles.containerLightTheme ]}>
        <Text style={[ ParametersStyles.text16, theme === "dark" ? ParametersStyles.text16DarkTheme : ParametersStyles.text16LightTheme]}>Pour partager l'application, utilisez le qr-code ou le lien partageable situés ci-dessous (uniquement pour android pour le moment) :</Text>
        <Image
        style={ParametersStyles.partagerImage}
        source={
          require('../../assets/images/qrcode.png')}
        />

        <TouchableOpacity style={ParametersStyles.partagerButton} onPress={shareLink} title="Partager l'application">
          <View style={ParametersStyles.partagerButtonWrap}>
            <IconComponent name="share" size="24" color="#fff" />
            <Text style={ParametersStyles.partagerTextButton}>Partager avec le lien</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
}
