/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
  BackHandler,
  Alert
} from "react-native";
import firebase from "react-native-firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Card, CardItem } from "native-base";
let { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";
import MyListItem from './MyListItem';

export default class HomeScreen extends Component{
  componentDidMount() {
    //this.handleBackPress();
    this.fetchAPIData();
  }

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(150);
    this.state = {
      loading: true,
      backClickCount: 0,
      dataSource: []
    };
  }
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  _spring() {
    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -0.15 * height,
          friction: 5,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(this.springValue, {
          toValue: 250,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });
  }

  handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
  };

  fetchAPIData = () => {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson
        });
      })
      .catch(error => console.console.log(error));
  };

  logout = () => {
    //function to make two option alert
    Alert.alert(
      //title
      "Logout",
      //body
      "Are you sure you want to logout ?",
      [
        { text: "Yes", onPress: () => this.logoutFirebase() },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };
  logoutFirebase = () => {
    firebase.auth().signOut();
  };
  renderItem = (data) => (
  <MyListItem
    itemData={data}
  />
  );

  render() {
    console.log("Statee", this.state.dataSource);
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text
            style={{
              alignItems: "center",
              flex: 1,
              marginLeft: wp("35%"),
              fontWeight: "bold",
              fontSize: 17
            }}
          >
            ListView Screen
          </Text>
          <TouchableOpacity onPress={this.logout}>
            <View style={styles.logoutStyle}>
              <Icon
                name="power-off"
                size={20}
                color="#166ec6"
              />
              <Text style={{ marginLeft: 5, color: "#166ec6" }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />
        <Animated.View
          style={[
            styles.animatedView,
            { transform: [{ translateY: this.springValue }] }
          ]}
        >
          <Text style={styles.exitTitleText}>
            press back again to exit the app
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => BackHandler.exitApp()}
          >
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcd7d7"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe"
  },

  logoutStyle: {
    flex: 1,
    flexDirection: "row",
    marginRight: wp("6%"),
    alignItems: "center",
    justifyContent: "flex-end"
  },
  headerStyle: {
    height: hp("7.5%"),
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row"
  },
  animatedView: {
    backgroundColor: "#0a5386",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  exitTitleText: {
    textAlign: "center",
    color: "#ffffff",
    marginRight: 10
  },
  exitText: {
    color: "#e5933a",
    paddingHorizontal: 10,
    paddingVertical: 3
  }
});
