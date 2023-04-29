import { StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get("screen").width;

export default StyleSheet.create({
  buttonModal: {
    backgroundColor: "#7159df",
    width: 48,
    height: 48,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundModal: {
    borderRadius: 32,
  },
  backgroundModalDarkTheme: {
    backgroundColor: "#3C3C3C"
  },
  backgroundModalLightTheme: {
    backgroundColor: "#fff"
  },
  handleModal: {
    backgroundColor: "#D9D9D9",
    width: 32
  },
  stepOneContainer: {
     padding: 16,
     paddingTop: 0,
  },
  stepTwoContainer: {
    height: 512,
    padding: 16,
    paddingTop: 0,
  },
  textHeaderContainer: {
    width: "100%",
    marginBottom: 8,
  },
  textHeaderTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  },
  textHeaderTitleDarkTheme: {
    color: "#fff",
  },
  textHeaderTitleLightTheme: {
    color: "#252422",
  },
  description: {
    alignSelf: "center",
    fontSize: 12,
    paddingHorizontal: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular"
  },
  descriptionDarkTheme: {
    color: "#fff",
  },
  descriptionLightTheme: {
    color: "#252422",
  },
  inputsContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32
  },
  text: {
    fontSize: 16,
    color: "#BEBEBE",
    marginBottom: 8,
    fontFamily: "Poppins-Medium"
  },
  buttonSpinner: {
    borderRadius:16,
    activityOpacity: 0,
    backgroundColor: "#7159df"
  },
  inputSpinner: {
    backgroundColor: "transparent",
    width: 52,
    height: 52,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 32,
    fontSize: 20,
    borderColor: "#7159df",
    borderWidth: 3,
    fontFamily: "Poppins-Bold"
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: "row",
    width: width - 32
  },
  buttonReturnBackContainer: {
    height: 56,
    width: 56,
    backgroundColor: "#7159DF20",
    borderRadius: 32,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: "100%",
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#7159df",
  },
  buttonQuarter: {
    width: width - 92 ,
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
  },
  buttonAvailable: {
    backgroundColor: "#7159df",
  },
  buttonDisabled: {
    backgroundColor: "#B9B9B9",
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
  listEmptyContainer: {
    height:"75%",
    justifyContent: 'center'
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 16,
  },
  listEmptyTextDarkTheme: {
    color: "#fff"
  },
  listEmptyTextLightTheme: {
    color: "#252422"
  },
  listJoueursContainer: {
    height: "75%",
  },
  itemJoueur: {
    borderStyle: "solid",
    borderRadius: 32,
    padding: 12,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#7159df"
  },
  notSelected: {
    borderWidth: 2,
    borderColor: "#F3F3F3"
  },
  counterJoueurSelected: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#7159df",
    width: 18,
    height: 18,
    borderRadius: 16,
    justifyContent: "center"
  },
  counterJoueurSelectedText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-Medium"
  },
  wrapperItemJoueur: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  nomItemJoueur: {
    marginTop: 4,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    textAlign: "center",
    width: "100%"
  },
  nomItemJoueurDarkTheme: {
    color: "#fff",
  },
  nomItemJoueurLightTheme: {
    color: "#252422",
  },
});
