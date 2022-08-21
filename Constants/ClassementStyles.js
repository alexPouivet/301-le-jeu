import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
    alignItems: "center"
  },
  containerJoueurs: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 96,
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
    bottom: 16,
    flexDirection: "row"
  },
  button: {
    marginLeft: 16,
    marginRight: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  buttonContinuer: {
    marginLeft: 4,
    marginRight: 16,
    width: (width / 2) - 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  buttonArreter: {
    marginLeft: 16,
    marginRight: 4,
    width: (width / 2) - 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#B9B9B9",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  }
})
