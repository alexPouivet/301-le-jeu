import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  containerStatutPartie: {
    marginHorizontal: 16,
    marginTop: -8,
    marginBottom: 32
  },
  textStatutPartieContainer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    width: "49.25%",
    backgroundColor: "#fff"
  },
  iconePartieEnCoursWrapper: {
    backgroundColor: "#7159df20",
    borderRadius: 32,
    padding: 12
  },
  iconePartieTermineeWrapper: {
    backgroundColor: "#FEC60120",
    borderRadius: 32,
    padding: 12
  },
  iconePaletsWrapper: {
    backgroundColor: "#BEBEBE20",
    borderRadius: 32,
    padding: 12
  },
  textStatutPartie: {
    marginLeft: 8,
    fontSize: 12,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    color: "#BEBEBE"
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
    marginBottom: 6
  },
  textDate: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#252422",
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
    borderTopLeftRadius: 20,
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#C0C0C0",
    borderBottomWidth: 0,
    borderRightWidth: 0
  },
  podiumJoueur: {
    alignItems: "center",
    paddingVertical: 4,

    marginTop: 4,
    marginHorizontal: 4,
    borderRadius: 16
  },
  firstPlaceTopPodium: {
    height: "47.5%",
    alignItems: "center"
  },
  firstPlacePodium: {
    height: "52.5%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
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
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  containerJoueurs: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 88,
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
    borderRadius: 32,
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
  containerPointsJoueur: {
    backgroundColor: '#7159df20',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center"
  },
  textPointsJoueur: {
    fontSize: 16,
    color: "#7159df",
    marginBottom: -2,
    fontFamily: "Poppins-Bold"
  },
  libelePointsJoueur: {
    fontSize: 10,
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
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#7159df",
  },
  textButtonReprendre: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
})
