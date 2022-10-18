import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacityComponent,
} from 'react-native';
import Styles from '../styles/HomePageStyle';
import {Actions} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import Custom from '../styles/Custom.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {font} from '../utils/Fonts';
import {
  getAllCityes,
  getMapData,
  GetCurrentCityName,
  GetCurrentCityId,
  getSelectedLocationAddress,
  getAllNotifications,
  getRequestHistory,
  getFavoritePlaces,
  changeCompanyStatus,
  getCompanyStatus,
  LoginOut,
  getUserCurrentLocationLatitude,
  getUserCurrentLocationLongitude,
} from '../actions/HomePageAction';
import {RegisterDevice} from '../actions/LoginAction';
import {getFullName} from '../actions/SignupAction';
import {connect} from 'react-redux';
import Footer from './common/Footer';
import apiKey from '../key/google_api_key';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import ToggleSwitch from 'toggle-switch-react-native';

const {width: WIDTH, height: height} = Dimensions.get('window');
const user = require('../assets/garage96.png');
const profile = require('../assets/adminProfile.png');
const notification = require('../assets/adminNotification.png');
const history = require('../assets/adminHistory.png');
const logout = require('../assets/logoutRounded.png');
const date = new Date();
const hour = date.getHours();
//let lat = 6.5248451;
//let lng = 80.0815891;
const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      spinner: true,
      options: 'Morning',
      toggle: false,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    //this.props.getAllCityes(this.props.userToken);
    this.props.getCompanyStatus(this.props.userToken);
    this.props.getAllNotifications(this.props.userToken);
    this.props.getRequestHistory(this.props.userToken);
    //this.props.getFavoritePlaces(this.props.userToken);
    console.log(this.props.customerData);
    this.setTime();
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
      this.getLocationDetail();
    }, 3000);
    setTimeout(() => {
      console.log(this.props.loginInData);
      this.props.getFullName(this.props.loginInData[0].name);
      this.setState({
        toggle: this.props.loginInData[0].current_status === '1' ? true : false,
      });
      this.props.getUserCurrentLocationLatitude(
        this.props.loginInData[0].latitude,
      );
      this.props.getUserCurrentLocationLongitude(
        this.props.loginInData[0].longitude,
      );
    }, 1000);
  }

  setTime = () => {
    if (hour >= 12 && hour < 15) {
      this.setState({options: 'AfterNoon'});
    } else if (hour >= 15 && hour < 19) {
      this.setState({options: 'Evening'});
    } else if (hour > 19) {
      this.setState({options: 'Night'});
    }
  };

  async getLocationDetail() {
    const apiUrls = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${this.props.currentLan},${this.props.currentLon}`;
    try {
      const result = await fetch(apiUrls);
      const json = await result.json();
      console.log(json);
      //console.log(json.results[0].address_components[2]);
      console.log(json.results[0].formatted_address);
      this.props.getSelectedLocationAddress(json.results[0].formatted_address);
      //console.log(json.results[0].formatted_address.split(',')[0]);
    } catch (err) {
      console.log(err);
    }
  }

  async getAddress(latitude, longitude) {
    try {
      const coords = `${latitude}, ${longitude}`;
      const url = `${GEOCODE_API}?latlng=${coords}&key=${apiKey}`;

      const response = await axios.get(url);

      const types = {
        administrative_area_level_1: '_administrative_area_level_1',
        administrative_area_level_2: '_administrative_area_level_2',
        country: '_country',
        locality: '_locality',
        plus_code: '_plus_code',
        postal_code: '_postal_code',
        premise: '_premise',
        route: '_route',
        street_number: '_street_number',
      };

      console.log(response);

      if (response.data.status) {
        const output = {};
        if (response.data.results.length > 0) {
          response.data.results.map((result) => {
            if (result.address_components.length > 0) {
              result.address_components.map((address) => {
                if (address.types[0]) {
                  if (types[address.types[0]]) {
                    if (!output[types[address.types[0]]]) {
                      output[types[address.types[0]]] = address.long_name;
                    }
                  }
                }
              });
            }
          });
        }
        console.log(output);
        console.log(output._locality);
        this.props.GetCurrentCityName(output._locality);
        //this.filterCityId(output._locality);
        return output;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // filterCityId(CityName) {
  //   for (let i = 0; i < this.props.cityes.length; i++) {
  //     //console.log(this.props.cityes[i]);
  //     if (this.props.cityes[i].name === CityName) {
  //       console.log(this.props.cityes[i]);
  //       this.props.GetCurrentCityId(this.props.cityes[i].id);
  //     }
  //   }
  //   let obj = {
  //     //"city_id" : "1",
  //     city_id: this.props.cityId,
  //     company_id: '',
  //     company_name: '',
  //   };
  //   this.props.getMapData(this.props.userToken, obj);
  // }

  render() {
    return (
      <>
        <SafeAreaView style={Styles.container}>
          <Spinner visible={this.state.spinner} />
          <View
            style={{
              height: hp('30'),
              width: wp('100'),
              backgroundColor: '#D68910',
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                Actions.setting();
              }}>
              <Image
                source={user}
                style={{width: 150, height: 150, marginLeft: wp('3')}}
              />
            </TouchableOpacity>
            <View
              style={{
                height: hp('15'),
                width: wp('50'),
                //backgroundColor: "yellow",
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: wp('3'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //backgroundColor: "green",
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 25,
                    color: 'white',
                    fontFamily: font.MontserratBold,
                    marginTop: hp('0.5'),
                  }}>
                  Good {this.state.options}
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontFamily: font.MontserratSemiBold,
                  //marginLeft: wp('1'),
                  color: 'white',
                }}>
                {this.props.name === '' ? 'user' : this.props.name}
              </Text>
              <View
                style={{
                  marginTop: hp(2),
                  width: wp('50'),
                  //backgroundColor: "red",
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <ToggleSwitch
                  isOn={this.state.toggle}
                  onColor="green"
                  offColor="gray"
                  label={this.state.toggle === false ? 'OFFLINE' : 'ONLINE'}
                  labelStyle={{
                    color: 'white',
                    fontFamily: font.MontserratBold,
                    fontSize: 15,
                    marginLeft: wp('-0.1'),
                  }}
                  size="medium"
                  onToggle={(isOn) => {
                    this.setState({
                      toggle: !this.state.toggle,
                    });
                    if (this.state.toggle === false) {
                      let obj = {
                        status_id: 1,
                      };
                      this.props.changeCompanyStatus(obj, this.props.userToken);
                    } else {
                      let obj = {
                        status_id: 2,
                      };
                      this.props.changeCompanyStatus(obj, this.props.userToken);
                    }
                    console.log('changed to : ', isOn);
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: wp('95'),
              height: hp(60),
              marginTop: hp('5'),
              //backgroundColor: "red",
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                width: wp('90'),
                height: hp(25),
                //marginTop: hp('5'),
                //backgroundColor: "yellow",
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Actions.profile();
                }}
                style={{
                  width: wp('40'),
                  height: hp(24),
                  borderRadius: 15,
                  //marginTop: hp('5'),
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 8,
                }}>
                <Image source={profile} style={{width: 60, height: 60}} />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontFamily: font.MontserratBold,
                    marginTop: hp('2'),
                  }}>
                  PROFILE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Actions.notification();
                }}
                style={{
                  width: wp('40'),
                  height: hp(24),
                  borderRadius: 15,
                  //marginTop: hp('5'),
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 8,
                }}>
                <Image source={notification} style={{width: 55, height: 55}} />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontFamily: font.MontserratBold,
                    marginTop: hp('2'),
                  }}>
                  NOTIFICATION
                </Text>
                {this.props.notifications[0] !== undefined ? (
                  <View
                    style={{
                      width: wp(10),
                      height: hp(5),
                      backgroundColor: 'red',
                      borderRadius: 50,
                      marginTop: hp(1),
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 5,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        fontFamily: font.MontserratBold,
                        //marginTop: hp('1'),
                      }}>
                      {this.props.notifications.length === 0
                        ? '0'
                        : this.props.notifications.length}
                    </Text>
                  </View>
                ) : undefined}
              </TouchableOpacity>
            </View>
            {/* ----------------------------------------------------------- */}
            <View
              style={{
                width: wp('90'),
                height: hp(25),
                marginTop: hp('2'),
                //backgroundColor: "yellow",
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Actions.reqHistory();
                }}
                style={{
                  width: wp('40'),
                  height: hp(24),
                  borderRadius: 15,
                  //marginTop: hp('5'),
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 8,
                }}>
                <Image source={history} style={{width: 55, height: 55}} />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontFamily: font.MontserratBold,
                    marginTop: hp('2'),
                  }}>
                  HISTORY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.LoginOut(this.props.userToken);
                }}
                style={{
                  width: wp('40'),
                  height: hp(24),
                  borderRadius: 15,
                  //marginTop: hp('5'),
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 8,
                }}>
                <Image source={logout} style={{width: 55, height: 55}} />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontFamily: font.MontserratBold,
                    marginTop: hp('2'),
                  }}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.login.userToken,
    customerData: state.home.customerData,
    currentLon: state.home.currentLon,
    currentLan: state.home.currentLan,
    cityes: state.home.cityes,
    cityId: state.home.cityId,
    deviceId: state.login.deviceId,
    notifications: state.home.notifications,
    loginInData: state.home.loginInData,
    name: state.signup.name,
  };
};

export default connect(mapStateToProps, {
  getAllCityes,
  getMapData,
  GetCurrentCityName,
  GetCurrentCityId,
  getSelectedLocationAddress,
  RegisterDevice,
  getAllNotifications,
  getRequestHistory,
  getFavoritePlaces,
  changeCompanyStatus,
  getCompanyStatus,
  LoginOut,
  getFullName,
  getUserCurrentLocationLatitude,
  getUserCurrentLocationLongitude,
})(HomeScreen);
