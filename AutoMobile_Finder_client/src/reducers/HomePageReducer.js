const INITIAL_STATE = {
  currentLon: null,
  currentLan: null,
  locationAddress: '',
  cityName: '',
  locationLan: null,
  locationLon: null,
  cityes: [],
  notifications: [],
  requestHistories: [],
  favorites: [],
  cityId: null,
  locationsData: [],
  customerData: [],
  garageName: '',
  garageId: null,
  footerName: 'home',
  garageData: [],
  garageLat: null,
  garageLon: null,
  vehicleType: '',
  vehicleBrand: '',
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_SELECTED_LOCATION_LATITUDE':
      return {...state, locationLan: action.payload};
    case 'GET_SELECTED_LOCATION_LONGITUDE':
      return {...state, locationLon: action.payload};
    case 'GET_USER_CURRENT_LOCATION_ADDRESS':
      return {...state, locationAddress: action.payload};
    case 'GET_USER_CURRENT_LOCATION_LATITUDE':
      return {...state, currentLan: action.payload};
    case 'GET_USER_CURRENT_LOCATION_LONGITUDE':
      return {...state, currentLon: action.payload};
    case 'GET_ALL_CITIES':
      return {...state, cityes: action.payload};
    case 'GET_CUSTOMER_DATA':
      return {...state, customerData: action.payload};
    case 'SET_FOOTER_TAB':
      return {...state, footerName: action.payload};
    case 'GET_GARAGE_LOCATIONS':
      return {...state, locationsData: action.payload};
    case 'GET_CURRENT_CITY_NAME':
      return {...state, cityName: action.payload};
    case 'GET_CITY_ID':
      return {...state, cityId: action.payload};
    case 'GET_SELECTED_GARAGE_NAME':
      return {...state, garageName: action.payload};
    case 'GET_SELECTED_GARAGE_ID':
      return {...state, garageId: action.payload};
    case 'GET_SELECTED_GARAGE_DATA':
      return {...state, garageData: action.payload};
    case 'GET_SELECTED_GARAGE_LATITUDE':
      return {...state, garageLat: action.payload};
    case 'GET_SELECTED_GARAGE_LONGITUDE':
      return {...state, garageLon: action.payload};
    case 'GET_VEHICLE_TYPE':
      return {...state, vehicleType: action.payload};
    case 'GET_VEHICLE_BRAND':
      return {...state, vehicleBrand: action.payload};
    case 'GET_MESSAGE':
      return {...state, message: action.payload};
    case 'GET_USER_NOTIFICATION':
      return {...state, notifications: action.payload};
    case 'GET_USER_REQUEST_HISTORY':
      return {...state, requestHistories: action.payload};
    case 'GET_USER_SELECTED_FAVORITE_PLACES':
      return {...state, favorites: action.payload};
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
