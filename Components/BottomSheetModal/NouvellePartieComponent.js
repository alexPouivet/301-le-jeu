import { View, Text, TouchableOpacity } from 'react-native';

// Packages
import InputSpinner from "react-native-input-spinner";

// Styles
import CreerPartieModalStyles from '../../Constants/Partie/CreerPartieModalStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

export default function NouvellePartie(props) {

  const [fontsLoaded] = font();

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={CreerPartieModalStyles.stepOneContainer}>

      <View style={CreerPartieModalStyles.textHeaderContainer}>
        <Text style={CreerPartieModalStyles.textHeaderTitle}>Nouvelle partie</Text>
      </View>

      <View>
        <Text style={CreerPartieModalStyles.description}>Commencez une nouvelle partie en indiquant le nombre de joueurs et que de palets par joueur.</Text>
      </View>

      <View style={CreerPartieModalStyles.inputsContainer}>
        <Text style={CreerPartieModalStyles.text}>Nombre de joueurs</Text>
        <InputSpinner
          value={props.participants}
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
            props.onChangeParticipants(num)
          }}
          editable={false}
        />
        <Text style={CreerPartieModalStyles.text}>Nombre de palets par joueurs</Text>
        <InputSpinner
          value={props.palets}
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
            props.onChangePalets(num)
          }}
          editable={false}
        />
      </View>

      <TouchableOpacity
        style={[CreerPartieModalStyles.button]}
        onPress={() => {
          props.changePosition(520)
          props.changeStepModal('step two')
      }}
      >
        <Text style={CreerPartieModalStyles.textButton}>Étape suivante</Text>
      </TouchableOpacity>

    </View>

  );

};
