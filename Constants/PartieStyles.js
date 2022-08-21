import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  titrePage: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20,
    color: "#252422",
  },
  buttonClassement: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 2,
    marginRight: 16
  },
  infosTour: {
    backgroundColor: "#7159df",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    padding: 8
  },
  listeJoueurs: {
    flexDirection: "row",
    justifyContent: "center"
  },
  joueursContainer: {
    width: "33%",
    justifyContent: "center"
  },
  joueurPrecedent: {
    fontSize: 14,
    color: "#fff",
    textAlign: "right",
  },
  joueurEnCours: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  joueurSuivant: {
    fontSize: 14,
    color: "#fff",
    textAlign: "left",
  },
  horizontalSeparator: {
    width: "15%",
    height: 2,
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    marginTop: 8
  },
  informationsPartie: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  informationsPalets: {
    flexDirection: "row",
    alignItems: "center"
  },
  paletsTextsContainer: {
    marginLeft: 4
  },
  textInfosTour: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  textInfosTourLabel: {
    fontSize: 12,
    color: "#fff"
  },
  verticalSeparator: {
    width: 2,
    height: "80%",
    backgroundColor: "#fff",
    marginLeft: 16,
    marginRight: 16
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
    fontSize: 28
  },
  textsPointsLabel: {
    position: "absolute",
    bottom: 4,
    fontSize: 11,
    color: "#C0C0C0"
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
    fontWeight: "bold",
    fontSize: 30,
    borderColor: "#7159df",
    borderWidth: 3
  },
  button: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  }
})
