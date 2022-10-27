import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parametresContainer: {
    height: "100%",
    width: "100%",
  },
  parametres: {
    backgroundColor: "#ffffff",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
  container: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
  buttonParametres: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  lastButtonParametres: {
    borderBottomWidth: 0,
  },
  iconButtonParametres: {
    backgroundColor: "#7159DF25",
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonParametres: {
    marginLeft: 12,
    marginRight: "auto",
    color: "#252422",
    fontSize: 16,
  },
  text16: {
    fontSize: 16
  },
  marginText12: {
    marginTop: 12,
  },
  versionApp: {
    margin: 16,
    marginTop: 12,
    color: "#252422",
    fontSize: 12,
  },
  partagerImage: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 12,
    width: 300,
    height: 300,
  },
  partagerButton: {
    alignItems: "center",
    borderRadius: 10,
    height: 48,
    backgroundColor: "#7159df",
    marginTop: 12,
    flexDirection: "row",
  },
  partagerTextButton: {
    marginLeft: 10,
    marginRight: "auto",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
  button: {
    borderRadius: 10,
    marginTop: 12,
		height: 48,
		justifyContent: "center",
    marginBottom: 32,
    backgroundColor: "#FF4B3E",
  },
  buttonUpdate: {
    height: 48,
		justifyContent: "center",
    borderRadius: 10,
		marginTop: 12,
    marginBottom: 32,
    backgroundColor: "#7159DF",
  },
  textButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
})
