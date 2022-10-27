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
  itemJoueurContainer: {
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#F3F3F3",
    borderWidth: 1,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
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
  profilJoueur: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#C0C0C0", 
    marginLeft: 4
  }
})
