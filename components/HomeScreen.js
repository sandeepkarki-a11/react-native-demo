/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import firebase from 'react-native-firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card, CardItem} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends Component {
  componentDidMount() {
    //this.handleBackPress();
    this.fetchAPIData();
  }

  switchScreen = data => {
    console.log('clicked', data.item.name);
    this.props.navigation.navigate('DetailScreen', {data: data});
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fileUri:
        'https://www.larutadelsorigens.cat/filelook/full/7/74435/wallpaper-phone-android.jpg',
      dataSource: [],
    };
  }

  handleBackPress = () => {
    this.backButton = BackHandler.addEventListner('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  };

  fetchAPIData = () => {
    fetch('http://dummy.restapiexample.com/api/v1/employees')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.console.log(error));
  };
  logout = () => {
    firebase.auth().signOut();
  };

  renderItem = data => {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => this.switchScreen(data)}>
        <Card style={styles.cardStyle}>
          <View style={{flex: 1, flexDirection: 'row', margin: wp('1%')}}>
            <View
              style={{
                width: wp('35%'),
                alignSelf: 'center',
              }}>
              <Image
                style={styles.userImageStyle}
                source={{uri: this.state.fileUri}}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#ebedee',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Id :{' '}
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      fontSize: 15,
                      alignSelf: 'center',
                    }}>
                    {data.item.id}
                  </Text>
                </View>

                <View
                  style={{marginLeft: 10, marginTop: 5, flexDirection: 'row'}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    Name :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      alignSelf: 'center',
                      width: wp('38%'),
                    }}>
                    {data.item.employee_name}
                  </Text>
                </View>
                <View
                  style={{marginLeft: 10, marginTop: 5, flexDirection: 'row'}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    Salary :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      alignSelf: 'center',
                    }}>
                    {data.item.employee_salary}
                  </Text>
                </View>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                  <Text
                    style={{fontSize: 15, marginTop: 5, fontWeight: 'bold'}}>
                    Age :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      alignSelf: 'center',
                    }}>
                    {data.item.employee_age}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    console.log('Statee', this.state.dataSource);
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
              alignItems: 'center',
              flex: 1,
              marginLeft: wp('35%'),
              fontWeight: 'bold',
            }}>
            ListView Screen
          </Text>
          <TouchableOpacity onPress={this.logout}>
            <View style={styles.logoutStyle}>
              <Icon
                name="power-off"
                size={20}
                color="#166ec6"
                // style={{ textAlign: "center" }}
              />
              <Text style={{marginLeft: 5, color: '#166ec6'}}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcd7d7',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  cardStyle: {
    width: wp('95%'),
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 3,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcd7d7',
  },
  logoutStyle: {
    flex: 1,
    flexDirection: 'row',
    marginRight: wp('6%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerStyle: {
    height: hp('7.5%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  userImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    margin: 10,
  },
});
