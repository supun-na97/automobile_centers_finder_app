import URL from '../url/baseUrl';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMessage} from 'react-native-flash-message';
export const getFullName = text => async dispatch => {
  dispatch({
    type: 'GET_NAME',
    payload: text,
  });
};

export const getCustomerEmail = text => async dispatch => {
  dispatch({
    type: 'GET_EMAIL_ADDRESS',
    payload: text,
  });
};

export const getCustomerContactNumber = text => async dispatch => {
  dispatch({
    type: 'GET_CONTACT_NUMBER',
    payload: text,
  });
};

export const getPassword = text => async dispatch => {
  dispatch({
    type: 'GET_PASSWORD',
    payload: text,
  });
};

export const getConfirmPassword = text => async dispatch => {
  dispatch({
    type: 'GET_CONFIRM_PASSWORD',
    payload: text,
  });
};

export const RegisterUser = data => async dispatch => {
  await URL.post('/auth/user/signup', data)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'GET_USER_TOKEN',
        payload: response.data.access_token,
      });
      if (response.data.access_token !== null || undefined) {
        showMessage({
          message: 'Travel App',
          description: 'User registration successfully',
          type: 'success',
          duration: 1000,
        });
        // AsyncStorage.setItem('userData', JSON.stringify(response.data));
        setTimeout(() => {
          Actions.login();
        }, 1000);
      }
    })
    .catch(function(error) {
      console.log(error.response);
    });
};
