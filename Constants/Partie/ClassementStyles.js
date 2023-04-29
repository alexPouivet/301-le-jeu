import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  containerJoueurs: {
    borderRadius: 24,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 96,
  },
  containerJoueursDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  containerJoueursLightTheme: {
    backgroundColor: "#ffffff",
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
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#7159df",
  },
  buttonContinuer: {
    marginLeft: 4,
    marginRight: 16,
    width: (width / 2) - 20,
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#7159df",
  },
  buttonArreter: {
    marginLeft: 16,
    marginRight: 4,
    width: (width / 2) - 20,
    height: 56,
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#7159df25",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
  textButtonArreter: {
    textAlign: "center",
    color: "#7159df",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  }
})
