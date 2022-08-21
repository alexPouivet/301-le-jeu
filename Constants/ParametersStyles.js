import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parametresContainer: {
    height: "100%",
    width: "100%",
    marginTop: 32
  },
  parametres: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#d6d6d6",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonParametres: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  lastButtonParametres: {
    borderBottomWidth: 0,
    marginBottom: 4,
  },
  iconButtonParametres: {
    backgroundColor: "#7159DF",
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
  versionApp: {
    margin: 16,
    marginTop: 0,
    color: "#252422",
    fontSize: 12
  },
})
