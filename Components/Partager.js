import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Svg, { G, Path, Rect,Circle, Polyline, Line } from 'react-native-svg';

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
          <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#24334C" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Polyline points="15 6 9 12 15 18" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titrePage}>Paramètres</Text>
      </View>
      <View style={styles.subTitrePage}>
        <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <Circle cx="6" cy="12" r="3" />
          <Circle cx="18" cy="6" r="3" />
          <Circle cx="18" cy="18" r="3" />
          <Line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
          <Line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
        </Svg>
        <Text style={styles.description}>Partager l'application</Text>
      </View>

      <View style={styles.parametresContainer}>
        <View style={styles.parametres}>
          <Text style={styles.text}>Pour partager l'application, utilisez le qr-code ou le lien partageable situés ci-dessous :</Text>
          <Text style={[styles.text, styles.marginText]}><B>Partager par lien :</B></Text>
          <TouchableOpacity
            style={styles.buttonPartager}
            onPress={shareLink}
            title="Partager l'application"
          >
            <Text style={{marginLeft: "auto", marginRight: 10, textAlign: "center", color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Partager l'application</Text>
            <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" style={{marginRight: "auto"}}>
              <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <Circle cx="6" cy="12" r="3" />
              <Circle cx="18" cy="6" r="3" />
              <Circle cx="18" cy="18" r="3" />
              <Line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
              <Line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
            </Svg>
          </TouchableOpacity>
          <Text style={[styles.text, styles.marginText]}><B>QR-code :</B></Text>
          <Image
          style={styles.image}
          source={
            require('../images/illustrations/qrcode.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:20,
    backgroundColor: "#FFFFFF",
    width: "100%"
  },
  buttonPartager: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7159df",
    flexDirection: "row"
  },
  description: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    color: "#24334c"
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 220,
    height: 220,
    marginBottom: 10
  },
  buttonParametres: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textButtonParametres: {
    marginLeft: 15,
    marginRight: "auto",
    color: "#24334c",
    fontSize: 18
  },
  parametresContainer: {
    backgroundColor: "#f3f3f3",
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
    height: "100%",
    width: "100%",
    marginTop: 40
  },
  parametres: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    width: "100%",
    marginTop: 30,
    padding: 20

  },
  versionApp: {
    margin: 20,
    color: "#24334c",
    fontSize: 18
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center"
  },
  buttonRetour: {
    width: 42,
    height: 42,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft:20,
  },
  titrePage: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "70%",
    color: "#24334c",
  },
  subTitrePage: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  marginText: {
    marginTop: 40,
    textAlign: "center"
  }
})
