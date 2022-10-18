import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Images} from '../../utils/Images';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {footerTabChange} from '../../actions/HomePageAction';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        width: wp('88'),
        height: hp('9'),
        backgroundColor: '#00A4C5',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 10,
      }}>
        <TouchableOpacity
          onPress={() => {
            this.props.footerTabChange('home');
          }}>
          <Image
            source={
              this.props.footerName === 'home'
                ? Images.homeSelected
                : Images.home
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.footerTabChange('Map');
          }}>
          <Image
            source={
              this.props.footerName === 'Map' ? Images.mapSelected : Images.map
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.footerTabChange('fav');
          }}>
          <Image
            source={
              this.props.footerName === 'fav'
                ? Images.bookingRed
                : Images.bookingOutLine
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.footerTabChange('profile');
          }}>
          <Image
            source={
              this.props.footerName === 'profile'
                ? Images.profileSelected
                : Images.profile
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    footerName: state.home.footerName,
  };
};

export default connect(
  mapStateToProps,
  {
    footerTabChange,
  },
)(Dashboard);
