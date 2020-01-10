/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
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
import { Toast } from "native-base";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import firebase from "react-native-firebase";
import toastr from "../toast-config";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.onClickListner = this.onClickListner.bind(this);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
  }

  async componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        "173381546713-2iuu7kfsvmngut35kq36emsi9mab535p.apps.googleusercontent.com",
      offlineAccess: true,
      hostedDomain: "",
      forceConsentPrompt: true
    });
  }

  firebaseGoogleLogin = async () => {
    // add any configuration settings here:
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("user info: ", userInfo);
    this.setState({ userInfo: userInfo, loggedIn: true });
    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      userInfo.idToken,
      userInfo.accessToken
    );
    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        switch (error.code) {
          case "SIGN_IN_CANCELLED":
            ToastAndroid.show("Sign in cancelled!...", ToastAndroid.SHORT);
          case "IN_PROGRESS":
            ToastAndroid.show("In progress!...", ToastAndroid.SHORT);
          case "PLAY_SERVICES_NOT_AVAILABLE":
            ToastAndroid.show(
              "Play_Services not available!...",
              ToastAndroid.SHORT
            );
          default:
            ToastAndroid.show("" + error.message, ToastAndroid.SHORT);
        }
      });
  };

  handleLogin = () => {
    // Firebase stuff...
    const { email, password } = this.state;
    // try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("HomeScreen"))
      .catch(error => {
        switch (error.code) {
          case "auth/app-deleted":
            ToastAndroid.show(
              " instance of FirebaseApp has been deleted!...",
              ToastAndroid.SHORT
            );
          case "auth/app-not-authorized":
            ToastAndroid.show(" app-not-authorized!...", ToastAndroid.SHORT);
          case "auth/invalid-api-key":
            ToastAndroid.show(" invalid-api-key!...", ToastAndroid.SHORT);
          case "auth/user-token-expired":
            ToastAndroid.show(" user-token-expired!...", ToastAndroid.SHORT);
          default:
            ToastAndroid.show("" + error.message, ToastAndroid.SHORT);
        }
      });
  };

  //.then(this.switchScreen()
  // firebase.auth().onAuthStateChanged(function(user) {
  //   console.log("user:::::::::::::", user.emailVerified.toString());
  //   if (user.emailVerified.toString() == false) {
  //     // User is signed in.
  //     this.switchScreen();
  //     console.log("if condition called")
  //   } else {
  //     // No user is signed in.
  //     ToastAndroid.show(
  //       "User is not verified yet!...",
  //       ToastAndroid.SHORT
  //     );
  //                   console.log("else condition called")

  //   }
  // })
  // );
  //  catch (error) {
  //   console.log(error.toString(error));
  //   ToastAndroid.show(error.message, ToastAndroid.SHORT);
  // }

  checkValidation = () => {
    const { email, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      // Alert.alert("Please fill the Email !")
      ToastAndroid.show("Please fill the Email !...", ToastAndroid.SHORT);
    } else if (password === "") {
      // Alert.alert("Password can not be empty.")
      ToastAndroid.show("Password can not be empty....", ToastAndroid.SHORT);
    } else if (password.length < 5) {
      //Alert.alert("password should be more than 6 characters." )
      ToastAndroid.show(
        "password should be more than 6 characters....",
        ToastAndroid.SHORT
      );
    } else if (reg.test(email) === false) {
      //Alert.alert("Invalid Email address !" )
      ToastAndroid.show("Invalid Email address !....", ToastAndroid.SHORT);
      this.setState({ email: email });
      return false;
    } else {
      this.handleLogin();
    }
  };

  switchScreen() {
    this.props.navigation.navigate("App");
    this.setState({ email: "" });
    this.setState({ password: "" });
  }

  OpenSignUpScreen = () => {
    this.props.navigation.navigate("SignUp");
  };

  onClickListner = viewId => {
    this.checkValidation;
  };

  render() {
    return (
      <View style={stylesContent.loginStyle.mainContainer}>
        <Image
          style={stylesContent.loginStyle.LogoImageStyle}
          source={require("../images/logo_large.png")}
        />
        <Text style={stylesContent.loginStyle.workOrderText}>
          {"Work Order"}
        </Text>

        <View style={stylesContent.loginStyle.SectionStyle}>
          <Image
            style={{
              height: hp("4.5%"),
              padding: wp("1%"),
              width: wp("4.5%"),
              resizeMode: "contain"
            }}
            source={require("../images/email_icon_medium.png")}
          />

          <TextInput
            style={stylesContent.loginStyle.inputs}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>

        <View
          style={{
            height: 1,
            width: wp("85%"),
            marginTop: hp("1%"),
            backgroundColor: "#dedddd"
          }}
        />

        <View style={stylesContent.loginStyle.PasswordSectionStyle}>
          <Image
            style={{
              height: hp("4%"),
              width: wp("4%"),
              padding: wp("1%"),
              resizeMode: "contain"
            }}
            source={require("../images/password_icon.png")}
          />

          <TextInput
            style={stylesContent.loginStyle.inputs}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <View
          style={{
            height: 1,
            width: wp("85%"),
            marginTop: hp("1%"),
            backgroundColor: "#dedddd"
          }}
        />

        <View style={{ marginTop: 15, flexDirection: "row" }}>
          <Text>Do not have an account?</Text>
          <TouchableOpacity onPress={this.OpenSignUpScreen}>
            <Text style={{ color: "blue", marginLeft: 5 }}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={stylesContent.loginStyle.button}
          onPress={this.checkValidation}
        >
          <Text style={{ color: "white", fontSize: 17 }}> Sign In </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: hp("2%") }}>{"OR"}</Text>

        <GoogleSigninButton
          style={{ width: wp("80%"), height: 55, marginTop: hp("1.5%") }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.firebaseGoogleLogin}
          disabled={this.state.isSigninInProgress}
        />
      </View>
    );
  }
}

const stylesContent = {
  //login screen
  loginStyle: StyleSheet.create({
    mainContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff"
    },
    inputs: {
      width: wp("80%"),
      height: hp("7%"),
      marginLeft: wp("3%"),
      fontSize: 17,

      borderBottomColor: "#FFFFFF"
    },

    LogoImageStyle: {
      width: wp("80%"),
      height: hp("20%"),
      marginTop: hp("5%"),
      resizeMode: "center"
    },
    SectionStyle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("5%"),
      marginLeft: wp("5%")
    },
    PasswordSectionStyle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("2%"),
      marginLeft: wp("5%")
    },
    button: {
      alignItems: "center",
      height: 50,
      marginTop: hp("5%"),
      width: wp("80%"),
      padding: 10,
      backgroundColor: "#ac1010",
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#fff"
    },

    workOrderText: {
      color: "black",
      marginTop: hp("2%"),
      //fontWeight: 'bold',
      fontSize: hp("5%")
    }
  })
};
