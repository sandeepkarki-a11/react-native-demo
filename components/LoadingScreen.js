import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase";

export default class LoadingScreen extends Component {

constructor(props) {
    super(props);
     this.state = { 
       currentUser: null,
       isVerified: false };
  }
   componentDidMount() {
    currentUser = firebase.auth();
    this.setState({currentUser: currentUser});
    this.setState({isVerified: currentUser.emailVerified});
    this.saveVerifiedStatus();
  }
  async saveVerifiedStatus() {
    try {
      await AsyncStorage.setItem('@isVerified', this.state.isVerified);
      console.log('stateData= ' + this.state.isVerified);
    } catch (e) {
      //saving error
    }
  }
  // var isVerifid= firebase.auth().currentUser;
  // console.log("isVerified", isVerified.emailVerified.toString());
    // currentUser = firebase.auth();
    // this.setState({ currentUser });

//     storeData = async () => {
//   try {
//     await AsyncStorage.setItem('@isVeriviedEmail',currentUser && currentUser.emailVerified.toString())
//   } catch (e) {
//     // saving error
//   }
// }
render() {
  return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Email verification is on process, Please check your email....  
        </Text>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 50,
    alignItems: 'center'
  }
})
