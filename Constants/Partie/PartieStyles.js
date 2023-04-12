import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  infosTour: {
    backgroundColor: "#fff",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 32,
    padding: 8
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
    color: "#7159df",
    textAlign: "center",
    marginTop: 4,
    width: "75%",
    fontFamily: "Poppins-Regular"
  },
  joueurEnCours: {
    fontSize: 18,
    color: "#7159df",
    marginTop: 4,
    textAlign: "center",
    fontFamily: "Poppins-Bold"
  },
  joueurSuivant: {
    fontSize: 12,
    color: "#7159df",
    textAlign: "center",
    marginTop: 4,
    width: "75%",
    fontFamily: "Poppins-Regular"
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
    backgroundColor: "#7159df25"
  },
  iconeWrapper: {
    backgroundColor: "#7159DF25",
    borderRadius: 32,
    padding: 12,
    marginRight: 8
  },
  textInfosTour: {
    fontSize: 20,
    color: '#7159df',
    fontFamily: "Poppins-Bold",
    marginBottom: -4
  },
  textInfosTourLabel: {
    fontSize: 11,
    color: "#7159df",
    fontFamily: "Poppins-Regular"
  },
  scrollContainer: {
    marginBottom: 70
  },
  inputsContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  inputContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 32,
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row"
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
    backgroundColor: "#fff",
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
