import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  infosTour: {
    backgroundColor: "#7159df",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
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
  separatorJoueursContainer: {
    width: "5%",
    justifyContent: "center"
  },
  joueurPrecedent: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
    width: "75%"
  },
  joueurEnCours: {
    fontSize: 18,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
  },
  joueurSuivant: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
    width: "75%"
  },
  informationsPartie: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  informationsPalets: {
    alignItems: "center",
    borderRadius: 16,
    width: "49%",
    paddingVertical: 8,
    backgroundColor: "#ffffff20"
  },
  textInfosTour: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: "Poppins-Bold"
  },
  textInfosTourLabel: {
    fontSize: 11,
    color: "#fff",
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
    width: "100%",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row"
  },
  pointsContainer: {
    backgroundColor: "#fff",
    width: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  textPoints: {
    color: "#7159DF",
    fontSize: 28,
    fontFamily: "Poppins-Bold"
  },
  textsPointsLabel: {
    position: "absolute",
    bottom: 4,
    fontSize: 10,
    color: "#C0C0C0",
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
    width: 56,
    height: 56,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    fontSize: 30,
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
    height: 48,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  }
})
