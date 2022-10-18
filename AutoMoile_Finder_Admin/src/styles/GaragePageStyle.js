import {Dimensions} from 'react-native';
import {font} from '../utils/Fonts';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
const {StyleSheet} = React;
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
    height: 25,
  },
  texts: {
    fontSize: 17,
    fontFamily: font.MontserratMedium,
    marginLeft: wp('5'),
  },
  nextIcons: {
    width: 25,
    height: 25,
    marginRight: wp('2'),
  },
  textInputView: {
    width: wp('85'),
    backgroundColor: '#fff',
    height: hp('6'),
    borderRadius: 10,
    marginTop: hp('1'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  textInputView1: {
    width: wp('85'),
    backgroundColor: '#fff',
    height: hp('10'),
    borderRadius: 10,
    marginTop: hp('1'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  tInput: {
    marginLeft: wp('2'),
    width: wp('70'),
    fontFamily: font.MontserratSemiBold,
    color: '#17202A',
    fontSize: 12,
    height: hp('6'),
  },
  tInput1: {
    marginLeft: wp('2'),
    width: wp('70'),
    fontFamily: font.MontserratSemiBold,
    color: '#17202A',
    fontSize: 12,
    height: hp('10'),
  },
  tView: {
    marginTop: hp('3'),
  },
  tagTxt: {
    fontSize: 12,
    color: '#17202A',
    fontFamily: font.MontserratSemiBold,
    marginLeft: wp('1'),
  },
  signUpButtonView: {
    width: wp('85'),
    height: hp('6'),
    marginTop: hp('2'),
    alignItems: 'flex-end',
    justifyContent: 'center',
    //flexDirection: 'row',
    //backgroundColor: 'red'
    //backgroundColor: "yellow",
  },
  textV: {
    width: wp('85'),
    height: hp('6'),
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: 'red',
    marginLeft: wp('1'),
  },
  textV1: {
    width: wp('85'),
    height: hp('7'),
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: 'red',
    marginTop: hp('1.5'),
    marginLeft: wp('1'),
  },
  iconI: {
    width: 25, 
    height: 25
  },
  textT: {
    fontSize: 13,
    fontFamily: font.MontserratSemiBold,
    color: 'black',
    marginTop: hp(0.5),
    //marginLeft: wp('5'),
  },
  textT2: {
    fontSize: 14,
    fontFamily: font.MontserratBold,
    color: 'gray',
    //marginLeft: wp('5'),
  },
  textT1: {
    fontSize: 11,
    fontFamily: font.MontserratSemiBold,
    color: 'gray',
    marginLeft: wp('1'),
  }
});
