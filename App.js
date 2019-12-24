/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
import SplashScreen from './components/SplashScreen';
import DetailScreen from './components/DetailScreen';
import firebase from 'react-native-firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAcCyBjbagIkgkIXqsCGcZCR2noe53G33M",
    authDomain: "reactlogin-4e236.firebaseapp.com",
    databaseURL: "https://reactlogin-4e236.firebaseio.com",
    projectId: "reactlogin-4e236",
    storageBucket: "reactlogin-4e236.appspot.com",
    messagingSenderId: "173381546713",
    appId: "1:173381546713:web:a2d4f3b737ead749df04c8",
    measurementId: "G-DTJ9R74LV7"

};
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  DetailScreen: {
    screen:DetailScreen,
  },
});

const authStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },

  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      SplashScreen: SplashScreen,
      App: AppStack,
      Auth: authStack,
    },
    {
      initialRouteName: 'SplashScreen',
    },
  ),
);
