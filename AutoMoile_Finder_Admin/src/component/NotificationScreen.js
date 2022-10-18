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
  FlatList,
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
  getRequestDetailById,
  getSelectedGarageId,
  getSelectedGarageLocationLatitude,
  getSelectedGarageLocationLongitude,
  ReadNotification
} from '../actions/HomePageAction';
import {font} from '../utils/Fonts';
import {connect} from 'react-redux';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';

const {width: WIDTH, height: height} = Dimensions.get('window');
const logo = require('../assets/autoMobile.jpg');
const NameIcon = require('../assets/home52.png');
const AddressIcon = require('../assets/pinpoint.png');
const TelIcon = require('../assets/telephone.png');
const ActiveIcon = require('../assets/status.png');
const back = require('../assets/backArrow50.png');
const heartIcon = require('../assets/heart32.png');

class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      spinner: true,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.props.userToken);
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 2000);
  }

  renderRow = ({item}) => {
    //console.log(item);
    //console.log(item.skuimageurl);
    return (
      <TouchableOpacity
        style={{
          marginBottom: 10,
          width: wp('86'),
          height: hp(8),
          borderRadius: 10,
          //flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginHorizontal: 8,
          elevation: 5,
          //backgroundColor: "red",
          //marginLeft: wp(5),
          backgroundColor: '#fff',
        }}
        onPress={() => {
          console.log(item);
          this.props.getSelectedGarageId(item.request_id);
          let obj = {
            "request_id": item.request_id.toString()
          }
          let newObj = {
            "notification_id": item.notification_id.toString()
          }
          this.props.getRequestDetailById(obj,this.props.userToken);
          this.props.ReadNotification(newObj,this.props.userToken);
          setTimeout(() => {
            Actions.detail();
          }, 1000);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(80),
            height: hp(2),
            //backgroundColor: 'yellow',
            alignItems: 'center',
            marginTop: hp(1.5),
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 10,
              fontFamily: font.MontserratBold,
              color: 'gray',
            }}>
            NOTIFICATION
          </Text>
        </View>
        <View
          style={{
            //flexDirection: 'row',
            justifyContent: 'center',
            width: wp(80),
            height: hp(2),
            //backgroundColor: 'yellow',
            alignItems: 'flex-start',
            marginTop: hp(1),
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 14,
              fontFamily: font.MontserratMedium,
              color: 'black',
            }}>
            {item.content}
          </Text>
        </View>
        {/* <View
          style={{
            //flexDirection: 'row',
            justifyContent: 'center',
            width: wp(80),
            height: hp(2),
            //backgroundColor: 'yellow',
            alignItems: 'flex-start',
            marginTop: hp(1),
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily: font.MontserratMedium,
              color: 'black',
            }}>
            {moment(new Date(item.approved_date)).format('YYYY-MM-DD HH:MM a')}
          </Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };

  render() {
    return (
      <View style={Styles.container}>
        <Spinner visible={this.state.spinner} />
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
                Actions.home();
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
              NOTIFICATION
            </Text>
          </View>
        </View>
        {this.props.notifications[0] === undefined ? (
          <View
            style={{
              width: wp('90'),
              height: hp('70'),
              //backgroundColor: 'red',
              marginTop: hp('5'),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 20,
                fontFamily: font.MontserratSemiBold,
                color: 'black',
              }}>
              EMPTY NOTIFICATION
            </Text>
            </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: wp('90'),
              marginTop: hp('5'),
              //backgroundColor: "red",
            }}
            data={this.props.notifications}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            //numColumns={2}
          />
        )}
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
    notifications: state.home.notifications,
  };
};

export default connect(mapStateToProps, {
  RequestGarage,
  GetTypeMessage,
  GetVehicleBrand,
  GetVehicleType,
  addFavourite,
  getRequestDetailById,
  getSelectedGarageId,
  getSelectedGarageLocationLatitude,
  getSelectedGarageLocationLongitude,
  ReadNotification,
})(NotificationScreen);
