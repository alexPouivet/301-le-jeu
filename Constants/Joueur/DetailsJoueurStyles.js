import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  dropdownStyle: {
    width: "auto",
    height: "auto",
    marginTop: Platform.OS === "android" ? -16 : 16,
    marginRight: -12,
    borderRadius: 24,
    paddingVertical: 0,
    borderWidth: 0,
  },
  dropdownStyleDarkTheme: {
    backgroundColor: "#3C3C3C"
  },
  dropdownStyleLightTheme: {
    backgroundColor: "#fff"
  },
  dropdownItem: {
    flexDirection: "row",
    margin: 16,
    marginRight:32,
    fontSize: 16,
    alignItems: "center",
    color: "#252422",
  },
  dropdownTextStyle: {
    marginLeft: 10,
    fontSize: 12,
    color: "#252422"
  },
  dropdownTextStyleDarkTheme: {
    marginLeft: 10,
    fontSize: 12,
    color: "#fff"
  },
  infosJoueurContainer: {
    alignItems: "center"
  },
  joueur: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  joueurDarkTheme: {
    color: "#fff"
  },
  joueurLightTheme: {
    color: "#252422"
  },
  descriptionContainer: {
    marginHorizontal: 16,
    marginTop: "auto",
    marginBottom: "auto"
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    color: "#BEBEBE",
    fontSize: 14,
    marginBottom: 8
  },
  description: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 32
  },
  descriptionDarkTheme: {
    color: "#fff"
  },
  descriptionLightTheme: {
    color: "#252422"
  },
  statsContainer :{
    margin: 16,
    marginBottom: 24
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  statItemContainer: {
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 2,
    borderRadius: 32,
    width: "32.375%",
    flexDirection: "row",
    alignItems: "center",
  },
  statItemContainerDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  statItemContainerLightTheme: {
    backgroundColor: "#fff",
  },
  iconStatItemContainer: {
    marginRight: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40
  },
  dataStatItemContainer: {
    flex: 1
  },
  titleStatItemContainer: {
    fontFamily: "Poppins-Medium",
    fontSize: 8,
    margin: 0,
    padding: 0,
  },
  textStatItemContainer: {
    fontFamily: "Poppins-Bold",
    fontSize: 16
  },
  textStatItemContainerDarkTheme: {
    color: "#fff",
  },
  textStatItemContainerLightTheme: {
    color: "#252422",
  },
  changeAvatarContainer: {
    alignItems: "center",
    marginBottom: 64
  },
  buttonsContainerChangeAvatar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    width: "100%",
    paddingHorizontal: 16
  },
  buttonWithIcon: {
    flex: 1,
    borderRadius: 32,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7159df",
  },
  wrapperTextIconButton: {
    flexDirection: "row",
    ustifyContent: "center",
    alignItems: "center"
  },
  textIconButton: {
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 12
  },
  resetButton: {
    marginLeft: 4,
    width: 56,
    height: 56,
    backgroundColor: "#7159DF20",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  changeNomContainer: {
    marginHorizontal: 16,
    flexDirection: "row"
  },
  disabledResetButton: {
    display: "none",
  },
  enableResetButton: {

  },
  changeNomInput: {
    height: 64,
    borderRadius: 32,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    borderWidth: 1.5,
    borderRadius: 32,
    borderColor: "#D9D9D9",
  },
  changeNomInputDarkTheme: {
    color: "#fff"
  },
  changeNomInputLightTheme: {
    color: "#252422"
  },
  validerModifButton: {
    marginTop: "auto",
    borderRadius: 32,
    height: 56,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  disabledValiderModifButton: {
    backgroundColor: "#C0C0C0",
  },
  enableValiderModifButton: {
    backgroundColor: "#7159df",
  },
  textValiderModifButton: {
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 16
  },
  button: {
    width: width - 32,
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#7159df",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
})
