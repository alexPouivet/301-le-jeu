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
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 96,
    borderWidth: 1,
    borderColor: "#f3f3f3"
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
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  buttonContinuer: {
    marginLeft: 4,
    marginRight: 16,
    width: (width / 2) - 20,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  buttonArreter: {
    marginLeft: 16,
    marginRight: 4,
    width: (width / 2) - 20,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#C0C0C0",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  }
})
