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
  TouchableOpacityComponent,
} from 'react-native';
import Styles from '../styles/SignUpScreenStyle';
import {Actions} from 'react-native-router-flux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
  getFullName,
  getCustomerEmail,
  getCustomerContactNumber,
  getPassword,
  getConfirmPassword,
  RegisterUser,
} from '../actions/SignupAction';
import {font} from '../utils/Fonts';
import { showMessage } from 'react-native-flash-message';

const {width: WIDTH, height: height} = Dimensions.get('window');
const Background = require('../assets/BackGroundImg.png');
const Login = require('../assets/SignUp.png');
const next = require('../assets/next90.png');
const eyeOpen = require("../assets/view.png");
const eyeClose = require("../assets/hide.png");

class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validated: false,
      password: '',
      confirmPassword: '',
      checkUniqueness: false,
      name: '',
      phone: '',
      passwordType: false,
      showPass: true,
      confirmShowPass: true,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      this.setState({email: text});
      return false;
    } else {
      this.setState({
        email: text,
        validated: true,
      });
      this.props.getCustomerEmail(text);
      console.log('Email is Correct');
    }
  };

  checkPassword = (password, newPassword) => {
    if (password === newPassword && password.length === newPassword.length) {
      this.setState({
        checkUniqueness: true,
      });
      //this.formValidate();
      console.log('TRUE');
    } else {
      this.setState({
        checkUniqueness: false,
      });
      console.log('FALSE');
    }
  };

  formValidate = () => {
    switch (true) {
      case this.state.name === '':
        showMessage({
          message: 'Travel App',
          description: 'Invalid Name',
          type: 'warning',
          duration: 1000,
        });
        break;
      case this.state.validated === false:
        showMessage({
          message: 'Travel App',
          description: 'Invalid Email',
          type: 'warning',
          duration: 1000,
        });
        break;
      case this.state.phone === '':
        showMessage({
          message: 'Travel App',
          description: 'Invalid Contact Number',
          type: 'warning',
          duration: 1000,
        });
        break;
      case this.state.password === '':
        showMessage({
          message: 'Travel App',
          description: 'Invalid Password',
          type: 'warning',
          duration: 1000,
        });
        break;
      case this.state.password.length <= 6:
        showMessage({
          message: 'Travel App',
          description: 'Please enter strong password',
          type: 'warning',
          duration: 1000,
        });
        break;
      case this.state.password !== this.state.confirmPassword:
        showMessage({
          message: 'Travel App',
          description: 'Password Mismatch',
          type: 'warning',
          duration: 1000,
        });
        break;
      default:
        this.signUp();
        break;
    }
  };

  signUp = () => {
    let obj = {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      phone_number: this.props.contactNumber,
    };
    this.props.RegisterUser(obj);
    //console.log(obj);
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.imgView}>
          <Image source={Login} style={{width: wp('40'), height: hp('21')}} />
        </View>
        <View style={Styles.headTxtView}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 30,
              color: '#17202A',
              fontFamily: font.MontserratBold,
            }}>
            SIGN UP
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              color: '#17202A',
              fontFamily: font.MontserratMedium,
            }}>
            CREATE YOUR ACCOUNT
          </Text>
        </View>
        <View style={Styles.bodyView}>
          <View>
            <Text allowFontScaling={false} style={Styles.tagTxt}>
              NAME
            </Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={'NAME'}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                  this.props.getFullName(text);
                }}
              />
            </View>
          </View>
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>
              EMAIL ADDRESS
            </Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={'EMAIL ADDRESS'}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  this.validate(text);
                }}
                value={this.state.email}
              />
            </View>
          </View>
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>
              CONTACT NUMBER
            </Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={'CONTACT NUMBER'}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  this.setState({
                    phone: text,
                  });
                  this.props.getCustomerContactNumber(text);
                }}
              />
            </View>
          </View>
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>
              PASSWORD
            </Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={'PASSWORD'}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                secureTextEntry={this.state.showPass}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                  this.props.getPassword(text);
                }}
              />
              {this.state.showPass === true ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showPass: false,
                  });
                }}>
                <Image
                  source={eyeOpen}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: wp(5),
                    marginTop: hp(1),
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showPass: true,
                  });
                }}>
                <Image
                  source={eyeClose}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: wp(5),
                    marginTop: hp(1),
                  }}
                />
              </TouchableOpacity>
            )}
            </View>
          </View>
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>
              CONFIRM PASSWORD
            </Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={'CONFIRM PASSWORD'}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                secureTextEntry={this.state.confirmShowPass}
                onSubmitEditing={() => {
                  this.checkPassword(
                    this.state.password,
                    this.state.confirmPassword,
                  );
                }}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                  this.props.getConfirmPassword(text);
                }}
              />
              {this.state.confirmShowPass === true ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    confirmShowPass: false,
                  });
                }}>
                <Image
                  source={eyeOpen}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: wp(5),
                    marginTop: hp(1),
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    confirmShowPass: true,
                  });
                }}>
                <Image
                  source={eyeClose}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: wp(5),
                    marginTop: hp(1),
                  }}
                />
              </TouchableOpacity>
            )}
            </View>
          </View>
          <View style={Styles.signUpButtonView}>
            <TouchableOpacity
              onPress={() => {
                this.formValidate();
                //this.signUp();
              }}>
              <Image source={next} style={{width: wp('10'), height: hp('6')}} />
            </TouchableOpacity>
          </View>
          {/*-------------------------------------------------------------------------------------------*/}
          <View style={Styles.signInTxtView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>
              I ALREADY HAVE AN ACCOUNT ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                Actions.login();
              }}>
              <Text allowFontScaling={false} style={Styles.signInTxt}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
          {/*-------------------------------------------------------------------------------------------*/}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.signup.name,
    email: state.signup.email,
    contactNumber: state.signup.contactNumber,
    password: state.signup.password,
    confirmPassword: state.signup.confirmPassword,
  };
};

export default connect(mapStateToProps, {
  getFullName,
  getCustomerEmail,
  getCustomerContactNumber,
  getPassword,
  getConfirmPassword,
  RegisterUser,
})(SignUpScreen);
