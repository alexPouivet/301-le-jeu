import { StyleSheet, Dimensions, Platform } from 'react-native';

let height = Dimensions.get("screen").height;
let width = Dimensions.get("screen").width;

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
    height: "84.5%",
    paddingHorizontal: 16,
  },
  itemJoueur: {
    borderStyle: "solid",
    borderRadius: 10,
    padding: 12,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#7159df"
  },
  notSelected: {
    borderWidth: 2,
    borderColor: "#F3F3F3"
  },
  wrapperItemJoueur: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  nomItemJoueur: {
    marginTop: 4,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#252422",
    textAlign: "center",
    width: "100%"
  },
  button: {
    position: "absolute",
    marginHorizontal: 16,
    bottom: 16,
    width: width - 32,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonAvailable: {
    backgroundColor: "#7159df",
  },
  buttonDisabled: {
    backgroundColor: "#B9B9B9",
  },
  textButtonWhite: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  }
})
