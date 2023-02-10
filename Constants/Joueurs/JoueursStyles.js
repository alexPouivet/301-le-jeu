import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  classementButton: {
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#7159DF",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    padding: 16
  },
  crownIcon: {
    position: "absolute",
    top: 4,
    right: 128,
    transform: [{rotate: '45deg'}]
  },
  classementTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Medium"
  },
  classementDescription: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "Poppins-Regular",
    marginTop: 4
  },
  soccerIcon: {
    position: "absolute",
    bottom: -28,
    right: -24
  },
  listEmptyContainer: {
    height:"100%",
    marginTop: 32,
    marginHorizontal: 16
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 16
  },
  listJoueursContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontFamily: "Poppins-Medium",
    color: "#BEBEBE",
    fontSize: 14,
    marginTop: 0,
    marginLeft: 4,
    marginBottom: 8,
  },
  itemJoueurContainer: {
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#F3F3F3",
    borderWidth: 1,
    width: "100%",
    marginBottom: 8
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
  buttonEditSwipeable: {
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#F3F3F3",
  },
  iconButtonSwipeable: {
    marginRight: "auto",
    marginLeft: 20
  },
  wrapperJoueur: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  infosJoueurContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  infosContainer: {
    marginLeft: 12,
  },
  primaryInfosJoueurContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  nomJoueur: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#252422"
  },
  profilJoueurContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: "#7159DF25",
  },
  profilJoueur: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#7159DF",
  },
  profilIconJoueur: {
    marginRight: 2,
  },
  secondaryInfosJoueurContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSecondaryInfosJoueur: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  separatorSecondaryInfosJoueur: {
    paddingHorizontal: 4,
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#252422",
  },
  secondaryInfosJoueurText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#252422",
  },

})
