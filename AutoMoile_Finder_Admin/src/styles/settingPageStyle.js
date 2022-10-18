import { Dimensions } from 'react-native';
import { font } from "../utils/Fonts";

const React = require('react-native');
const { width: WIDTH, height: height } = Dimensions.get('window');
const { StyleSheet } = React;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    justifyContent: 'flex-start',
    //backgroundColor: 'black',
    backgroundColor: '#F8F9F9',
    alignItems: 'center',
  },
  icons: {
    width: 25, 
    height: 25
  },
  texts: {
    fontSize: 17, 
    fontFamily: font.MontserratMedium, 
    marginLeft: wp("5")
  },
  nextIcons: {
    width: 25, 
    height: 25, 
    marginRight: wp("2")
  }
});
