import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import WelcomeScreen from '../component/WelcomeScreen';
import LoginScreen from '../component/LoginScreen';
import HomeScreen from "../component/HomeScreen";
import SignUpScreen from "../component/SignUpScreen";
import SettingScreen from "../component/SettingScreen";
import MapScreen from "../component/MapScreen";
import ProfileScreen from '../component/ProfileScreen';
import GarageDetailScreen from '../component/GarageDetailScreen';
import MapDirectionScreen from '../component/MapDirectionScreen';
import CityScreen from '../component/CityScreen';
import NotificationScreen from '../component/NotificationScreen';
import RequestHistoryScreen from '../component/RequestHistoryScreen';
import FavoriteLocationScreen from '../component/FavoriteLocationScreen';

const MyTransitionSpec = {
  duration: 600,
};

const transitionConfig = () => ({
  transitionSpec: MyTransitionSpec,
  screenInterpolator: sceneProps => {
    const {layout, position, scene} = sceneProps;
    const {index} = scene;
    const width = layout.initWidth;

    const inputRange = [index - 1, index, index + 1];

    const opacity = position.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange: [width, 0, 0],
    });

    return {
      opacity,
      transform: [{translateX}],
    };
  },
});

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar={true} transitionConfig={transitionConfig}>
        <Scene key="splash" component={WelcomeScreen} initial />
        <Scene key="login" component={LoginScreen} />
        <Scene key="signUp" component={SignUpScreen} />
        <Scene key="home" component={HomeScreen} />
        <Scene key="setting" component={SettingScreen} />
        <Scene key="map" component={MapScreen} />
        <Scene key="profile" component={ProfileScreen} />
        <Scene key="garage" component={GarageDetailScreen} />
        <Scene key="direction" component={MapDirectionScreen} />
        <Scene key="city" component={CityScreen} />
        <Scene key="notification" component={NotificationScreen} />
        <Scene key="reqHistory" component={RequestHistoryScreen} />
        <Scene key="fav" component={FavoriteLocationScreen} />
      </Scene>
    </Router>
  );
};
export default RouterComponent;
