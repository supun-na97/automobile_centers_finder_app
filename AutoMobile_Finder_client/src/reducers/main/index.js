import {combineReducers} from 'redux';

import Login from '../LoginReducer';
import SignUp from '../SignupReducer';
import Home from '../HomePageReducer';

export default combineReducers({
  login: Login,
  signup: SignUp,
  home: Home,
});
