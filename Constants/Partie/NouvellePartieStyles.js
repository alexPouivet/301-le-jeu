import { StyleSheet, Dimensions, Platform } from 'react-native';

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  animationContainer: {
    height: 300,
  },
  animation: {
    width: 210,
    height: 210,
    marginLeft: "auto",
    marginRight: "auto"
  },
  description: {
    alignSelf: "center",
    fontSize: 12,
    color: "#252422",
    width: "90%",
    marginTop: "auto",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Poppins-Regular"
  },
  inputsContainer: {
    backgroundColor: "#7159df",
    minHeight: Platform.OS === "android" ? (height/2 - 16) : "100%",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 32,
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 16,
    fontFamily: "Poppins-Bold"
  },
  buttonSpinner: {
    borderRadius:16,
    activityOpacity: 0,
    backgroundColor: "#ffffff"
  },
  inputSpinner: {
    backgroundColor: "#7159df",
    width: 56,
    height: 56,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    fontWeight: "bold",
    fontSize: 30,
    borderColor: "#ffffff",
    borderWidth: 3
  },
  buttonWhite: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    height: 48,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textButton: {
    textAlign: "center",
    color: "#7159df",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
})
