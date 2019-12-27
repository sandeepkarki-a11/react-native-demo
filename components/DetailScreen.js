/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, Text, Image, StyleSheet, BackHandler } from "react-native";
import { Card, CardItem } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      fileUri:
        "https://www.larutadelsorigens.cat/filelook/full/7/74435/wallpaper-phone-android.jpg",
      dataa: ""
    };
  }
  componentDidMount() {
    //this.handleBackPress();
    const { navigation } = this.props;
    const id = navigation.getParam("id", "");
    // console.log("Props", data);
    this.fetchAPIData(id);
    console.log("IDS", id);
  }

  fetchAPIData(id) {
    console.log("ids =", id);
    const url = `http://dummy.restapiexample.com/api/v1/employee/${id}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Work with JSON data here
        console.log("User detail: ", data);
        this.setState({
          loading: false,
          dataa: data
        });
      })
      .catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
  }

  // componentWillMount() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  static navigationOptions = {
    title: "Detail Screen",
    headerTintColor: "#000000",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center",
      fontWeight: 'bold',
      color: "#000000",
      fontFamily: "Nunito-Regular",
      fontSize: 18
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.cardStyle}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.imageStyle}
              source={{ uri: this.state.fileUri }}
            />

            <View
              style={{
                borderBottomColor: "#6e7273",
                borderBottomWidth: 1,
                marginTop: 10,
                marginLeft: wp("10%"),
                marginRight: wp("10%")
              }}
            />
            {/* <Card style={styles.innerCardView}>
              <View
                style={{
                  // flex: 1,
                  backgroundColor: "#fff",
                  margin: 15,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "column"
                  }}
                >
                  <View style={{ marginLeft: 10, flexDirection: "row" }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      Id :{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        marginLeft: 10,
                        fontSize: 15,
                        alignSelf: "center"
                      }}
                    >
                      {this.state.dataa.id}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginLeft: 10,
                      marginTop: 5,
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Name :{" "}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 15,
                        alignSelf: "center",
                        width: wp("38%")
                      }}
                    >
                      {this.state.dataa.employee_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      marginTop: 5,
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Salary :{" "}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 15,
                        alignSelf: "center"
                      }}
                    >
                      {this.state.dataa.employee_salary}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 10, flexDirection: "row" }}>
                    <Text
                      style={{ fontSize: 15, marginTop: 5, fontWeight: "bold" }}
                    >
                      Age :{" "}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 15,
                        alignSelf: "center"
                      }}
                    >
                      {this.state.dataa.employee_age}
                    </Text>
                  </View>
                </View>
              </View>
            </Card> */}
          </View>
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  cardStyle: {
    width: wp("95%"),
    height: hp("95%"),
    justifyContent: "center",
    backgroundColor: "#ebedee",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 3
  },
  innerCardView: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 10,
    elevation: 4,
    borderWidth: 3,
    width: wp("85%")
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    marginLeft: 10,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 15
  }
});
