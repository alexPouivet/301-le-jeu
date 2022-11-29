import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  nomJoueur: {
    marginLeft: 12,
    fontFamily: "Poppins-Medium",
    fontSize: 14, color: "#252422"
  },
  profilJoueurContainer: {
    marginLeft: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: "#f3f3f3",
  },
  profilJoueur: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#C0C0C0",
  }
})
