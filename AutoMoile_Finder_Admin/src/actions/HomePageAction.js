import URL from '../url/baseUrl';
import async from 'async';
import {AsyncStorage} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Actions} from 'react-native-router-flux';

export const footerTabChange = (text) => async (dispatch) => {
  dispatch({
    type: 'SET_FOOTER_TAB',
    payload: text,
  });
};

export const SelectedTxt = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_TRIP_TYPE_TEXT',
    payload: text,
  });
};

export const GetCurrentCityName = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_CURRENT_CITY_NAME',
    payload: text,
  });
};

export const GetCurrentCityId = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_CITY_ID',
    payload: text,
  });
};

export const GetVehicleType = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_VEHICLE_TYPE',
    payload: text,
  });
};

export const GetVehicleBrand = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_VEHICLE_BRAND',
    payload: text,
  });
};

export const GetTypeMessage = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_MESSAGE',
    payload: text,
  });
};

export const LoginOut = (token) => async (dispatch) => {
  await URL.get('/user/logout', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      showMessage({
        message: 'Auto Mobile',
        description: response.data.message,
        type: 'success',
        duration: 1000,
      });
      AsyncStorage.removeItem('userData');
      AsyncStorage.removeItem('customerData');
      AsyncStorage.clear();
      setTimeout(() => {
        Actions.splash();
      }, 500);
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getAllCityes = (data) => async (dispatch) => {
  await URL.get('/city', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + data,
    },
  })
    .then((response) => {
      //console.log(response.data);
      //console.log(response.data.data);
      dispatch({
        type: 'GET_ALL_CITIES',
        payload: response.data.data,
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getRequestHistory = (data) => async (dispatch) => {
  console.log("API IS WORKING");
  await URL.get('/company/request', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + data,
    },
  })
    .then((response) => {
      //console.log(response.data);
      console.log(response.data.data);
      dispatch({
        type: 'GET_USER_REQUEST_HISTORY',
        payload: response.data.data,
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getAllNotifications = (data) => async (dispatch) => {
  await URL.get('/user/notification_list', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + data,
    },
  })
    .then((response) => {
      //console.log(response.data);
      console.log(response.data.data[0].notification);
      dispatch({
        type: 'GET_USER_NOTIFICATION',
        payload: response.data.data[0].notification,
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getFavoritePlaces = (data) => async (dispatch) => {
  await URL.get('/user/get_popularity', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + data,
    },
  })
    .then((response) => {
      console.log(response.data);
      //console.log(response.data.data[0].notification);
      // dispatch({
      //   type: 'GET_USER_NOTIFICATION',
      //   payload: response.data.data[0].notification,
      // });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getMapData = (data, obj) => async (dispatch) => {
  console.log(obj);
  console.log('Call');
  await URL.post('/user/company_details', obj, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + data,
    },
  })
    .then((response) => {
      //console.log(response.data.data);
      dispatch({
        type: 'GET_GARAGE_LOCATIONS',
        payload: response.data.data,
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const changeCompanyStatus = (obj, token) => async (dispatch) => {
  await URL.post('/user/change_active_status', obj, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      showMessage({
        message: response.data.data.response,
        type: 'success',
        duration: 1000,
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getRequestDetailById = (obj, token) => async (dispatch) => {
  await URL.post('/user/company_request_by_id', obj, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      let array = [];
      array.push(response.data)
      dispatch({
        type: 'GET_REQUESTED_CUSTOMER_DATA',
        payload: array,
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const ReadNotification = (obj, token) => async (dispatch) => {
  await URL.post('/user/read_notification', obj, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      if(response.data.data.response === "notification read successfully"){
        URL.get('/user/notification_list', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
          .then((response1) => {
            //console.log(response.data);
            console.log(response1.data.data[0].notification);
            dispatch({
              type: 'GET_USER_NOTIFICATION',
              payload: response1.data.data[0].notification,
            });
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getCompanyStatus = (data) => async (dispatch) => {
  await URL.get('/user/login_company_detail', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + data,
    },
  })
    .then((response) => {
      console.log(response.data.data);
      dispatch({
        type: 'GET_LOGIN_COMPANY_DATA',
        payload: [response.data.data],
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const RequestGarage = (data, token) => async (dispatch) => {
  console.log(data);
  //let array = [];
  await URL.post('/user/system_request', data, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      showMessage({
        message: 'Request Sent Successfully',
        type: 'success',
        duration: 1000,
      });
      setTimeout(() => {
        Actions.setting();
      }, 1500);
    })
    .catch(function (error) {
      console.log(error.response);
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
        duration: 2000,
      });
    });
};

export const SystemResponse = (data, token) => async (dispatch) => {
  console.log(data);
  //let array = [];
  await URL.post('/user/system_response', data, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      showMessage({
        message: 'Booking Added Successfully',
        type: 'success',
        duration: 1000,
      });
      setTimeout(() => {
        Actions.home();
      }, 1000);
    })
    .catch(function (error) {
      console.log(error.response);
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
        duration: 2000,
      });
    });
};


export const addFavourite = (data, token) => async dispatch => {
  //let array = [];
  await URL.post(`/user/popularity`, data, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(response => {
      console.log(response.data);
      showMessage({
        message: 'Favourite Place Added Success',
        type: 'success',
      });
    })
    .catch(function(error) {
      console.log(error.response);
    });
};

export const getSelectedCityId = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_CITY_ID',
    payload: text,
  });
};

export const getSelectedLocationLatitude = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_LOCATION_LATITUDE',
    payload: text,
  });
};

export const getSelectedLocationLongitude = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_LOCATION_LONGITUDE',
    payload: text,
  });
};

export const getUserCurrentLocationLatitude = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_USER_CURRENT_LOCATION_LATITUDE',
    payload: text,
  });
};

export const getUserCurrentLocationLongitude = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_USER_CURRENT_LOCATION_LONGITUDE',
    payload: text,
  });
};

export const getSelectedLocationAddress = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_USER_CURRENT_LOCATION_ADDRESS',
    payload: text,
  });
};

export const getSelectedGarageName = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_GARAGE_NAME',
    payload: text,
  });
};

export const getSelectedGarageId = (text) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_GARAGE_ID',
    payload: text,
  });
};

export const getSelectedGarageData = (array) => async (dispatch) => {
  dispatch({
    type: 'GET_SELECTED_GARAGE_DATA',
    payload: array,
  });
};

export const getSelectedGarageLocationLatitude = (text) => async (dispatch) => {
  console.log('getSelectedGarageLocationLatitude :' + text);
  dispatch({
    type: 'GET_SELECTED_GARAGE_LATITUDE',
    payload: text,
  });
};

export const getSelectedGarageLocationLongitude = (text) => async (dispatch) => {
  console.log('getSelectedGarageLocationLongitude :' + text);
  dispatch({
    type: 'GET_SELECTED_GARAGE_LONGITUDE',
    payload: text,
  });
};