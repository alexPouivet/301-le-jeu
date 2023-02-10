import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  switchSelector : {
    marginHorizontal: 16,
    marginBottom: 24
  },
  switchText: {
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Poppins-Medium"
  },
  switchSelectedText: {
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Poppins-Medium"
  },
  classementHeadTable: {
    flexDirection: "row",
    paddingHorizontal: 28,
    marginBottom: 12
  },
  classementHeadPositionCol: {
    marginLeft: 4,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#BEBEBE",
    textTransform: "uppercase"
  },
  classementHeadJoueurCol: {
    marginLeft: 84,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#BEBEBE",
    textTransform: "uppercase"
  },
  classementHeadSwitchValueCol: {
    marginLeft: "auto",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#BEBEBE",
    textTransform: "uppercase"
  },
  classementBodyContainer: {
    paddingHorizontal: 16
  },
  classementNumberContainer: {
    height: 40,
    width: 40,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  classementNumberOneContainer: {
    backgroundColor: '#FFAD0820',
  },
  classementNumberTwoContainer: {
    backgroundColor: '#C0C0C020',
  },
  classementNumberThreeContainer: {
    backgroundColor: '#C49C4820',
  },
  classementNumberOtherContainer: {
    backgroundColor: '#7159df20',
  },
  classementNumberText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold"
  },
  classementNumberOneText: {
    color: "#FFAD08",
  },
  classementNumberTwoText: {
    color: "#C0C0C0",
  },
  classementNumberThreeText: {
    color: "#C49C48",
  },
  classementNumberOtherText: {
    color: "#7159df",
  }
})
