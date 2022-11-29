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
  containerVersionApp: {
    margin: 16,
    marginTop: 12,
    flexDirection: "row",
  },
  logTitreApp: {
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "Poppins-Medium",
    color: "#252422",
  },
  logVersionAppContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: "#7159DF25",
  },
  logVersionApp: {
    fontSize: 10,
    color: "#7159DF",
    alignSelf: "center",
    fontFamily: "Poppins-Medium"
  },
  logSpecialContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: "#f3f3f3",
  },
  logSpecial: {
    fontSize: 10,
    color: "#252422",
    fontFamily: "Poppins-Medium"
  },
  logDate: {
    marginTop:4,
    fontSize: 12,
    color: "#BEBEBE",
    fontFamily: "Poppins-Regular"
  },
  logDescriptionApp: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#252422",
  },
  logContainer: {
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
    padding: 24,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
  titreContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    gap: 4
  },
  versionApp: {
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
