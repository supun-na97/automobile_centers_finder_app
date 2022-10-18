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
  ScrollView,
  TextInput,
  Linking,
  TouchableOpacityComponent,
} from 'react-native';
import Styles from '../styles/MapDirectionPageStyle';
import {Actions} from 'react-native-router-flux';
import MapView, {Marker} from 'react-native-maps';
import Custom from '../styles/Custom.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {font} from '../utils/Fonts';
import {
  getAllCityes,
  getMapData,
  RequestGarage,
  getSelectedGarageId,
  getSelectedGarageName,
  getSelectedGarageData,
} from '../actions/HomePageAction';
import Modal from 'react-native-modal';
import MapViewDirections from 'react-native-maps-directions';
import {connect} from 'react-redux';
import Footer from './common/Footer';
import apiKey from '../key/google_api_key';

const {width: WIDTH, height: height} = Dimensions.get('window');
const user = require('../assets/distance24white.png');
const user1 = require('../assets/time24.png');
const user2 = require('../assets/locationWhte.png');
const marker = require('../assets/location96.png');

class MapDirectionScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      visible: false,
      scrollOffset: null,
      setDurationTime: null,
      setDestinationMilage: null,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.props.garageLat + '-------' + this.props.garageLon);
  }

  navigateToGoogleMap(latitude, longitude) {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}`);
    } else {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.view1}>
          <View style={Styles.view2}>
            <View style={Styles.view3}>
              <Image source={user2} style={{width: 20, height: 20}} />
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={1}>
                Location :
              </Text>
            </View>
            <View style={Styles.view4}>
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={2}>
                {this.props.locationAddress}
              </Text>
            </View>
          </View>
          {/* ------------------------------------------------------------------- */}
          <View style={Styles.view5}>
            <View style={Styles.view3}>
              <Image source={user2} style={{width: 20, height: 20}} />
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={1}>
                Destination :
              </Text>
            </View>
            <View style={Styles.view4}>
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={2}>
                {this.props.customerObj[0].cus_cl_address !== undefined
                  ? this.props.customerObj[0].cus_cl_address
                  : 'Invalid Address'}
              </Text>
            </View>
          </View>
          {/* ------------------------------------------------------------------- */}
          <View style={Styles.view5}>
            <View style={Styles.view3}>
              <Image source={user1} style={{width: 20, height: 20}} />
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={1}>
                Duration :
              </Text>
            </View>
            <View style={Styles.view4}>
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={1}>
                {this.state.setDurationTime} Min
              </Text>
            </View>
          </View>
          {/* ------------------------------------------------------------------- */}
          <View style={Styles.view5}>
            <View style={Styles.view3}>
              <Image source={user} style={{width: 20, height: 20}} />
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={1}>
                Distance :
              </Text>
            </View>
            <View style={Styles.view4}>
              <Text
                allowFontScaling={false}
                style={Styles.text1}
                numberOfLines={1}>
                {this.state.setDestinationMilage} Km
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              Actions.setting();
            }}>
            <Image
              source={user}
              style={{width: 40, height: 40, marginLeft: wp(5)}}
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  fontFamily: font.MontserratSemiBold,
                  marginLeft: wp('0.5'),
                  color: 'white',
                }}
                numberOfLines={2}>
                {this.props.locationAddress}
              </Text>
            </View>
          </View>
          <Image source={bell} style={{ width: 35, height: 35 }} /> */}
        </View>
        <MapView
          ref={(map) => {
            this.map = map;
          }}
          initialRegion={{
            latitude: Number(this.props.currentLan),
            longitude: Number(this.props.currentLon),
            latitudeDelta: 0.025,
            longitudeDelta: 0.013,
          }}
          customMapStyle={Custom}
          style={{
            width: wp('100'),
            height: hp('100'),
            flex: 1,
          }}
          showsUserLocation={true}>
          <Marker
            //title={this.props.garageName}
            coordinate={{
              latitude: Number(this.props.garageLat),
              longitude: Number(this.props.garageLon),
            }}>
            <Image source={marker} style={{width: 35, height: 35}} />
          </Marker>
          <MapViewDirections
            origin={{
              latitude: Number(this.props.currentLan),
              longitude: Number(this.props.currentLon),
            }}
            destination={{
              latitude: Number(this.props.garageLat),
              longitude: Number(this.props.garageLon),
            }}
            apikey={apiKey}
            timePrecision="now"
            precision="high"
            strokeWidth={6}
            strokeColor="#D68910"
            resetOnChange={false}
            optimizeWaypoints={true}
            onReady={(result) => {
              this.setState({
                setDurationTime: result.duration.toFixed(2),
                setDestinationMilage: result.distance,
              });
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
            }}
          />
        </MapView>
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
              this.navigateToGoogleMap(
                this.props.garageLat,
                this.props.garageLon,
              );
            }}
            style={{
              width: wp('70'),
              height: hp('6'),
              backgroundColor: '#D68910',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              position: 'absolute',
              marginTop: hp(90),
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                fontFamily: font.MontserratMedium,
                color: '#fff',
              }}>
              Driving Mode
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Modal
          testID={'modal'}
          isVisible={this.state.visible}
          animationType="fade"
          animationInTiming={1700}
          animationOutTiming={1500}
          backdropTransitionInTiming={1000}
          swipeDirection={['down']}
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          style={{justifyContent: 'flex-end', margin: 0}}
          propagateSwipe={true}
          onBackdropPress={() => {
            this.setState({
              visible: false,
            });
          }}
          backdropTransitionOutTiming={1000}>
          <View style={{
            width: '90%',
            height: 500,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: 'white',
            alignItems: 'flex-start',
            marginLeft: '5%',
            justifyContent: 'flex-start',
          }}>
            <View
              style={{
                height: 500,
                width: '100%',
                //backgroundColor: 'green'
              }}>
              <ScrollView
                ref={this.scrollViewRef}
                onScroll={this.handleOnScroll}
                scrollEventThrottle={16}>
                <View style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'red',
                    marginTop: '5%'
                  }}>
                  <Text allowFontScaling={false} style={{ fontSize: 18, fontFamily: font.MontserratBold, marginLeft: wp('1') }}>
                    {this.props.garageName}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal> */}

        {/*<View style={{*/}
        {/*  width: wp("95"),*/}
        {/*  height: hp("12"),*/}
        {/*  //backgroundColor: "red",*/}
        {/*  alignItems: "center",*/}
        {/*  justifyContent: "flex-start",*/}
        {/*  position: "absolute",*/}
        {/*  //marginTop: hp('10')*/}
        {/*}}>*/}
        {/*  <View style={{*/}
        {/*    width: wp("70"),*/}
        {/*    height: hp("6"),*/}
        {/*    backgroundColor: "#D68910",*/}
        {/*    alignItems: "center",*/}
        {/*    justifyContent: "center",*/}
        {/*    borderRadius: 10,*/}
        {/*    position: 'absolute',*/}
        {/*    //marginTop: -300,*/}
        {/*  }}>*/}
        {/*    <Text allowFontScaling={false} style={{ fontSize: 15, fontFamily: font.MontserratMedium, color: "#fff" }}>*/}
        {/*      Find Garage*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.login.userToken,
    customerData: state.home.customerData,
    currentLon: state.home.currentLon,
    currentLan: state.home.currentLan,
    locationsData: state.home.locationsData,
    cityes: state.home.cityes,
    garageName: state.home.garageName,
    garageId: state.home.garageId,
    locationAddress: state.home.locationAddress,
    garageData: state.home.garageData,
    garageLat: state.home.garageLat,
    garageLon: state.home.garageLon,
    customerObj: state.home.customerObj,
  };
};

export default connect(mapStateToProps, {
  getAllCityes,
  getMapData,
  RequestGarage,
  getSelectedGarageId,
  getSelectedGarageName,
  getSelectedGarageData,
})(MapDirectionScreen);
