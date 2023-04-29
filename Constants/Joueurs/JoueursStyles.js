import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  classementButton: {
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#7159DF",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 16
  },
  crownIcon: {
    position: "absolute",
    top: 20,
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
    height:"60%",
    marginHorizontal: 16,
    justifyContent: 'center'
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 16
  },
  listEmptyTextDarkTheme: {
    color: "#fff"
  },
  listEmptyTextLightTheme: {
    color: "#252422"
  },
  listJoueursContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontFamily: "Poppins-Medium",
    color: "#BEBEBE",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
    marginBottom: 16,
  },
  itemJoueurContainer: {
    borderRadius: 32,
    width: "100%",
    marginBottom: 8,
  },
  itemJoueurContainerDarkTheme: {
    backgroundColor: "#3C3C3C"
  },
  itemJoueurContainerLightTheme: {
    backgroundColor: "#fff"
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
  buttonEditSwipeable: {
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#C0C0C0",
  },
  iconButtonSwipeable: {
    marginRight: "auto",
    marginLeft: 20
  },
  wrapperJoueur: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
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
    fontSize: 12,
  },
  nomJoueurDarkTheme: {
    color: "#fff"
  },
  nomJoueurLightTheme: {
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
    marginLeft: 2
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
    color: "#C0C0C0",
  },
  secondaryInfosJoueurText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#C0C0C0",
    marginLeft: 4
  },

})
