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
import Styles from "../styles/settingPageStyle";
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
import {
  LoginOut
} from '../actions/HomePageAction';
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

class SettingScreen extends React.Component {
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
          height: hp("35"),
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#D68910",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
          <View style={{
            width: wp("90"),
            height: hp("8"),
            alignItems: "flex-start",
            //backgroundColor: 'red',
            justifyContent: "flex-end",
          }}>
            <TouchableOpacity onPress={()=>{
              Actions.home();
            }}>
              <Image source={back} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
          <View style={{
            width: wp("90"),
            height: hp("15"),
            alignItems: "center",
            //backgroundColor: 'red',
            justifyContent: "center",
          }}>
            <Image source={user} style={{ width: 110, height: 110 }} />
          </View>
          <View style={{
            width: wp("90"),
            height: hp("4.5"),
            alignItems: "center",
            //backgroundColor: 'red',
            justifyContent: "flex-end",
          }}>
            <Text allowFontScaling={false}
                  style={{ fontSize: 20, fontFamily: font.MontserratSemiBold, color: "white" }}>
              {this.props.customerData[0].name}
            </Text>
          </View>
          <View style={{
            width: wp("90"),
            height: hp("4"),
            alignItems: "center",
            //backgroundColor: 'yellow',
            justifyContent: "center",
          }}>
            <Text allowFontScaling={false}
                  style={{ fontSize: 20, fontFamily: font.MontserratSemiBold, color: "white" }}>
              {this.props.customerData[0].phone_number}
            </Text>
          </View>

        </View>
        <View style={{
          width: wp("80"),
          height: hp("10"),
          //backgroundColor: "red",
          marginTop: hp("2"),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <View style={{
            width: wp("60"),
            height: hp("10"),
            //backgroundColor: "green",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
            <Image source={icon1} style={Styles.icons} />
            <Text allowFontScaling={false}
                  style={Styles.texts}>
              Profile
            </Text>
          </View>
          <TouchableOpacity onPress={()=> {
            Actions.profile();
          }}>
          <Image source={next} style={Styles.nextIcons} />
          </TouchableOpacity>
        </View>
        <View style={{ width: wp("85"), borderWidth: 0.5, borderColor: "silver" }} />
        <View style={{
          width: wp("80"),
          height: hp("10"),
          //backgroundColor: "red",
          marginTop: hp("2"),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <View style={{
            width: wp("60"),
            height: hp("10"),
            //backgroundColor: "green",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
            <Image source={icon2} style={Styles.icons} />
            <Text allowFontScaling={false}
                  style={Styles.texts}>
              History
            </Text>
          </View>
          <TouchableOpacity onPress={()=>{
            Actions.reqHistory();
          }}>
          <Image source={next} style={Styles.nextIcons} />
          </TouchableOpacity>
        </View>
        <View style={{ width: wp("85"), borderWidth: 0.5, borderColor: "silver" }} />
        <View style={{
          width: wp("80"),
          height: hp("10"),
          //backgroundColor: "red",
          marginTop: hp("2"),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <View style={{
            width: wp("60"),
            height: hp("10"),
            //backgroundColor: "green",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
            <Image source={icon3} style={Styles.icons} />
            <Text allowFontScaling={false}
                  style={Styles.texts}>
              Favourite
            </Text>
          </View>
          <TouchableOpacity onPress={()=>{
            Actions.fav();
          }}>
          <Image source={next} style={Styles.nextIcons} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=> {
          this.props.LoginOut(this.props.userToken);
        }} style={{
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
            Log Out
          </Text>
        </TouchableOpacity>
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
    LoginOut,
  },
)(SettingScreen);
