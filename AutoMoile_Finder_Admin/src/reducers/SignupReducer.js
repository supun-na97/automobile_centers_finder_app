const INITIAL_STATE = {
  name: '',
  email: '',
  contactNumber: '',
  password: '',
  confirmPassword: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_NAME':
      return {...state, name: action.payload};
    case 'GET_EMAIL_ADDRESS':
      return {...state, email: action.payload};
    case 'GET_CONTACT_NUMBER':
      return {...state, contactNumber: action.payload};
    case 'GET_PASSWORD':
      return {...state, password: action.payload};
    case 'GET_CONFIRM_PASSWORD':
      return {...state, confirmPassword: action.payload};
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
