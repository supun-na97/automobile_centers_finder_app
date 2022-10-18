import { Dimensions } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
const { StyleSheet } = React;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { font } from "../utils/Fonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100"),
    height: hp("100"),
    justifyContent: "flex-start",
    //backgroundColor: 'black',
    backgroundColor: "#F8F9F9",
    alignItems: "center",
  },
  textInputView: {
    width: wp("85"),
    backgroundColor: "#fff",
    height: hp("5"),
    borderRadius: 10,
    marginTop: hp("1"),
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
  },
  tInput: {
    marginLeft: wp("2"),
    width: wp("70"),
    fontFamily: font.MontserratSemiBold,
    color: "#17202A",
    fontSize: 12,
    height: hp("5"),
  },
  tView: {
    marginTop: hp("2"),
  },
  tagTxt: {
    fontSize: 12,
    color: "#17202A",
    fontFamily: font.MontserratSemiBold,
    marginLeft: wp("1"),
  },
  signUpButtonView: {
    width: wp("85"),
    height: hp("6"),
    marginTop: hp("2"),
    alignItems: "flex-end",
    justifyContent: "center",
    //flexDirection: 'row',
    //backgroundColor: 'red'
    //backgroundColor: "yellow",
  },
  signInTxtView: {
    width: wp("85"),
    height: hp("3"),
    marginTop: hp("1"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    //backgroundColor: 'yellow'
    //backgroundColor: "#F8F9F9",
  },
  signInTxt: {
    fontSize: 13,
    color: "#D68910",
    fontFamily: font.MontserratBold,
    marginLeft: wp("1"),
  },
  imgView: {
    width: wp("100"),
    height: hp("30"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D68910",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headTxtView: {
    width: wp("85"),
    height: hp("6"),
    marginTop: hp("1"),
    alignItems: "flex-start",
    justifyContent: "center",
    //backgroundColor: "red",
    //backgroundColor: "#F8F9F9",
  },
  bodyView: {
    width: wp("85"),
    height: hp("55"),
    marginTop: hp("2.5"),
    alignItems: "flex-start",
    justifyContent: "flex-start",
    //backgroundColor: "red",
  },
});
