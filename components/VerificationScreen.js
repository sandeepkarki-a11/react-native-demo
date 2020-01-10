import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase";

export default class VerificationScreen extends Component {
  constructor(props) {
    super(props);
     this.state = { currentUser: null };
  }
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

  }

  sendVerification = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => 
      this.props.navigation.navigate("LoadingScreen"))
  };

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>
          Hi
          <Text style={{ color: "#e93766", fontSize: 20 }}>
            {currentUser && currentUser.email}
          </Text>
        </Text>
        <Text style={{ fontSize: 20 }}>
          is Verified: 
          <Text style={{ color: "#e93766", fontSize: 20 }}>
            {currentUser && currentUser.emailVerified.toString()}
          </Text>
        </Text>
        
        <TouchableOpacity
          style={stylesContent.button1}
          onPress={this.sendVerification}
        >
          <Text style={{ color: "white", fontSize: 17 }}> Verify email </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button1: {
    alignItems: "center",
    height: 50,
    marginTop: 10,
    width: wp("80%"),
    padding: 10,
    backgroundColor: "#ac1010",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff"
  }
});
