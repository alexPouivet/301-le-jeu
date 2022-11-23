import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  switchSelector : {
    marginHorizontal: 16,
    marginBottom: 8
  },
  switchText: {
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Poppins-Medium"
  },
  switchSelectedText: {
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Poppins-Medium"
  },
  listEmptyContainer: {
    height:"100%",
    marginTop: 32,
    marginHorizontal: 16
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
  partiesContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    textTransform: "capitalize",
    color: "#BEBEBE",
    fontSize: 14,
    marginTop: 0,
    marginBottom: 8,
  },
  itemPartieContainer: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 8,
    borderStyle: "solid",
    borderColor: "#F3F3F3",
    borderWidth: 1
  },
  swipeable: {
    overflow: "hidden",
    height: "auto",
    borderRadius: 10,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  statutPartieContainer: {
    height: 56,
    width: 56,
    borderRadius: 10,
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
    marginBottom: 10
  },
  libeleDateAndTime: {
    color: "#252422",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
  containerJoueurs: {
    flexDirection: "row",
    width: "100%"
  },
  avatarContainer: {
    marginRight: -8
  },
  arrowContainer: {
    justifyContent: "center",
    marginLeft: "auto",
  },
})
