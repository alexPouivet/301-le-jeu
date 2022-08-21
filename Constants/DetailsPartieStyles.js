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
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:16,
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#d6d6d6",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 128,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  containerButton: {
    position: "absolute",
    bottom: 48,
  },
  buttonReprendre: {
    marginLeft: 16,
    marginRight: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  textButtonReprendre: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  containerStatutPartie: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
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
  textStatutPartie: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    textTransform: 'uppercase'
  },
  containerDateAndTime: {
    flexDirection: "row",
    marginBottom: 20
  },
  separator: {
    width: 2,
    height: "80%",
    backgroundColor: "#fff",
    marginLeft: 16,
    marginRight: 16
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center"
  },
  partieDate: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
  joueur: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastJoueur: {
    borderBottomWidth: 0,
    marginBottom: 4
  },
  containerClassementJoueur: {
    backgroundColor: '#7159df',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textClassementJoueur: {
    fontSize: 20,
    color: "#fff",
  },
  textNomJoueur: {
    width: "50%",
    fontSize: 16,
    paddingLeft: 16,
    fontWeight: "500",
    color: "#252422",
  },
  textTourJoueur: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#252422",
  },
  containerPointsJoueur: {
    width: "35%",
    alignItems: "center"
  },
  textPointsJoueur: {
    fontSize: 16,
    borderRadius: 10,
    color: "#252422",
  },
  libelePointsJoueur: {
    fontSize: 12,
    fontWeight: "500",
    color: "#BEBEBE",
    marginTop: 2
  },
  containerPodium: {
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  subContainerPodium: {
    width: "90%",
    height: 150,
    flexDirection: "row"
  },
  containerPlacePodium: {
    width: "32.5%",
    height: "100%",
  },
  secondPlaceTopPodium: {
    height: "50%",
    alignItems: "center"
  },
  secondPlacePodium: {
    height: "50%",
    backgroundColor: "#C0C0C0",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  podiumJoueur: {
    alignItems: "center",
    paddingTop: 8
  },
  firstPlaceTopPodium: {
    height: "35%",
    alignItems: "center"
  },
  firstPlacePodium: {
    height: "65%",
    backgroundColor: "#FEC601",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  thirdPlaceTopPodium: {
    height: "60%",
    alignItems: "center"
  },
  thirdPlacePodium: {
    height: "40%",
    backgroundColor: "#C49C48",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  podiumJoueurNom: {
    marginTop: "auto",
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "500"
  },
  podiumJoueurScore: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  podiumJoueurPoints: {
    color:'#fff',
    fontSize: 12
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#d6d6d6",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 128,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
})
