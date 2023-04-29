import { View, Text } from 'react-native';

// Packages
import InputSpinner from "react-native-input-spinner";

// Components
import IconComponent from '../../Components/IconComponent';
import font from '../../Components/FontComponent';

// Styles
import PartieStyles from '../../Constants/Partie/PartieStyles';

// Compteur Points Partie
export default function PointsPartieInputSpinner(props) {

	const [fontsLoaded] = font();

	let theme = props.theme;
  let setPoints20 = props.setPoints20;
  let setPoints10 = props.setPoints10;
  let setPoints8 = props.setPoints8;
  let setPoints6 = props.setPoints6;
  let setPoints4 = props.setPoints4;
  let setPoints2 = props.setPoints2;
  let setPoint1 = props.setPoint1;

  if (!fontsLoaded) {
    return null;
  }

	return (

    <View style={[  PartieStyles.inputContainer, theme === "dark" ? PartieStyles.inputContainerDarkTheme : PartieStyles.inputContainerLightTheme ]}>
      <Points score={props.score} />
      <InputSpinner
        max={props.max}
        min={0}
        step={1}
        value={props.value}
        style={PartieStyles.spinner}
        width= {52}
        height= {52}
        textColor="#7159df"
				buttonLeftImage={<IconComponent name="minus" size="32" color="#fff" />}
				buttonRightImage={<IconComponent name="plus" size="32" color="#fff" />}
        buttonStyle={PartieStyles.buttonSpinner}
        inputStyle={PartieStyles.inputSpinner}
        onChange={(num)=>{
          switch (props.score) {
            case 20 :
              setPoints20(num)
              break;
            case 10 :
              setPoints10(num)
              break;
            case 8 :
              setPoints8(num)
              break;
            case 6 :
              setPoints6(num)
              break;
            case 4 :
              setPoints4(num)
              break;
            case 2 :
              setPoints2(num)
              break;
            case 1 :
              setPoint1(num)
              break;
          }
        }}
        editable={false}
        buttonRightDisabled={props.isPaletsEqualZero ? true : false || props.joueur.score_joueur - (props.points20*20 + props.points10*10 + props.points8*8 + props.points6*6 + props.points4*4 + props.points2*2 + props.point1) < props.score ? true : false}
      />
      <Points score={props.score} />
    </View>

	)
}

function Points(props) {
  return (
    <View style={PartieStyles.pointsContainer}>
      <Text style={PartieStyles.textPoints}>{props.score}</Text>
			{props.score == 1
			?
			<Text style={PartieStyles.textsPointsLabel}>pt</Text>
			:
			<Text style={PartieStyles.textsPointsLabel}>pts</Text>
			}
    </View>
  )
}
