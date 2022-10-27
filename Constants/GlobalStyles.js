import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonsHeaderContainer: {
    margin: 16,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLeft: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonRight: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonIcon: {
    alignSelf: "center",
    textAlign: "center"
  },
  buttonsTextHeaderContainer: {
    flexDirection: "row",
    margin: 16,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonLeftTextContainer: {
    flexDirection: "row",
    margin: 16,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "space-between"
  },
  textHeaderContainer: {
    width: "100%",
    marginBottom: 16,
  },
  textHeaderTitle: {
    fontSize: 20,
    color: "#252422",
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  },
  addPlayerContainer: {
    marginHorizontal: 16,
    marginBottom: 8
  },
  addPlayerTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 14
  },
  inputAddPlayerContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputAddPlayer: {
    height: 48,
    borderRadius: 10,
    paddingLeft: 16,
    fontSize: 16,
    width: "85%",
    backgroundColor: '#F3F3F3'
  },
  addPlayerButton: {
    width: 48,
    height: 48,
    backgroundColor: "#7159df",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    marginTop: 8,
    color: "#FF4B3E"
  },
})
