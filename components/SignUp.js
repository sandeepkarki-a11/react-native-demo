/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import { Card, CardItem } from "native-base";
import firebase from "react-native-firebase";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onClickListner = this.onClickListner.bind(this);
    this.state = {
      email: "",
      Password: "",
      errorMessage: null
    };
  }

  handleSignUp = () => {
    // Firebase stuff...
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => this.props.navigation.navigate("HomeScreen")
        //   //this.sendEmailVerification;
        //   firebase
        //     .auth()
        //     .currentUser.sendEmailVerification()
        //     .then(() => this.logout())
        // //.then(() => this.props.navigation.navigate("LoginScreen"))
      )
      .catch(error => {
        switch (error.code) {
          case "auth/email-already-in-use":
            ToastAndroid.show(
              "Email address ${this.state.email} already in use.",
              ToastAndroid.SHORT
            );
          case "auth/invalid-email":
            ToastAndroid.show(
              "Email address ${this.state.email} is invalid.",
              ToastAndroid.SHORT
            );

          case "auth/operation-not-allowed":
            ToastAndroid.show("Error during sign up.", ToastAndroid.SHORT);

          case "auth/weak-password":
            ToastAndroid.show(
              "Password is not strong enough. Add additional characters including special characters and numbers.",
              ToastAndroid.SHORT
            );

          default:
            ToastAndroid.show("" + error.message, ToastAndroid.SHORT);
        }
      });
  };

  logout() {
    // GoogleSignin.revokeAccess();
    // GoogleSignin.signOut();
    // firebase.auth().signOut();
  }
  sendEmailVerification = () => {
    console.log("hello.......");

    firebase
      .auth()
      .currentUser.sendEmailVerification(actionCodeSettings)
      .then(() => this.props.navigation.navigate("HomeScreen"));
  };
  checkValidation = () => {
    const { email, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      ToastAndroid.show("Please fill the Email !...", ToastAndroid.SHORT);
    } else if (password === "") {
      ToastAndroid.show("Password can not be empty....", ToastAndroid.SHORT);
    } else if (password.length < 5) {
      ToastAndroid.show(
        "password should be more than 6 characters....",
        ToastAndroid.SHORT
      );
    } else if (reg.test(email) === false) {
      ToastAndroid.show("Invalid Email address !....", ToastAndroid.SHORT);
      this.setState({ email: email });
      return false;
    } else {
      this.handleSignUp();
      // this.navigateScreen();
    }
  };

  onClickListner = viewId => {
    this.checkValidation;
  };

  openSignInScreen = () => {
    this.props.navigation.navigate("LoginScreen");
    this.setState({ email: "" });
    this.setState({ password: "" });
  };
  render() {
    var actionCodeSettings = {
      url: "https://workorderdemo.page.link/test",
      // iOS: {
      //   bundleId: 'com.myurl.ios'
      // },
      android: {
        packageName: "com.workorderdemo",
        installApp: true,
        minimumVersion: "12"
      },
      handleCodeInApp: true
    };
    return (
      <View style={stylesContent.container}>
        <Image
          style={stylesContent.LogoImageStyle}
          source={require("../images/logo_large.png")}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType="email-address"
        />

        <Card style={{ marginTop: 40 }}>
          <View style={stylesContent.SectionStyle}>
            <Image
              style={{
                height: hp("4.5%"),
                width: wp("4.5%"),
                padding: wp("1%"),
                resizeMode: "contain"
              }}
              source={require("../images/email_icon_medium.png")}
            />

            <TextInput
              style={stylesContent.inputs}
              placeholder="Email Address"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>
        </Card>

        <Card style={{ marginTop: 5 }}>
          <View style={stylesContent.PasswordSectionStyle}>
            <Image
              style={{
                height: hp("4%"),
                padding: wp("1%"),
                width: wp("4%"),
                resizeMode: "contain"
              }}
              source={require("../images/password_icon.png")}
            />

            <TextInput
              style={stylesContent.inputs}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
        </Card>

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text>Already have an account?</Text>

          <TouchableOpacity onPress={this.openSignInScreen}>
            <Text style={{ color: "blue", marginLeft: 5 }}>{"Login"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={stylesContent.button}
          onPress={this.checkValidation}
        >
          <Text style={{ color: "white", fontSize: 17 }}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

stylesContent = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  LogoImageStyle: {
    width: wp("80%"),
    height: hp("20%"),
    marginTop: hp("10%"),
    resizeMode: "center"
  },
  SectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("85%"),
    paddingLeft: 20,
    backgroundColor: "#f0eaea"
  },
  PasswordSectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("85%"),
    paddingLeft: 20,
    backgroundColor: "#f0eaea"
  },
  inputs: {
    width: wp("90%"),
    height: hp("7%"),
    marginLeft: wp("3%"),
    fontSize: 17,
    borderBottomColor: "#FFFFFF"
  },
  button: {
    alignItems: "center",
    height: 50,
    marginTop: hp("10%"),
    width: wp("80%"),
    padding: 10,
    backgroundColor: "#ac1010",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff"
  },
  button1: {
    alignItems: "center",
    height: 50,
    marginTop: hp("1%"),
    width: wp("80%"),
    padding: 10,
    backgroundColor: "#ac1010",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff"
  }
});
