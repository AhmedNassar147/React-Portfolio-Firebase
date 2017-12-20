import { fromJS } from 'immutable';
import signUpFormConstants from './constants';
const initialState = fromJS({
  signUpFormData: {},
  error: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  },
});

function signUpPageReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case signUpFormConstants.SIGNUP_FORM_CHANGED:
      return state.merge({
        signUpFormData: {
          ...oldState.signUpFormData,
          [action.inputName]: action.inputValue,
        },
      });
    case signUpFormConstants.SIGNUP_FAILURE:
      return state.merge({
        error: action.errors,
      });
    default:
      return state;
  }
}

export default signUpPageReducer;
