import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  buttonContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between"
  },
  buttonFiltres: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:16,
  },
  dropdownStyle: {
    width: "auto",
    height: "auto",
    marginTop: Platform.OS === "android" ? -16 : 12,
    marginRight: -9,
    borderRadius: 10,
    paddingVertical: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.125,
    shadowRadius: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    marginVertical: 10,
    fontSize: 16,
    alignItems: "center",
    color: "#252422"
  },
  dropdownTextStyle: {
    marginLeft: 10,
    fontSize: 14,
    color: "#252422"
  },
  infosJoueurContainer: {
    alignItems: "center"
  },
  joueur: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    color: "#BEBEBE",
    fontSize: 14,
    marginBottom: 4
  },
  statsContainer :{
    margin: 16,
    marginBottom: 48
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 4
  },
  statItemContainer: {
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 2,
    borderRadius: 10,
    width: "32%",
    flexDirection: "row",
    alignItems: "center",
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
    lineHeight: 0,
    margin: 0,
    padding: 0,
  },
  textStatItemContainer: {
    fontFamily: "Poppins-Bold",
    color: "#252422",
    fontSize: 16
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
    borderRadius: 10,
    height: 48,
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
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 12
  },
  resetButton: {
    marginLeft: 4,
    width: 48,
    height: 48,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  changeNomContainer: {
    marginHorizontal: 16,
    flexDirection: "row"
  },
  changeNomInput: {
    height: 48,
    borderRadius: 10,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    backgroundColor: '#F3F3F3'
  },
  validerModifButton: {
    marginTop: "auto",
    borderRadius: 10,
    height: 48,
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
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    fontSize: 16
  },
  button: {
    width: width - 32,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
})
