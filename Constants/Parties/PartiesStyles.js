import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  switchSelector : {
    marginHorizontal: 16,
    marginBottom: 8
  },
  switchText: {
    textTransform: "uppercase",
    fontSize: 12,
    marginLeft: 8,
    fontFamily: "Poppins-Medium"
  },
  switchSelectedText: {
    textTransform: "uppercase",
    fontSize: 12,
    marginLeft: 8,
    fontFamily: "Poppins-Medium"
  },
  listEmptyContainer: {
    height: "80%",
    marginHorizontal: 16,
  },
  listEmptyText: {
    marginTop: 48,
    color: "#252422",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
  partiesContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    textTransform: "capitalize",
    color: "#BEBEBE",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
    marginBottom: 16,
  },
  itemPartieContainer: {
    borderRadius: 32,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  swipeable: {
    overflow: "hidden",
    height: "auto",
    borderRadius: 32,
  },
  buttonSupprimerSwipeable: {
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#FF4B3E",
  },
  iconButtonSupprimerSwipeable: {
    marginRight: "auto",
    marginLeft: 20
  },
  wrapperPartie: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  statutPartieContainer: {
    height: 48,
    width: 48,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  partieFinie: {
    backgroundColor: "#FEC60125",
  },
  partieEnCours: {
    backgroundColor: "#7159DF25"
  },
  infosPartieContainer: {
    justifyContent: "space-evenly",
    marginLeft: 12,
    width: "60%"
  },
  containerDateAndTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },
  libeleDateAndTime: {
    color: "#252422",
    fontSize: 12,
    fontFamily: "Poppins-Medium"
  },
  containerJoueurs: {
    flexDirection: "row",
    width: "100%"
  },
  statutPartieText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#BEBEBE",
  },
  containerGagnant: {
    flexDirection: "row",
    alignItems: "center",
  },
  gagnantPartieText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#BEBEBE",
    marginLeft: 4
  },
  separatorGagnantPartie: {
    paddingHorizontal: 2,
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#BEBEBE",
  },
  avatarContainer: {
    marginRight: -8
  },
  arrowContainer: {
    justifyContent: "center",
    marginLeft: "auto",
  },
})
