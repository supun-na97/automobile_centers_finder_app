import { Dimensions } from 'react-native';

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
});
