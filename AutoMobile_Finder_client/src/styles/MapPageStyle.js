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
    backgroundColor: '#EAEDF0',
    alignItems: 'center',
  },
  view1: {
    height: hp('12'),
    width: wp('90'),
    backgroundColor: '#D68910',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: hp('5'),
    borderRadius: 20,
    elevation: 10,
    //position: 'absolute',
  },
  view2: {
    height: hp('10'),
    width: wp('85'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp(1),
  },
  view3: {
    height: hp('4'),
    width: wp('60'),
    //marginLeft: wp(1),
    flexDirection: 'row',
    //backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  view4: {
    height: hp('4'),
    width: wp('60'),
    //backgroundColor: 'black',
    //marginLeft: wp(7),
    //backgroundColor: 'yellow',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  view5: {
    height: hp('10'),
    width: wp('10'),
    //backgroundColor: 'green',
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    //marginTop: hp(0.5),
  },
  text1: {
    fontSize: 13,
    fontFamily: font.MontserratSemiBold,
    marginLeft: wp('1'),
    color: 'white',
  },
  text2: {
    fontSize: 11,
    fontFamily: font.MontserratMedium,
    marginLeft: wp('1'),
    color: 'white',
    textAlign: 'justify',
  },
});
