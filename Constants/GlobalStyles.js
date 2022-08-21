import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 12,
    alignItems: "center"
  },
  titrePage: {
    fontSize: 20,
    marginLeft: 16,
    color: "#252422",
  },
  description: {
    marginLeft: 16,
    marginRight:16,
    textAlign: 'left',
    fontSize: 14,
    color: "#252422"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:16,
  },
  buttonSupprimer: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:16,
  },
  parametresContainer: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  Text16: {
    fontSize: 16
  },
  marginText12: {
    marginTop: 12,
  },
  partagerImage: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    width: 300,
    height: 300,
  },
  partagerButton: {
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#7159df",
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
  },
  partagerTextButton: {
    marginLeft: 10,
    marginRight: "auto",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500"
  },
})
