import { StyleSheet, Dimensions, Platform } from 'react-native';

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center"
  },
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
    fontSize: 14,
    color: "#252422",
    marginLeft: 16,
    marginTop: "auto",
    marginBottom: 24,
    marginRight: 16,
    textAlign: "center",
  },
  inputsContainer: {
    backgroundColor: "#7159df",
    minHeight: Platform.OS === "android" ? (height/2 - 16) : "100%",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 32,
  },
  inputsGreyContainer: {
    minHeight: Platform.OS === "android" ? (height/2 - 80) : "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 64,
    backgroundColor: "#F3F3F3",
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 16,
  },
  errorText: {
    width: "80%",
    textAlign: "center",
    marginBottom: 10,
    color: "#FF4B3E"
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
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textButton: {
    textAlign: "center",
    color: "#7159df",
    fontSize: 18,
    fontWeight: "bold"
  },
  inputContainer: {
    width: "100%",
  },
  textInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#24334c",
    paddingBottom: 10,
    textAlign: "center"
  },
  input: {
    marginLeft: 16,
    marginRight: 16,
    height: 48,
    borderWidth: 3,
    borderColor: "#7159df",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#FFFFFF'
  },
  button: {
    position: "absolute",
    marginLeft: 16,
    marginRight: 16,
    bottom: 16,
    width: width - 32,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
  },
  textButtonWhite: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  }
})
