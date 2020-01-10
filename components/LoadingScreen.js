import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
      //  isVerified: ''
    };
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 10000)
    );
  };
  async componentDidMount() {
    // currentUser = firebase.auth();
    console.log(
      "current user:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; ",
      currentUser
    );
    this.setState({ currentUser }, () => {
      // console.log('state is: ', this.state.currentUser)

      this.saveVerifiedStatus();
    });
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      // logoutFirebase = () => {
      //   GoogleSignin.revokeAccess();
      //   GoogleSignin.signOut();
      //   firebase.auth().signOut();
      //   AsyncStorage.clear();
      // };
      this.props.navigation.navigate('LoginScreen');
    }
  }
  async saveVerifiedStatus() {
    try {
      //console.log('email verified::::::::: ', JSON.stringify(this.state.currentUser._user.emailVerified));
      await AsyncStorage.setItem(
        "@isVerified",
        JSON.stringify(this.state.currentUser._user.emailVerified)
      );
      console.log("stateData= " + (await AsyncStorage.getItem("@isVerified")));
    } catch (e) {
      //saving error
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>
          {" "}
          Email verification is on process, Please check your email and Login
          again...
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 50,
    alignItems: "center"
  }
});
