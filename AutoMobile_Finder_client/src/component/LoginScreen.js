import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TextInput, TouchableOpacityComponent,
} from "react-native";
import Styles from "../styles/LoginPageStyle";
import { Actions } from "react-native-router-flux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  setEmail,
  setPassword,
  getUserToken,
  LoginUser,
} from "../actions/LoginAction";
import { font } from "../utils/Fonts";
import { connect } from "react-redux";

const { width: WIDTH, height: height } = Dimensions.get("window");
const Background = require("../assets/BackGroundImg.png");
const Login = require("../assets/SignIn-amico.png");
const next = require("../assets/next90.png");
const eyeOpen = require("../assets/view.png");
const eyeClose = require("../assets/hide.png");

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      showPass: true,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.props.userToken);
  }

  loginUser() {
    let obj = {
      email: this.props.userEmail,
      password: this.props.userPassword,
    };
    this.props.LoginUser(obj, this.props.deviceId);
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={{
          width: wp("100"),
          height: hp("35"),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D68910",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
          <Image source={Login} style={{ width: wp("50"), height: hp("26") }} />
        </View>
        <View style={{
          width: wp("85"),
          height: hp("8"),
          marginTop: hp("2"),
          alignItems: "flex-start",
          justifyContent: "center",
          //backgroundColor: 'red'
          backgroundColor: "#F8F9F9",
        }}>
          <Text allowFontScaling={false}
                style={{ fontSize: 30, color: "#17202A", fontFamily: font.MontserratBold }}>LOGIN</Text>
          <Text allowFontScaling={false}
                style={{ fontSize: 15, color: "#17202A", fontFamily: font.MontserratBold, marginTop: hp("1") }}>Welcome
            Back</Text>
        </View>
        <View style={{
          width: wp("85"),
          height: hp("50"),
          marginTop: hp("3"),
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "transparent",
        }}>
          <View>
            <Text allowFontScaling={false} style={{
              fontSize: 12,
              color: "#17202A",
              fontFamily: font.MontserratBold,
              marginLeft: wp("1"),
            }}>EMAIL</Text>
            <View style={{
              width: wp("85"),
              backgroundColor: "#fff",
              height: 50,
              borderRadius: 10,
              marginTop: hp("1"),
              flexDirection: "row",
              justifyContent: "space-between",
              elevation: 5,
            }}>
              <TextInput
                style={{
                  marginLeft: wp("2"),
                  width: wp("70"),
                  fontFamily: font.MontserratSemiBold,
                  color: "#17202A",
                  fontSize: 12,
                  height: 50,
                }}
                onChangeText={text => {
                  this.props.setEmail(text);
                }}
                allowFontScaling={false}
                placeholder={"EMAIL ADDRESS"}
                underlineColorAndroid="transparent"
                placeholderTextColor="#17202A"
              />
            </View>
          </View>
          <View style={{ marginTop: hp("3") }}>
            <Text allowFontScaling={false} style={{
              fontSize: 12,
              color: "#17202A",
              fontFamily: font.MontserratBold,
              marginLeft: wp("1"),
            }}>PASSWORD</Text>
            <View style={{
              width: wp("85"),
              backgroundColor: "#fff",
              //backgroundColor: "red",
              height: 50,
              borderRadius: 10,
              marginTop: hp("1"),
              flexDirection: "row",
              justifyContent: "space-between",
              elevation: 5,
              alignItems: "center",
            }}>
              <TextInput
                style={{
                  marginLeft: wp("2"),
                  width: wp("70"),
                  fontFamily: font.MontserratSemiBold,
                  fontSize: 12,
                  color: "#17202A",
                  height: 50,
                  //backgroundColor: 'green'
                }}
                onChangeText={text => {
                  this.props.setPassword(text);
                }}
                allowFontScaling={false}
                placeholder={"PASSWORD"}
                underlineColorAndroid="transparent"
                placeholderTextColor="#17202A"
                secureTextEntry={this.state.showPass}
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
                    width: 30,
                    height: 30,
                    marginRight: wp('3'),
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
                    width: 30,
                    height: 30,
                    marginRight: wp('3'),
                  }}
                />
              </TouchableOpacity>
            )}
            </View>
          </View>
          <View style={{
            width: wp("85"),
            height: hp("8"),
            marginTop: hp("2"),
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            //backgroundColor: 'red'
            backgroundColor: "#F8F9F9",
          }}>
            <Text allowFontScaling={false} style={{
              fontSize: 12,
              color: "gray",
              fontFamily: font.MontserratSemiBold,
              marginLeft: wp("1"),
            }}>FORGOT PASSWORD ?</Text>
            <TouchableOpacity onPress={()=>{
              this.loginUser();
            }}>
              <Image source={next} style={{ width: wp("11"), height: hp("7") }} />
            </TouchableOpacity>
          </View>
          {/*-------------------------------------------------------------------------------------------*/}
          <View style={{
            width: wp("85"),
            height: hp("5"),
            marginTop: hp("1"),
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            //backgroundColor: 'red'
            backgroundColor: "#F8F9F9",
          }}>
            <Text allowFontScaling={false} style={{
              fontSize: 12,
              color: "gray",
              fontFamily: font.MontserratSemiBold,
              //marginLeft: wp('1')
            }}>DON'T HAVE AN ACCOUNT ?</Text>
            <TouchableOpacity onPress={()=>{
              Actions.signUp();
            }}>
            <Text allowFontScaling={false} style={{
              fontSize: 13,
              color: "#D68910",
              fontFamily: font.MontserratBold,
              marginLeft: wp("1"),
            }}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          {/*-------------------------------------------------------------------------------------------*/}
          <View style={{
            width: wp("85"),
            height: hp("5"),
            marginTop: hp("2"),
            alignItems: "center",
            justifyContent: "center",
            //backgroundColor: 'red'
            backgroundColor: "#F8F9F9",
          }}>
            <Text allowFontScaling={false} style={{
              fontSize: 12,
              color: "gray",
              fontFamily: font.MontserratSemiBold,
              //marginLeft: wp('1')
            }}>By creating an account, you agree to our</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text allowFontScaling={false} style={{
                fontSize: 12,
                color: "#D68910",
                fontFamily: font.MontserratBold,
                marginLeft: wp("1"),
              }}>Terms of Condition</Text>
              <Text allowFontScaling={false} style={{
                fontSize: 12,
                color: "gray",
                fontFamily: font.MontserratBold,
                marginLeft: wp("1"),
              }}>and</Text>
              <Text allowFontScaling={false} style={{
                fontSize: 12,
                color: "#D68910",
                fontFamily: font.MontserratBold,
                marginLeft: wp("1"),
              }}>Privacy Policy</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.login.userEmail,
    userPassword: state.login.userPassword,
    userToken: state.login.userToken,
    deviceId: state.login.deviceId,
  };
};

export default connect(
  mapStateToProps,
  {
    setEmail,
    setPassword,
    getUserToken,
    LoginUser,
  },
)(LoginScreen);
