import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  containerStatutPartie: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    borderRadius: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  containerStatutGagnant: {
    backgroundColor: "#FEC601",
  },
  containerStatutPartieEnCours: {
    backgroundColor: "#7159df",
  },
  textStatutPartieContainer: {
    backgroundColor: "#FFFFFF20",
    paddingVertical: 16,
    borderRadius: 16,
    width: "49%"
  },
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    textTransform: 'uppercase',
    fontFamily: "Poppins-Bold"
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "49%",
    backgroundColor: "#FFFFFF20",
    height: "100%",
    borderRadius: 16,
  },
  textDate: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Poppins-Medium"
  },
  containerPodium: {
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  subContainerPodium: {
    width: "94%",
    height: 200,
    flexDirection: "row"
  },
  containerPlacePodium: {
    width: "33%",
    height: "100%",
  },
  secondPlaceTopPodium: {
    height: "60%",
    alignItems: "center"
  },
  secondPlacePodium: {
    height: "40%",
    backgroundColor: "#C0C0C020",
    borderTopLeftRadius: 8,
    borderWidth: 2,
    borderColor: "#C0C0C0",
    borderBottomWidth: 0,
    borderRightWidth: 0
  },
  podiumJoueur: {
    alignItems: "center",
    paddingVertical: 4,
    marginTop: 4,
    marginHorizontal: 4,
    borderRadius: 10
  },
  firstPlaceTopPodium: {
    height: "47.5%",
    alignItems: "center"
  },
  firstPlacePodium: {
    height: "52.5%",
    backgroundColor: "#FEC60120",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: "#FEC601",
    borderBottomWidth: 0
  },
  thirdPlaceTopPodium: {
    height: "70%",
    alignItems: "center"
  },
  thirdPlacePodium: {
    height: "30%",
    backgroundColor: "#C49C4820",
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: "#C49C48",
    borderBottomWidth: 0,
    borderLeftWidth: 0
  },
  podiumJoueurContainer: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 16
  },
  podiumJoueurNom: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  },
  podiumJoueurScore: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  podiumJoueurPoints: {
    color:'#fff',
    fontSize: 11,
    fontFamily: "Poppins-Regular",
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 80,
    borderWidth: 1,
    borderColor: "#f3f3f3"
  },
  joueur: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastJoueur: {
    borderBottomWidth: 0,
  },
  containerClassementJoueur: {
    backgroundColor: '#7159df20',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textClassementJoueur: {
    fontSize: 20,
    color: "#7159df",
    fontFamily: "Poppins-Bold"
  },
  infosClassementJoueur: {
    flexDirection: "row",
    width: "50%",
    marginLeft: 16,
    alignItems: "center"
  },
  textNomJoueur: {
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
    fontWeight: "500",
    color: "#252422",
    fontFamily: "Poppins-Medium"
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#252422",
  },
  containerPointsJoueur: {
    backgroundColor: '#7159df20',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center"
  },
  textPointsJoueur: {
    fontSize: 16,
    color: "#7159df",
    marginBottom: -2,
    fontFamily: "Poppins-Bold"
  },
  libelePointsJoueur: {
    fontSize: 11,
    color: "#7159df",
    fontFamily: "Poppins-Regular"
  },
  containerButton: {
    position: "absolute",
    bottom: 16,
  },
  buttonReprendre: {
    marginLeft: 16,
    marginRight: 16,
    width: width - 32,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  textButtonReprendre: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
})
