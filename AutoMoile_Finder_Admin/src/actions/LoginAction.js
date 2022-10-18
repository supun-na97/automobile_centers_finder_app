import URL from '../url/baseUrl';
import {AsyncStorage} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Actions} from 'react-native-router-flux';

export const setEmail = text => async dispatch => {
  dispatch({
    type: 'SET_USER_EMAIL',
    payload: text,
  });
};

export const setPassword = text => async dispatch => {
  dispatch({
    type: 'SET_USER_PASSWORD',
    payload: text,
  });
};

export const getUserToken = text => async dispatch => {
  dispatch({
    type: 'GET_USER_TOKEN',
    payload: text,
  });
};

export const getDeviceId = (text) => async (dispatch) => {
  console.log('getDeviceId' + '' + text);
  dispatch({
    type: 'GET_FIRE_BASE_TOKEN',
    payload: text,
  });
};

export const getCustomerLoginData = array => async dispatch => {
  dispatch({
    type: 'GET_CUSTOMER_DATA',
    payload: array,
  });
};

export const RegisterDevice = (data, token) => async dispatch => {
  await URL.post('/user/device_register', data ,{
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  })
}

export const LoginUser = (data,fToken) => async dispatch => {
  await URL.post('/auth/user/login', data)
    .then(response => {
      console.log(response.data);
      AsyncStorage.setItem('userData', JSON.stringify(response.data));
      dispatch({
        type: 'GET_USER_TOKEN',
        payload: response.data.access_token,
      });
      showMessage({
        message: 'User login successfully',
        type: 'success',
        duration: 1000,
      });
      if (response.data.access_token !== null || undefined) {
        URL.get('/user/login_company_detail', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + response.data.access_token,
          },
        })
          .then(response1 => {
            console.log(response1.data);
            AsyncStorage.setItem('customerData', JSON.stringify(response1.data.data));
            dispatch({
              type: 'GET_AND_SET_CUSTOMER_NAME',
              payload: response1.data.data.name,
            });
            dispatch({
              type: 'GET_NAME',
              payload: response1.data.data.name,
            })
            dispatch({
              type: 'GET_AND_SET_CUSTOMER_CONTACT_NUMBER',
              payload: response1.data.data.mobile_number,
            });
            URL.post('/user/device_register', {
              "user_id" : response1.data.data.id.toString(),
              "device_token" : fToken,
            },{
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + response.data.access_token,
              },
            })
            .then(response2 => {
              console.log(response2.data);
            })
            .catch(function(error1) {
              console.log(error1.message);  
            })
            setTimeout(() => {
              Actions.home();
            }, 2000);
          })
          .catch(function(error) {
            console.log(error.message);
          });
      }
    })
    .catch(function(error) {
      console.log(error.response);
      showMessage({
        message: 'Login Failed',
        type: 'danger',
        duration: 1000,
      });
    });
};
