import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    height: "100%"
  },
  buttonsHeaderContainer: {
    margin: 16,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLeft: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  buttonRight: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  buttonEmpty: {
    width: 48
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
    marginBottom: 24,
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
    fontSize: 14,
    marginLeft: 4
  },
  inputAddPlayerContainer: {
    borderWidth: 1.5,
    borderColor: "#D9D9D9",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 8,
    borderRadius: 32,
  },
  inputAddPlayer: {
    height: 64,
    paddingLeft: 16,
    fontSize: 16,
    width: "85%",
  },
  inputAddPlayerFull: {
    height: 64,
    paddingLeft: 16,
    fontSize: 16,
    width: "100%",
  },
  addPlayerButton: {
    width: 48,
    height: 48,
    backgroundColor: "#7159df",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  addPlayerButtonNone: {
    display: "none"
  },
  errorText: {
    marginTop: 8,
    color: "#FF4B3E"
  },
})
