import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  infosTour: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 32,
    padding: 8
  },
  infosTourDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  infosTourLightTheme: {
    backgroundColor: "#fff",
  },
  listeJoueurs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8
  },
  joueursContainer: {
    width: "30%",
    justifyContent: "center",
  },
  joueurWrapper: {
    alignItems: "center"
  },
  separatorJoueursContainer: {
    width: "5%",
    justifyContent: "center"
  },
  joueurPrecedent: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    width: "75%",
    fontFamily: "Poppins-Regular"
  },
  joueurPrecedentDarkTheme: {
    color: "#fff",
  },
  joueurPrecedentLightTheme: {
    color: "#7159df",
  },
  joueurEnCours: {
    fontSize: 18,
    marginTop: 4,
    textAlign: "center",
    fontFamily: "Poppins-Bold"
  },
  joueurEnCoursDarkTheme: {
    color: "#fff",
  },
  joueurEnCoursLightTheme: {
    color: "#7159df",
  },
  joueurSuivant: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    width: "75%",
    fontFamily: "Poppins-Regular"
  },
  joueurSuivantDarkTheme: {
    color: "#fff",
  },
  joueurSuivantLightTheme: {
    color: "#7159df",
  },
  informationsPartie: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  informationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    width: "49.25%",
    padding: 8,
  },
  informationsContainerDarkTheme: {
    backgroundColor: "#7159df"
  },
  informationsContainerLightTheme: {
    backgroundColor: "#7159df25"
  },
  iconeWrapper: {
    borderRadius: 32,
    padding: 12,
    marginRight: 8
  },
  iconeWrapperDarkTheme: {
    backgroundColor: "#ffffff25",
  },
  iconeWrapperLightTheme: {
    backgroundColor: "#7159DF25",
  },
  textInfosTour: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: "Poppins-Bold",
    marginBottom: -4
  },
  textInfosTourDarkTheme: {
    color: '#fff'
  },
  textInfosTourLightTheme: {
    color: '#7159df'
  },
  textInfosTourLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "Poppins-Regular"
  },
  textInfosTourLabelDarkTheme: {
    color: "#fff",
  },
  textInfosTourLabelLightTheme: {
    color: "#7159df",
  },
  scrollContainer: {
    marginBottom: 78
  },
  inputsContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  inputContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 32,
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row"
  },
  inputContainerDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  inputContainerLightTheme: {
    backgroundColor: "#fff",
  },
  pointsContainer: {
    backgroundColor: "#7159DF25",
    width: 52,
    height: 52,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  textPoints: {
    color: "#7159DF",
    fontSize: 24,
    fontFamily: "Poppins-Bold"
  },
  textsPointsLabel: {
    position: "absolute",
    bottom: 6,
    fontSize: 9,
    color: "#7159DF",
    fontFamily: "Poppins-Regular"
  },
  spinner: {
    width: "50%",
    borderWidth: 0
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
  button: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    justifyContent: "center",
    height: 56,
    borderRadius: 32,
    backgroundColor: "#7159df",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  }
})
