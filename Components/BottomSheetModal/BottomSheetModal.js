import { useCallback, useState, useRef, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Platform } from 'react-native';

// Packages
import BottomSheet, { BottomSheetBackdrop  } from '@gorhom/bottom-sheet';
import { Portal, PortalHost } from '@gorhom/portal';
import { useToast } from "react-native-toast-notifications";

// Styles
import CreerPartieModalStyles from '../../Constants/Partie/CreerPartieModalStyles';

// Components
import IconComponent from '../../Components/IconComponent';
import NouvellePartieComponent from '../BottomSheetModal/NouvellePartieComponent';
import CommencerPartieComponent from '../BottomSheetModal/CommencerPartieComponent';

const BottomSheetModal = ({theme}) => {

  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  let snapPoints = useMemo(() => [ 520, 404 ], []);

  if (Platform.OS === "android") {

    snapPoints = useMemo(() => [ 520, 428 ], []);

  }

  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      changeStepModal("step one")
      onChangePalets(1);
      onChangeParticipants(1);
    }
    }, []);

  const onButtonPress = () => {
      bottomSheetRef?.current?.expand();
  }

  const closeModal = () => {
    bottomSheetRef?.current?.close();
  }

  const changePosition = (position) => {
    bottomSheetRef?.current?.snapToPosition(position)
  }

  const [participants, onChangeParticipants] = useState(1);
  const [palets, onChangePalets] = useState(1);
  const  [stepModal, changeStepModal] = useState("step one");
  const toast = useToast();

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        opacity={0.6}
        pressBehavior={'close'}
      />
    ),
    []
  );

 return (

  <>

    <TouchableOpacity onPress={onButtonPress} style={CreerPartieModalStyles.buttonModal}>
      <IconComponent name="plus" size="24" color="#fff" />
    </TouchableOpacity>

    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        backgroundStyle={[ CreerPartieModalStyles.backgroundModal, theme === "dark" ? CreerPartieModalStyles.backgroundModalDarkTheme : CreerPartieModalStyles.backgroundModalLightTheme ]}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={CreerPartieModalStyles.handleModal}
      >

        {stepModal == "step one" ?

        <NouvellePartieComponent theme={theme} palets={palets} onChangePalets={onChangePalets} participants={participants} onChangeParticipants={onChangeParticipants} changeStepModal={changeStepModal} changePosition={changePosition} />

        :

        <CommencerPartieComponent theme={theme} palets={palets} closeModal={closeModal} participants={participants} changeStepModal={changeStepModal} changePosition={changePosition} toast={toast} navigation={navigation} />

        }


      </BottomSheet>
    </Portal>
    <PortalHost name="custom_host" />

 </>

 )

}

export default BottomSheetModal;
