import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';

export default class SplashScreen extends Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user && data !== null ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{height: 100, width: wp('75%'), resizeMode: 'contain'}}
          source={require('../images/logo_large.png')}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};
