import * as React from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeleteAllPartiesComponent from '../Components/DeleteAllPartiesComponent';
import UpdateAllPartiesComponent from '../Components/UpdateAllPartiesComponent';

// Page Paramètres
export default function Parametres({ navigation, route }) {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titrePage}>Paramètres</Text>
      </View>
      <Text style={styles.description}>Un soucis avec l'application ou envie de la partager ? Toutes les informations sont disponibles ici dans les paramètres.</Text>

      <View style={styles.parametresContainer}>
        <View style={styles.parametres}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Partager");
            }}
            style={styles.buttonParametres}
          >
            <View style={{ backgroundColor: "#7159DF", height: 40, width: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
              <Ionicons name='ios-share-social-outline' size={20} color="#fff"/>
            </View>
            <Text style={styles.textButtonParametres}>Partager l'application</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#252422"/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Probleme");
            }}
            style={[ styles.buttonParametres, styles.lastButtonParametres]}
          >
            <View style={{ backgroundColor: "#7159DF", height: 40, width: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
              <Ionicons name='ios-help-outline' size={20} color="#fff"/>
            </View>
            <Text  style={styles.textButtonParametres}>Un problème ?</Text>
            <Ionicons name='ios-chevron-forward-outline' size={20} color="#252422"/>
          </TouchableOpacity>
        </View>
        <UpdateAllPartiesComponent />
        <DeleteAllPartiesComponent />
        <Text style={styles.versionApp}>V.2.1.0 par Alexandre Pouivet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
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
    fontWeight: "bold",
    textAlign: "center",
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
  textButtonParametres: {
    marginLeft: 12,
    marginRight: "auto",
    color: "#252422",
    fontSize: 16,
    fontWeight: '500'
  },
  versionApp: {
    margin: 16,
    marginTop: 0,
    color: "#252422",
    fontSize: 12
  },
})
