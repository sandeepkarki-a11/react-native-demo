import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import firebase from "react-native-firebase";

export default class SplashScreen extends Component {
   constructor(props) {
    super(props);
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };

  async componentDidMount() {
   
    const data = await this.performTimeConsumingTask();
    // const { currentUser } = firebase.auth();
    // this.setState({ currentUser });
    // //const user = firebase.auth().currentUser;
    // console.log("user: " + currentUser);
    
    firebase.auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user && data !== null ? 'App' : 'Auth');

      
      // if (user.emailVerified === true && data !== null) {
      //   this.props.navigation.navigate("App");
      // } else if (user.emailVerified === false && data !== null) {
      //   this.props.navigation.navigate("VerificationScreen");
      // } else {
      //   this.props.navigation.navigate("Auth");
      // }
    });
  }

  configGmailSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "173381546713-2iuu7kfsvmngut35kq36emsi9mab535p.apps.googleusercontent.com",
      offlineAccess: true,
      hostedDomain: "",
      forceConsentPrompt: true
    });
  };

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{ height: 100, width: wp("75%"), resizeMode: "contain" }}
          source={require("../images/logo_large.png")}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
};
