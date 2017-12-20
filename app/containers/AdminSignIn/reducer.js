import { fromJS } from 'immutable';
import loginActions from './constants';

const initialState = fromJS({
  loginFormAdminData: {},
  errors: {
    email: '',
    password: '',
  },
  error: {},
});

function adminSignInReducer(state = initialState, action) {
  const oldState = state.toJS();

  switch (action.type) {
    case loginActions.LOGIN_FORM_ADMIN_CHANGED:
      return state.merge({
        loginFormAdminData: {
          ...oldState.loginFormAdminData,
          [action.inputName]: action.inputValue,
        },
      });

    case loginActions.LOGIN_ERRORS:
      return state.merge({
        errors: action.errors,
      });

    case loginActions.LOGIN_FAILURE:
      return state.merge({
        erorr: action.error,
      });

    default:
      return state;
  }
}

export default adminSignInReducer;
