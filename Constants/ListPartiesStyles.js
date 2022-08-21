import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titrePage: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: "auto",
    color: "#252422",
    marginLeft: 16,
  },
  buttonRefresh: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:12,
  },
  buttonFiltres: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight:16,
  },
  dropdownStyle: {
    width: "auto",
    height: "auto",
    marginTop: 12,
    marginRight: -9,
    borderRadius: 10,
    paddingVertical: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.125,
    shadowRadius: 5,
  },
  dropdownTextStyle: {
    marginLeft: 16,
    marginRight: 32,
    marginVertical: 4,
    fontSize: 16
  },
  dropdownTextHighlightStyle: {
    color: "#252422"
  },
  scrollview: {
    width: "100%",
    height: "100%"
  },
  parties: {
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 120
  },
  partieContainer: {
    borderRadius: 16,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.125,
    shadowRadius: 5,
  },
  listEmptyContainer: {
    height:"100%",
    marginTop: 32,
    marginHorizontal: 16
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 16
  },
  swipeable: {
    overflow: "hidden",
    height: "auto",
    borderRadius: 16,
  },
  buttonSupprimerSwipeable: {
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#FF4B3E",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16
  },
  iconButtonSupprimerSwipeable: {
    marginRight: "auto",
    marginLeft: 20
  },
  partie: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "100%",
    flexDirection: "row",
  },
  partieInfosContainer: {
    height: 64,
    width: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  partieFinie: {
    backgroundColor: "#FEC601",
  },
  partieEnCours: {
    backgroundColor: "#7159DF"
  },
  infosContainer: {
    justifyContent: "space-evenly",
    marginLeft: 12,
    width: "60%"
  },
  containerDateAndTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  libeleDateAndTime: {
    color: "#252422",
    fontSize: 16,
  },
  containerJoueurs: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  libeleJoueurs: {
    color: "#252422",
    fontSize: 14,
    marginLeft: 4,
    flex: 1,
  },
  arrowContainer: {
    justifyContent: "center",
    marginLeft: "auto",
  },
})
