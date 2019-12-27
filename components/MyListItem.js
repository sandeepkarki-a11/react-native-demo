import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Card, CardItem } from "native-base";

export default class MyListItem extends PureComponent {
    constructor(props){
        super(props);
    }
     switchScreen = id => {
    // console.log("clicked", data.item.name);
    this.props.navigation.navigate("DetailScreen", { id: id });
  };
  render() {
      console.log('props', this.props)
    return (
      <View style={{ flex: 1, backgroundColor: "#dcd7d7" }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#dcd7d7"
          }}
           onPress={() => this.switchScreen(this.props.itemData.item.id)}
        >
          <Card
            style={{
              width: wp("95%"),
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowOffset: { width: 0, height: 0 }
            }}
          >
            <View style={{ flex: 1, flexDirection: "row", margin: wp("1%") }}>
              <View
                style={{
                  width: wp("35%"),
                  alignSelf: "center"
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2,
                    margin: 10
                  }}
                  source={{
                    uri:
                      "https://www.larutadelsorigens.cat/filelook/full/7/74435/wallpaper-phone-android.jpg"
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ebedee"
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
                    text
                      {this.props.itemData.item.id}
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
                    test
                      {this.props.itemData.item.employee_name}
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
                      {this.props.itemData.item.emploemployee_salaryyee_name}
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
                      {this.props.itemData.item.employee_age}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
