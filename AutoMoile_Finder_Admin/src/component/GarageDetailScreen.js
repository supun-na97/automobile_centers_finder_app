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
} from '../actions/HomePageAction';
import {font} from '../utils/Fonts';
import {connect} from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const {width: WIDTH, height: height} = Dimensions.get('window');
const logo = require('../assets/autoMobile.jpg');
const NameIcon = require('../assets/home52.png');
const AddressIcon = require('../assets/pinpoint.png');
const TelIcon = require('../assets/telephone.png');
const ActiveIcon = require('../assets/status.png');
const back = require('../assets/backArrow50.png');
const heartIcon = require('../assets/heart32.png');

class GarageDetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.props.userToken);
  }

  FindGarage() {
    // let obj = {
    //   customer_id: this.props.customerData[0].id.toString(),
    //   cus_cl_address: this.props.locationAddress,
    //   cus_latitude: this.props.currentLan.toString(),
    //   cus_longitude: this.props.currentLon.toString(),
    //   cus_city: this.props.cityName,
    //   message: this.props.message,
    //   vehicle_type: this.props.vehicleType,
    //   vehicle_sub_type: this.props.vehicleBrand,
    //   company_id: this.props.garageData[0].id.toString(),
    // };
    //this.props.RequestGarage(obj, this.props.userToken);
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
                Actions.map();
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
        <View style={{
            width: wp('90'),
            height: hp('4'),
            //backgroundColor: 'red',
            marginTop: hp('1'),
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
            <TouchableOpacity onPress={()=>{
              // let obj = {
              //   "company_id" : this.props.garageData[0].id.toString(),
              //   "popularity" : true
              // }
              // this.props.addFavourite(obj,this.props.userToken);
            }}>
            <Image source={heartIcon} style={Styles.iconI} />
            </TouchableOpacity>
            </View>
        <View
          style={{
            width: wp('88'),
            height: hp('24'),
            //backgroundColor: 'red',
            //marginTop: hp('2'),
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          {/* <View
            style={{
              width: wp('30'),
              height: hp('20'),
              //backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={logo}
              style={{width: wp('30'), height: hp('15'), borderRadius: 15}}
            />
          </View> */}
          <View
            style={{
              width: wp('85'),
              height: hp('24'),
              //marginLeft: wp('2'),
              //backgroundColor: 'green',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            {/* --------------------------------------------------------- */}
            <View style={Styles.textV}>
              <Image source={NameIcon} style={Styles.iconI} />
              <Text allowFontScaling={false} style={Styles.textT}>
                {this.props.garageName}
              </Text>
            </View>
            {/* --------------------------------------------------------- */}
            <View style={Styles.textV1}>
              <Image source={AddressIcon} style={Styles.iconI} />
              <Text
                allowFontScaling={false}
                numberOfLines={2}
                style={Styles.textT}>
                  address
                {/* {this.props.garageData[0].address} */}
              </Text>
            </View>
            {/* --------------------------------------------------------- */}
            <View style={Styles.textV1}>
              <Image source={TelIcon} style={Styles.iconI} />
              <Text allowFontScaling={false} style={Styles.textT}>
                {/* {this.props.garageData[0].mobile_number} */}
              </Text>
            </View>
            {/* --------------------------------------------------------- */}
            <View style={Styles.textV1}>
              <Image source={ActiveIcon} style={Styles.iconI} />
              <Text allowFontScaling={false} style={Styles.textT}>
                Pending
                {/* {this.props.garageData[0].current_status === '1' ? 'Online' : 'Offline'} */}
              </Text>
            </View>
          </View>
        </View>
        <View style={{
          width: wp('85'),
          height: hp('6'),
          marginTop: hp('1'),
          //backgroundColor: 'red',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          <TouchableOpacity
          onPress={() => {
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
        <View style={Styles.tView}>
          <Text allowFontScaling={false} style={Styles.tagTxt}>
            VEHICLE TYPE
          </Text>
          <View style={Styles.textInputView}>
            <TextInput
              style={Styles.tInput}
              allowFontScaling={false}
              placeholder={'VEHICLE TYPE'}
              underlineColorAndroid="transparent"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                this.props.GetVehicleType(text);
              }}
            />
          </View>
        </View>
        {/* ----------------------------------------------------- */}
        <View style={Styles.tView}>
          <Text allowFontScaling={false} style={Styles.tagTxt}>
            VEHICLE BRAND
          </Text>
          <View style={Styles.textInputView}>
            <TextInput
              style={Styles.tInput}
              allowFontScaling={false}
              placeholder={'VEHICLE BRAND'}
              underlineColorAndroid="transparent"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                this.props.GetVehicleBrand(text);
              }}
            />
          </View>
        </View>
        {/* ----------------------------------------------------- */}
        <View style={Styles.tView}>
          <Text allowFontScaling={false} style={Styles.tagTxt}>
            MESSAGE
          </Text>
          <View style={Styles.textInputView1}>
            <TextInput
              style={Styles.tInput1}
              allowFontScaling={false}
              placeholder={'MESSAGE'}
              underlineColorAndroid="transparent"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                this.props.GetTypeMessage(text);
              }}
            />
          </View>
        </View>
        {/* ----------------------------------------------------- */}
        {/* <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>PASSWORD</Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={"Password"}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={text => {
                  //this.props.getCustomerContactNumber(text);
                }}
              />
            </View>
          </View> */}
        <TouchableOpacity
          onPress={() => {
            if(this.props.vehicleType === '' || this.props.vehicleBrand === '' || this.props.message === ''){
              showMessage({
                message: 'Auto Mobile',
                description: 'Please check your details',
                type: 'danger',
                duration: 2000,
              });
            }else {
              this.FindGarage();
            }
          }}
          style={{
            width: wp('80'),
            height: hp('6'),
            backgroundColor: '#D68910',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            //position: 'absolute',
            marginTop: hp('5'),
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 15,
              fontFamily: font.MontserratMedium,
              color: '#fff',
            }}>
            Request
          </Text>
        </TouchableOpacity>
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
  };
};

export default connect(mapStateToProps, {
  RequestGarage,
  GetTypeMessage,
  GetVehicleBrand,
  GetVehicleType,
  addFavourite,
})(GarageDetailScreen);
