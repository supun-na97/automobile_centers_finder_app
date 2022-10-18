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
} from 'react-native';
import Styles from '../styles/GaragePageStyle';
import {Actions} from 'react-native-router-flux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  RequestGarage,
  GetTypeMessage,
  GetVehicleBrand,
  GetVehicleType,
  addFavourite,
  SystemResponse,
  getSelectedGarageLocationLatitude,
  getSelectedGarageLocationLongitude,
} from '../actions/HomePageAction';
import {font} from '../utils/Fonts';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';

const {width: WIDTH, height: height} = Dimensions.get('window');
const logo = require('../assets/autoMobile.jpg');
const NameIcon = require('../assets/home52.png');
const AddressIcon = require('../assets/pinpoint.png');
const TelIcon = require('../assets/telephone.png');
const ActiveIcon = require('../assets/status.png');
const back = require('../assets/backArrow50.png');
const heartIcon = require('../assets/heart32.png');

class NotificationDetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      today: '',
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.props.customerObj);
    let date = moment(new Date()).format('YYYY-MM-DD');
    this.setState({
      today: date,
    });
    //console.log(moment(new Date()).format('YYYY-MM-DD'));
  }

  FindGarage() {}

  AcceptRequest() {
    let obj = {
      request_id: this.props.garageId.toString(),
      company_status: 1,
      message: '',
    };
    this.props.SystemResponse(obj, this.props.userToken);
  }

  RejectRequest() {
    let obj = {
      request_id: this.props.garageId.toString(),
      company_status: 7,
      message: '',
    };
    this.props.SystemResponse(obj, this.props.userToken);
  }

  render() {
    return (
      <View style={Styles.container}>
        <View
          style={{
            width: wp('100'),
            height: hp('12'),
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#D68910',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View
            style={{
              width: wp('90'),
              height: hp('6'),
              marginTop: hp('2'),
              flexDirection: 'row',
              alignItems: 'center',
              //backgroundColor: 'red',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                Actions.notification();
              }}>
              <Image source={back} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontFamily: font.MontserratSemiBold,
                color: 'white',
              }}>
              DETAIL
            </Text>
          </View>
        </View>
        <View
          style={{
            width: wp('85'),
            height: hp('58'),
            marginTop: hp('2'),
            //marginLeft: wp('2'),
            //backgroundColor: 'green',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV}>
            {/* <Image source={NameIcon} style={Styles.iconI} /> */}
            <Text allowFontScaling={false} style={Styles.textT2}>
              NAME
            </Text>
            <Text allowFontScaling={false} style={Styles.textT}>
              {this.props.customerObj[0].cus_name}
            </Text>
          </View>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV1}>
            {/* <Image source={AddressIcon} style={Styles.iconI} /> */}
            <Text allowFontScaling={false} style={Styles.textT2}>
              ADDRESS
            </Text>
            <Text
              allowFontScaling={false}
              numberOfLines={2}
              style={Styles.textT}>
              {this.props.customerObj[0].cus_cl_address}
            </Text>
          </View>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV1}>
            {/* <Image source={TelIcon} style={Styles.iconI} /> */}
            <Text allowFontScaling={false} style={Styles.textT2}>
              CONTACT NUMBER
            </Text>
            <Text allowFontScaling={false} style={Styles.textT}>
              {this.props.customerObj[0].cus_mobile_no}
            </Text>
          </View>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV1}>
            <Text allowFontScaling={false} style={Styles.textT2}>
              MESSAGE
            </Text>
            <Text allowFontScaling={false} style={Styles.textT}>
              {this.props.customerObj[0].message}
            </Text>
          </View>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV1}>
            <Text allowFontScaling={false} style={Styles.textT2}>
              VEHICLE TYPE
            </Text>
            <Text allowFontScaling={false} style={Styles.textT}>
              {this.props.customerObj[0].message}
            </Text>
          </View>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV1}>
            <Text allowFontScaling={false} style={Styles.textT2}>
              VEHICLE MODEL
            </Text>
            <Text allowFontScaling={false} style={Styles.textT}>
              {this.props.customerObj[0].vehicle_sub_type}
            </Text>
          </View>
          {/* --------------------------------------------------------- */}
          <View style={Styles.textV1}>
            <Text allowFontScaling={false} style={Styles.textT2}>
              DATE
            </Text>
            <Text allowFontScaling={false} style={Styles.textT}>
              {moment(new Date(this.props.customerObj[0].created_at)).format(
                'YYYY-MM-DD',
              )}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: wp('88'),
            height: hp('10'),
            //marginTop: hp('20'),
            //backgroundColor: 'red',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.getSelectedGarageLocationLatitude(
                this.props.customerObj[0].cus_latitude,
              );
              this.props.getSelectedGarageLocationLongitude(
                this.props.customerObj[0].cus_longitude,
              );
              Actions.direction();
            }}
            style={{
              width: wp('30'),
              height: hp('5'),
              backgroundColor: '#D68910',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              //position: 'absolute',
              //marginTop: hp('10'),
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                fontFamily: font.MontserratMedium,
                color: '#fff',
              }}>
              Direction
            </Text>
          </TouchableOpacity>
        </View>
        {/* ----------------------------------------------------- */}
        {this.state.today ===
        moment(new Date(this.props.customerObj[0].created_at)).format(
          'YYYY-MM-DD',
        ) ? (
          <View
            style={{
              width: wp('88'),
              //flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.AcceptRequest();
              }}
              style={{
                width: wp('60'),
                height: hp('5'),
                backgroundColor: '#D68910',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                //position: 'absolute',
                marginTop: hp('2'),
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  fontFamily: font.MontserratMedium,
                  color: '#fff',
                }}>
                ACCEPT
              </Text>
            </TouchableOpacity>
            {/* ============================================================= */}
            <TouchableOpacity
              onPress={() => {
                this.RejectRequest();
              }}
              style={{
                width: wp('60'),
                height: hp('5'),
                backgroundColor: '#D68910',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                //position: 'absolute',
                marginTop: hp('2'),
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  fontFamily: font.MontserratMedium,
                  color: '#fff',
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        ) : undefined}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.login.userToken,
    customerData: state.home.customerData,
    garageName: state.home.garageName,
    garageId: state.home.garageId,
    garageData: state.home.garageData,
    currentLon: state.home.currentLon,
    currentLan: state.home.currentLan,
    cityName: state.home.cityName,
    locationAddress: state.home.locationAddress,
    vehicleType: state.home.vehicleType,
    vehicleBrand: state.home.vehicleBrand,
    message: state.home.message,
    customerObj: state.home.customerObj,
  };
};

export default connect(mapStateToProps, {
  RequestGarage,
  GetTypeMessage,
  GetVehicleBrand,
  GetVehicleType,
  addFavourite,
  SystemResponse,
  getSelectedGarageLocationLatitude,
  getSelectedGarageLocationLongitude,
})(NotificationDetailScreen);
