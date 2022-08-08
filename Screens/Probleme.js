import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Page Détails d'une partie
export default function Probleme({ navigation, route }) {

  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='ios-chevron-back-outline' size={28} color="#252422"/>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Un problème ?</Text>
      </View>

      <View style={styles.parametresContainer}>
        <Text style={styles.text}>Un problème concernant le fonctionnement de l'application et ce n'est pas normal ?</Text>
        <Text style={[styles.text, styles.marginText]}>En cas de problème, contactez moi directement : </Text>
        <Text style={[styles.text, styles.marginText]}>Par message au <B>07-52-67-88-47</B></Text>
        <Text style={[styles.text, styles.marginText]}>Par mail: <B>pouivet.alexandre@gmail.com</B></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  buttonContainer: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row",
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
  titrePage: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#252422",
  },
  parametresContainer: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    backgroundColor: "#fff",
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
  text: {
    fontSize: 16,
  },
  marginText: {
    marginTop: 12
  }
})
