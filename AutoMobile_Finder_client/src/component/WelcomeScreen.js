import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  Platform,
  PermissionsAndroid,
  AsyncStorage,
  Animated,
} from 'react-native';
import Styles from '../styles/LoadingPageStyle';
import {Actions} from 'react-native-router-flux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {font} from '../utils/Fonts';
const {width: WIDTH, height: height} = Dimensions.get('window');
const Logo = require('../assets/autoMobileLogo.png');
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {
  getUserCurrentLocationLongitude,
  getUserCurrentLocationLatitude,
} from '../actions/HomePageAction';
import {
  getUserToken,
  getCustomerLoginData,
  getDeviceId,
} from '../actions/LoginAction';
import messaging from '@react-native-firebase/messaging';
let userArray = [];

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      fadeAnim: new Animated.Value(0),
    };
  }

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  };

  async componentDidMount() {
    setTimeout(() => {
      this.fadeIn();
    }, 500);
    this.checkGPS();
    StatusBar.setHidden(true);
    await messaging().registerDeviceForRemoteMessages();

    // get user Token form AsyncStorage
    let Medata = await AsyncStorage.getItem('userData');
    let Token = JSON.parse(Medata);
    console.log(Token);

    // get user Data form AsyncStorage
    let client = await AsyncStorage.getItem('customerData');
    let clientData = JSON.parse(client);
    console.log(clientData);
    userArray.push(clientData);

    // Get firebase token
    const token = await messaging().getToken();
    console.log(token);
    this.props.getDeviceId(token);

    Geolocation.watchPosition(
      (position) => {
        console.log(position);
        this.props.getUserCurrentLocationLongitude(position.coords.longitude);
        this.props.getUserCurrentLocationLatitude(position.coords.latitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    if (Token !== null) {
      this.props.getUserToken(Token.access_token);
      this.props.getCustomerLoginData(userArray);
      setTimeout(() => {
        Actions.home();
      }, 6000);
    } else {
      setTimeout(() => {
        Actions.login();
      }, 6000);
    }

    // setTimeout(()=>{
    //   Actions.login();
    // },2000)
  }

  checkGPS = () => {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: false, // true ==> Trigger locationProviderStatusChange listener when the location state changes
      })
        .then(function (success) {})
        .catch((error) => {
          console.log(error.message); // error.message => "disabled"
        });
      this.requestMapPermission();
    }
  };

  async requestMapPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <Animated.View
          style={{
            width: wp('90'),
            height: hp('12'),
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: this.state.fadeAnim,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 40,
              color: '#D68910',
              fontFamily: font.MontserratSemiBold,
            }}>
            Welcome
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            width: wp('90'),
            height: hp('35'),
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: this.state.fadeAnim,
          }}>
          <Image source={Logo} style={{width: wp('60'), height: hp('30')}} />
        </Animated.View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    deviceId: state.login.deviceId,
  };
};

export default connect(mapStateToProps, {
  getUserCurrentLocationLongitude,
  getUserCurrentLocationLatitude,
  getDeviceId,
  getUserToken,
  getCustomerLoginData,
})(WelcomeScreen);
