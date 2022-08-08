import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Page Détails d'une partie
export default function Partager({ navigation, route }) {

  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: 'https://drive.google.com/drive/u/0/folders/1PfY16dfE2wGjwcjl7Rn25N7q1pHfpdLk',
        url:
          'https://drive.google.com/drive/u/0/folders/1PfY16dfE2wGjwcjl7Rn25N7q1pHfpdLk',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
        <Text style={styles.titrePage}>Partager l'application</Text>
      </View>

      <View style={styles.parametresContainer}>
        <Text style={styles.text}>Pour partager l'application, utilisez le qr-code ou le lien partageable situés ci-dessous :</Text>
        <Image
        style={styles.image}
        source={
          require('../assets/images/qrcode.png')}
        />
      </View>
      <TouchableOpacity style={styles.buttonPartager} onPress={shareLink} title="Partager l'application">
          <Ionicons name='ios-share-social-outline' size={20} color="#fff" style={{marginLeft: "auto"}}/>
          <Text style={{marginLeft: 10, marginRight: "auto", textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "500" }}>Partager l'application</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%"
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
  titrePage: {
    fontSize: 20,
    marginLeft:16,
    fontWeight: "bold",
    color: "#252422",
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
  text: {
    fontSize: 16,
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    width: 300,
    height: 300,
  },
  buttonPartager: {
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#7159df",
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
  },
})
