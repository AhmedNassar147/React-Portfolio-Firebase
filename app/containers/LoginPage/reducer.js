import { fromJS } from 'immutable';
import loginActions from './constants';

const initialState = fromJS({
  loginFormData: {},
  error: {
    email: '',
    password: '',
  },
});

function loginPageReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case loginActions.LOGIN_FORM_CHANGED:
      return state.merge({
        loginFormData: {
          ...oldState.loginFormData,
          [action.inputName]: action.inputValue,
        },
      });
    case loginActions.LOGIN_FAILURE:
      return state.merge({
        error: action.error,
      });
    default:
      return state;
  }
}

export default loginPageReducer;
