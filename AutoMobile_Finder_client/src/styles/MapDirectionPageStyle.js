import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
const {StyleSheet} = React;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {font} from '../utils/Fonts';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    justifyContent: 'flex-start',
    //backgroundColor: 'black',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  view1: {
    height: hp('20'),
    width: wp('90'),
    backgroundColor: '#D68910',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: hp('5'),
    borderRadius: 20,
    elevation: 10,
    position: 'absolute',
  },
  view2: {
    height: hp('4'),
    width: wp('90'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  view3: {
    height: hp('4'),
    width: wp('25'),
    marginLeft: wp(1),
    flexDirection: 'row',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  view4: {
    height: hp('4'),
    width: wp('60'),
    marginLeft: wp(1),
    //backgroundColor: 'yellow',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  view5: {
    height: hp('4'),
    width: wp('90'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  text1: {
    fontSize: 11,
    fontFamily: font.MontserratSemiBold,
    marginLeft: wp('1'),
    color: 'white',
  },
});
