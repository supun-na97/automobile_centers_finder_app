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
} from '../actions/HomePageAction';
import {font} from '../utils/Fonts';
import {connect} from 'react-redux';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';

const {width: WIDTH, height: height} = Dimensions.get('window');
const logo = require('../assets/autoMobile.jpg');
const NameIcon = require('../assets/home52.png');
const AddressIcon = require('../assets/location96.png');
const TelIcon = require('../assets/telephone.png');
const ActiveIcon = require('../assets/status.png');
const back = require('../assets/backArrow50.png');
const heartIcon = require('../assets/heart32.png');

class RequestHistoryScreen extends React.Component {
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
    //console.log(item.skuimageurl);
    return (
      <View
        style={{
          marginBottom: 10,
          width: wp('86'),
          height: hp(18),
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
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(80),
            height: hp(3),
            //backgroundColor: 'yellow',
            alignItems: 'center',
            marginTop: hp(1.5),
          }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                //backgroundColor: "red",
            }}>
            <Image source={NameIcon} style={{width: 20, height: 20}} />
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily: font.MontserratSemiBold,
              color: 'black',
              marginLeft: wp('2'),
              marginTop: hp(0.5),
            }}>
            {item.cus_name}
          </Text>
          </View>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily: font.MontserratSemiBold,
              color: 'gray',
            }}>
            {item.com_response_status === '1'
              ? 'Accept'
              : item.com_response_status === '2'
              ? 'Busy'
              : item.com_response_status === '3'
              ? 'Not Responding'
              : item.com_response_status === '4'
              ? 'Close'
              : item.com_response_status === '5'
              ? 'Done'
              : item.com_response_status === '6'
              ? 'On Going'
              : item.com_response_status === '7'
              ? 'Reject'
              : item.com_response_status === '8'
              ? 'Pending'
              : undefined}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: wp(80),
            height: hp(3),
            //backgroundColor: 'yellow',
            alignItems: 'center',
            marginTop: hp(1),
          }}>
            <Image source={AddressIcon} style={{width: 20, height: 20}} />
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily: font.MontserratMedium,
              color: 'black',
              marginLeft: wp('2'),
              //marginTop: hp(0.2),
            }}>
            {item.cus_cl_address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: wp(80),
            height: hp(3),
            //backgroundColor: 'yellow',
            alignItems: 'center',
            marginTop: hp(1),
          }}>
            <Image source={TelIcon} style={{width: 20, height: 20}} />
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily: font.MontserratMedium,
              color: 'black',
              marginLeft: wp('2'),
              //marginTop: hp(0.2),
            }}>
            {item.cus_mobile_no}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
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
              marginLeft: wp('1'),
            }}>
            {moment(new Date(item.response_date)).format('YYYY-MM-DD')}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily: font.MontserratMedium,
              color: 'black',
            }}>
            {moment(new Date(item.response_date)).format('HH:MM a')}
          </Text>
        </View>
      </View>
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
              HISTORY
            </Text>
          </View>
        </View>
        {this.props.requestHistories[0] === undefined ? (
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
              EMPTY HISTORY
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
            data={this.props.requestHistories}
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
    requestHistories: state.home.requestHistories,
  };
};

export default connect(mapStateToProps, {
  RequestGarage,
  GetTypeMessage,
  GetVehicleBrand,
  GetVehicleType,
  addFavourite,
})(RequestHistoryScreen);
