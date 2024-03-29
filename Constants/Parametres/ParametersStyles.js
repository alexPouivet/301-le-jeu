import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width;

export default StyleSheet.create({
  parametresContainer: {
    height: "100%",
    width: "100%",
  },
  parametres: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 32,
  },
  parametresDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  parametresLightTheme: {
    backgroundColor: "#ffffff",
  },
  container: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    borderRadius: 32,
  },
  containerDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  containerLightTheme: {
    backgroundColor: "#fff",
  },
  buttonParametres: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderBottomWidth: 0.25,
    borderBottomColor: "#D9D9D9",
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  lastButtonParametres: {
    borderBottomWidth: 0,
  },
  iconButtonParametres: {
    height: 48,
    width: 48,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconButtonParametresDarkTheme: {
    backgroundColor: "#7159DF40",
  },
  iconButtonParametresLightTheme: {
    backgroundColor: "#7159DF25",
  },
  textButtonParametres: {
    marginLeft: 12,
    marginRight: "auto",
    fontSize: 13,
    fontFamily: "Poppins-Medium",
  },
  textButtonParametresDarkMode: {
    color: "#fff"
  },
  textButtonParametresLightMode: {
    color: "#252422"
  },
  text16: {
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },
  text16DarkTheme: {
    color: "#fff",
  },
  text16LightTheme: {
    color: "#252422",
  },
  marginText12: {
    marginTop: 12,
  },
  containerVersionApp: {
    marginTop: -8,
    marginLeft: 32,
    flexDirection: "row",
  },
  containerSubtitle: {
    marginLeft: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#C0C0C0",
    textTransform: "uppercase"
  },
  logTitreApp: {
    marginRight: 4,
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "Poppins-Medium",
  },
  logTitreAppDarkTheme: {
    color: "#fff",
  },
  logTitreAppLightTheme: {
    color: "#252422",
  },
  logVersionAppContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 4,
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
    fontFamily: "Poppins-Regular"
  },
  logDescriptionAppDarkTheme: {
    color: "#fff",
  },
  logDescriptionAppLightTheme: {
    color: "#252422",
  },
  logContainer: {
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
    padding: 24,
    borderRadius: 32,
  },
  logContainerDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  logContainerLightTheme: {
    backgroundColor: "#fff",
  },
  titreContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  versionApp: {
    color: "#C0C0C0",
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
    borderRadius: 32,
    height: 56,
    backgroundColor: "#7159df",
    marginTop: 12,
    flexDirection: "row",
  },
  partagerButtonWrap: {
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row"
  },
  partagerTextButton: {
    marginLeft: 12,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },
  button: {
    borderRadius: 32,
    marginTop: 12,
		height: 56,
		justifyContent: "center",
    marginBottom: 32,
    backgroundColor: "#FF4B3E",
  },
  buttonUpdate: {
    height: 56,
		justifyContent: "center",
    borderRadius: 32,
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
  containerList: {
    flex: 1
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    width: width,
    paddingHorizontal: 16,
    marginBottom: 46,
  },
  itemWrap: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 64,
    borderRadius: 32
  },
  itemWrapDarkTheme: {
    backgroundColor: "#3C3C3C",
  },
  itemWrapLightTheme: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 4/7,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  image: {
    width: width - 96,
    resizeMode: "contain",
  },
  descriptionContainer: {
    flex: 3/7,
    alignItems: "center"
  },
  itemTitle: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  itemTitleDarkTheme: {
    color: "#fff"
  },
  itemTitleLightTheme: {
    color: "#252422"
  },
  itemDescription: {
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Poppins-Regular",
  },
  itemDescriptionDarkTheme: {
    color: "#fff"
  },
  itemDescriptionLightTheme: {
    color: "#252422"
  },
  dotContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dotStyles: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
})
