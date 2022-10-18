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
} from '../actions/HomePageAction';
import {RegisterDevice} from '../actions/LoginAction';
import {getFullName} from '../actions/SignupAction';
import {connect} from 'react-redux';
import Footer from './common/Footer';
import apiKey from '../key/google_api_key';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const {width: WIDTH, height: height} = Dimensions.get('window');
const user = require('../assets/userPic.png');
const bell = require('../assets/group2.png');
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
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.props.getAllCityes(this.props.userToken);
    this.props.getAllNotifications(this.props.userToken);
    this.props.getRequestHistory(this.props.userToken);
    this.props.getFavoritePlaces(this.props.userToken);
    console.log(this.props.customerData);
    this.setTime();
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 3000);
    setTimeout(() => {
      this.getLocationDetail();
      this.props.getFullName(this.props.customerData[0].name);
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
        this.filterCityId(output._locality);
        return output;
      }
    } catch (e) {
      console.log(e);
    }
  }

  filterCityId(CityName) {
    for (let i = 0; i < this.props.cityes.length; i++) {
      //console.log(this.props.cityes[i]);
      if (this.props.cityes[i].name === CityName) {
        console.log(this.props.cityes[i]);
        this.props.GetCurrentCityId(this.props.cityes[i].id);
      }
    }
    let obj = {
      //"city_id" : "1",
      city_id: this.props.cityId,
      company_id: '',
      company_name: '',
    };
    this.props.getMapData(this.props.userToken, obj);
  }

  render() {
    return (
      <>
        <SafeAreaView style={Styles.container}>
          <Spinner visible={this.state.spinner} />
          <View
            style={{
              height: hp('11'),
              width: wp('100'),
              backgroundColor: '#D68910',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                Actions.setting();
              }}>
              <Image
                source={user}
                style={{width: 60, height: 60, marginLeft: wp('5')}}
              />
            </TouchableOpacity>
            <View
              style={{
                height: hp('8'),
                width: wp('65'),
                //backgroundColor: "yellow",
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: wp('3'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 18,
                    fontFamily: font.MontserratBold,
                    color: 'white',
                  }}>
                  Hello
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 18,
                    fontFamily: font.MontserratBold,
                    marginLeft: wp('1'),
                    color: 'white',
                  }}>
                  {this.props.name === '' ? 'user' : this.props.name}
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: font.MontserratSemiBold,
                  marginTop: hp('0.5'),
                }}>
                Good {this.state.options}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: wp(12),
                height: hp(10),
                //backgroundColor: "red",
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: wp(-5),
              }}
              onPress={() => {
                Actions.notification();
              }}>
              <Image
                source={bell}
                style={{
                  width: 85,
                  height: 85,
                  position: 'absolute',
                  //marginLeft: wp(-8),
                  //marginTop: 10,
                }}
              />
              {this.props.notifications[0] !== undefined ? (
                <View
                  style={{
                    width: wp(6),
                    height: hp(3),
                    borderRadius: 20,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //position: "absolute",
                    marginTop: -35,
                    marginLeft: wp(8),
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 13,
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
          <MapView
            ref={(map) => {
              this.map = map;
            }}
            initialRegion={{
              latitude: this.props.currentLan,
              longitude: this.props.currentLon,
              latitudeDelta: 0.025,
              longitudeDelta: 0.013,
            }}
            customMapStyle={Custom}
            style={{
              width: wp('100'),
              height: hp('60'),
              flex: 1,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}></MapView>

          <View
            style={{
              width: wp('95'),
              height: hp('12'),
              //backgroundColor: "red",
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'absolute',
              //marginTop: hp('10')
            }}>
            <TouchableOpacity
              onPress={() => {
                //this.getLocationDetail();
                this.getAddress(this.props.currentLan, this.props.currentLon);
                setTimeout(() => {
                  Actions.map();
                }, 1000);
              }}
              style={{
                width: wp('70'),
                height: hp('6'),
                backgroundColor: '#D68910',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                position: 'absolute',
                //marginTop: -300,
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  fontFamily: font.MontserratMedium,
                  color: '#fff',
                }}>
                Find Garage
              </Text>
            </TouchableOpacity>
            {/*<View style={{*/}
            {/*  width: wp("60"),*/}
            {/*  height: hp("6"),*/}
            {/*  backgroundColor: "#D68910",*/}
            {/*  alignItems: "center",*/}
            {/*  justifyContent: "center",*/}
            {/*  borderRadius: 10,*/}
            {/*}}>*/}
            {/*  <Text allowFontScaling={false} style={{ fontSize: 15, fontFamily: font.MontserratMedium, color: "#fff" }}>*/}
            {/*    Find Garage*/}
            {/*  </Text>*/}
            {/*</View>*/}
            {/*<Footer/>*/}
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
    name: state.signup.name,
    notifications: state.home.notifications,
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
  getFullName,
})(HomeScreen);
