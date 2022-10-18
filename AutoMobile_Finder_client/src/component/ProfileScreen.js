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
import Styles from "../styles/ProfilePageStyle";
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
const icon1 = require("../assets/userYellow.png");
const icon2 = require("../assets/historyYellow.png");
const icon3 = require("../assets/favoriteYellow.png");
const next = require("../assets/next60.png");
const back = require("../assets/backArrow50.png");
const user = require("../assets/userPic.png");

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
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
    this.props.LoginUser(obj);
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={{
          width: wp("100"),
          height: hp("15"),
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#D68910",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
          <View style={{
            width: wp("90"),
            height: hp("8"),
            marginTop: hp('2'),
            flexDirection: 'row',
            alignItems: "center",
            //backgroundColor: 'red',
            justifyContent: "space-between",
          }}>
            <TouchableOpacity onPress={()=>{
              Actions.setting();
            }}>
              <Image source={back} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <Text allowFontScaling={false}
                  style={{ fontSize: 20, fontFamily: font.MontserratSemiBold, color: "white" }}>
              PROFILE
            </Text>
          </View>
        </View>
        <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>NAME</Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={"NAME"}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={text => {
                  //this.props.getFullName(text);
                }}
              />
            </View>
          </View>
          {/* ----------------------------------------------------- */}
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>EMAIL ADDRESS</Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={"EMAIL ADDRESS"}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={text => {
                  //this.props.getCustomerEmail(text);
                }}
              />
            </View>
          </View>
          {/* ----------------------------------------------------- */}
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>CONTACT NUMBER</Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={"CONTACT NUMBER"}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={text => {
                  //this.props.getCustomerContactNumber(text);
                }}
              />
            </View>
          </View>
          {/* ----------------------------------------------------- */}
          <View style={Styles.tView}>
            <Text allowFontScaling={false} style={Styles.tagTxt}>PASSWORD</Text>
            <View style={Styles.textInputView}>
              <TextInput
                style={Styles.tInput}
                allowFontScaling={false}
                placeholder={"Password"}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"
                onChangeText={text => {
                  //this.props.getCustomerContactNumber(text);
                }}
              />
            </View>
          </View>
          <View style={{
          width: wp("80"),
          height: hp("6"),
          backgroundColor: "#D68910",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          //position: 'absolute',
          marginTop: hp("20"),
        }}>
          <Text allowFontScaling={false} style={{ fontSize: 15, fontFamily: font.MontserratMedium, color: "#fff" }}>
            Update
          </Text>
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
    customerData: state.home.customerData,
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
)(ProfileScreen);
