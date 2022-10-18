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
  TouchableOpacityComponent,
} from 'react-native';
import Styles from '../styles/MapPageStyle';
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
  getSelectedGarageLocationLatitude,
  getSelectedGarageLocationLongitude,
} from '../actions/HomePageAction';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Footer from './common/Footer';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';

const {width: WIDTH, height: height} = Dimensions.get('window');
const user = require('../assets/distance24white.png');
const user1 = require('../assets/time24.png');
const user2 = require('../assets/location50.png');
const marker = require('../assets/garage1.png');
const Filter = require('../assets/filter32.png');

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      spinner: true,
      visible: false,
      scrollOffset: null,
      addressModel: false,
    };
    this.scrollViewRef = React.createRef();
  }

  componentDidMount() {
    let obj = {
      city_id: '1',
      company_id: '',
      company_name: '',
    };
    StatusBar.setHidden(true);
    setTimeout(() => {
      this.setState({
        spinner: false
      })
    }, 3000);
    setTimeout(() => {
      if(this.props.locationsData[0] === undefined){
        showMessage({
          message: 'Auto Mobile',
          description: 'Auto Mobile Centers Not Available.',
          type: 'warning',
          autoHide: true,
          duration: 4000
        });
      }
    }, 1000);
  }

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = (p) => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Spinner
          visible={this.state.spinner}
        />
        <View style={Styles.view1}>
          <View style={Styles.view2}>
          <View style={Styles.view5}>
              <Image source={user2} style={{width: 40, height: 40}}/>
            </View>
            <View>
              <View style={Styles.view3}>
                <Text
                  allowFontScaling={false}
                  style={Styles.text1}
                  numberOfLines={1}>
                  Your Current Location :
                </Text>
              </View>
              <View style={Styles.view4}>
                <Text
                  allowFontScaling={false}
                  style={Styles.text2}
                  numberOfLines={2}>
                  {this.props.locationAddress}
                </Text>
              </View>
            </View>
            <View style={Styles.view5}>
              <TouchableOpacity onPress={()=>{
                Actions.city();
              }}>
              <Image source={Filter} style={{width: 30, height: 30}}/>
              </TouchableOpacity>
            </View>
          </View>
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
            height: hp('100'),
            flex: 1,
          }}
          showsUserLocation={true}>
          {this.props.locationsData[0] === undefined ? undefined : (
            <View>
              {this.props.locationsData.map((item, i) => (
                <Marker
                  title={item.name}
                  onPress={() => {
                    let array = [];
                    array.push(item);
                    this.props.getSelectedGarageName(item.name);
                    this.props.getSelectedGarageData(array);
                    this.props.getSelectedGarageLocationLatitude(item.latitude),
                      this.props.getSelectedGarageLocationLongitude(
                        item.longitude,
                      ),
                      Actions.garage();
                  }}
                  coordinate={{
                    latitude: Number(item.latitude),
                    longitude: Number(item.longitude),
                  }}>
                  <Image source={marker} style={{width: 35, height: 35}} />
                </Marker>
              ))}
            </View>
          )}
        </MapView>
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
  };
};

export default connect(mapStateToProps, {
  getAllCityes,
  getMapData,
  RequestGarage,
  getSelectedGarageId,
  getSelectedGarageName,
  getSelectedGarageData,
  getSelectedGarageLocationLatitude,
  getSelectedGarageLocationLongitude,
})(MapScreen);
