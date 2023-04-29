import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import InputSpinner from "react-native-input-spinner";

// Styles
import CreerPartieModalStyles from '../../Constants/Partie/CreerPartieModalStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

export default function NouvellePartie({ participants, palets, onChangeParticipants, onChangePalets, changePosition, changeStepModal, theme }) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={CreerPartieModalStyles.stepOneContainer}>

      <View style={CreerPartieModalStyles.textHeaderContainer}>
        <Text style={[ CreerPartieModalStyles.textHeaderTitle, theme === "dark" ? CreerPartieModalStyles.textHeaderTitleDarkTheme : CreerPartieModalStyles.textHeaderTitleLightTheme ]}>Nouvelle partie</Text>
      </View>

      <View>
        <Text style={[ CreerPartieModalStyles.description, theme === "dark" ? CreerPartieModalStyles.descriptionDarkTheme : CreerPartieModalStyles.descriptionLightTheme ]}>Commencez une nouvelle partie en indiquant le nombre de joueurs et que de palets par joueur.</Text>
      </View>

      <View style={CreerPartieModalStyles.inputsContainer}>
        <Text style={CreerPartieModalStyles.text}>Nombre de joueurs</Text>
        <InputSpinner
          value={participants}
          min={1}
          max={8}
          step={1}
          style={{marginBottom: 24}}
          width= {52}
          height= {52}
          buttonFontSize={52}
          textColor="#7159df"
          buttonLeftImage={<IconComponent name="minus" size="32" color="#fff" />}
          buttonRightImage={<IconComponent name="plus" size="32" color="#fff" />}
          buttonStyle={CreerPartieModalStyles.buttonSpinner}
          inputStyle={CreerPartieModalStyles.inputSpinner}
          onChange={(num)=>{
            onChangeParticipants(num)
          }}
          editable={false}
        />
        <Text style={CreerPartieModalStyles.text}>Nombre de palets par joueurs</Text>
        <InputSpinner
          value={palets}
          min={1}
          max={9}
          step={1}
          width= {52}
          height= {52}
          buttonFontSize={52}
          textColor="#7159df"
          buttonLeftImage={<IconComponent name="minus" size="32" color="#fff" />}
          buttonRightImage={<IconComponent name="plus" size="32" color="#fff" />}
          buttonStyle={CreerPartieModalStyles.buttonSpinner}
          inputStyle={CreerPartieModalStyles.inputSpinner}
          onChange={(num)=>{
            onChangePalets(num)
          }}
          editable={false}
        />
      </View>

      <TouchableOpacity
        style={[CreerPartieModalStyles.button]}
        onPress={() => {
          changePosition(520)
          changeStepModal('step two')
      }}
      >
        <Text style={CreerPartieModalStyles.textButton}>Étape suivante</Text>
      </TouchableOpacity>

    </View>

  );

};
