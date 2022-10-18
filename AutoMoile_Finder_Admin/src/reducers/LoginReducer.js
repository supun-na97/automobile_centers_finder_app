const INITIAL_STATE = {
  userEmail: '',
  userPassword: '',
  userToken: '',
  deviceId: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_EMAIL':
      return {...state, userEmail: action.payload};
    case 'SET_USER_PASSWORD':
      return {...state, userPassword: action.payload};
    case 'GET_USER_TOKEN':
      return {...state, userToken: action.payload};
    case 'GET_FIRE_BASE_TOKEN':
      return {...state, deviceId: action.payload};
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
