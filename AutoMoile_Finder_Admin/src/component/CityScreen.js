import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
  TextInput,
} from 'react-native';
import Styles from '../styles/GaragePageStyle';
import {Actions} from 'react-native-router-flux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RequestGarage, getMapData} from '../actions/HomePageAction';
import {font} from '../utils/Fonts';
import {connect} from 'react-redux';

const {width: WIDTH, height: height} = Dimensions.get('window');
const logo = require('../assets/location96.png');
const NameIcon = require('../assets/home52.png');
const AddressIcon = require('../assets/pinpoint.png');
const TelIcon = require('../assets/telephone.png');
const ActiveIcon = require('../assets/status.png');
const back = require('../assets/backArrow50.png');

class CityScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      selectId: null,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.props.userToken);
  }

  FindGarage(Id) {
    let obj = {
        "city_id" : Id,
        "company_id" : "",
        "company_name" : ""
    };
    this.props.getMapData(this.props.userToken, obj);
    Actions.map();
  }

  renderRow = ({item}) => {
    //console.log(item.skuimageurl);
    return (
      <TouchableOpacity
        style={{
          marginBottom: 10,
          width: wp('40'),
          height: hp(6),
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 8,
          borderWidth: 1,
          borderColor: this.state.selectId === item.id ? '#D68910' : 'gray',
        }}
        onPress={() => {
          console.log(item);
          this.setState({
            selectId: item.id,
          })
          this.FindGarage(item.id);
        }}>
        <Image source={logo} style={{width: 20, height: 20}} />
        <Text allowFontScaling={false} style={Styles.textT1}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };

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
                fontSize: 20,
                fontFamily: font.MontserratMedium,
                color: 'white',
              }}>
              SELECT CITY
            </Text>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            width: wp('90'),
            marginTop: hp('5'),
          }}
          data={this.props.cityes}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          numColumns={2}
        />
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
    cityes: state.home.cityes,
  };
};

export default connect(mapStateToProps, {
  RequestGarage,
  getMapData,
})(CityScreen);
