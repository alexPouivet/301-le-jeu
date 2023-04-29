import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  switchSelector : {
    marginHorizontal: 16,
    marginBottom: 24
  },
  switchSelectedText: {
    textTransform: "uppercase",
    fontSize: 12,
    marginLeft: 8,
    fontFamily: "Poppins-Medium"
  },
  switchText: {
    textTransform: "uppercase",
    fontSize: 12,
    marginLeft: 8,
    fontFamily: "Poppins-Medium"
  },
  classementHeadTable: {
    flexDirection: "row",
    paddingHorizontal: 36,
    marginBottom: 12
  },
  classementHeadPositionCol: {
    marginLeft: 4,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#BEBEBE",
    textTransform: "uppercase"
  },
  classementHeadJoueurCol: {
    marginLeft: 64,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#BEBEBE",
    textTransform: "uppercase"
  },
  classementHeadSwitchValueCol: {
    marginLeft: "auto",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#BEBEBE",
    textTransform: "uppercase"
  },
  classementBodyContainer: {
    paddingHorizontal: 16
  },
  classementJoueurItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    padding: 20,
    marginBottom: 8
  },
  classementJoueurItemContainerDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  classementJoueurItemContainerLightTheme: {
    backgroundColor: "#fff",
  },
  classementNumberContainer: {
    height: 40,
    width: 40,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32
  },
  classementJoueurItemStatut: {
    marginLeft: "auto",
    fontSize: 20,
    fontFamily: "Poppins-Bold"
  },
  classementJoueurItemStatutDarkTheme: {
    color: "#fff",
  },
  classementJoueurItemStatutLightTheme: {
    color: "#252422",
  },
  classementNumberOneContainer: {
    backgroundColor: '#FFAD0820',
  },
  classementNumberTwoContainer: {
    backgroundColor: '#C0C0C020',
  },
  classementNumberThreeContainer: {
    backgroundColor: '#C49C4820',
  },
  classementNumberOtherContainer: {
    backgroundColor: '#7159df20',
  },
  classementNumberText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold"
  },
  classementNumberOneText: {
    color: "#FFAD08",
  },
  classementNumberTwoText: {
    color: "#C0C0C0",
  },
  classementNumberThreeText: {
    color: "#C49C48",
  },
  classementNumberOtherText: {
    color: "#7159df",
  }
})
