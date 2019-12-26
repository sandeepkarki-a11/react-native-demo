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
    const data = navigation.getParam("data", "");
    console.log("Props", data);
    this.fetchAPIData(data.item.id);
    console.log("IDS", data.item.id);
  }

  fetchAPIData(id) {
    console.log("ids =", id);
    const url = "http://dummy.restapiexample.com/api/v1/employees/id";
    fetch(url).then(response => {
          console.log(response);
          return response.json();
        }).then(data => {
          // Work with JSON data here
          console.log(data);
        }).catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    // fetch(url, {
    //   // method: "GET"
    // })
    //   .then(response => response.json())
    //   .then((messages) => {console.log(messages);})
    //   .then(responseJson => {
    //     console.log(responseJson);

    //     this.setState({
    //       dataa: responseJson
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
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
      textAlign: "center"
    }
  };
  render() {
    // const {navigation} = this.props;
    // const data = navigation.getParam('data', '');

    // console.log('Props', data);
    return (
      <View style={styles.container}>
        <Card style={styles.cardStyle}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
                marginLeft: 10,
                marginTop: 7
              }}
              source={{ uri: this.state.fileUri }}
            />
            <Card style={styles.innerCardView}>
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
                      {/* {data.item.id} */}
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
                      {/* {data.item.employee_name} */}
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
                      {/* {data.item.employee_salary} */}
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
                      {/* {data.item.employee_age} */}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
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
  }
});
