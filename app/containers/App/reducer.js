import { fromJS } from 'immutable';

import mainConstants from '../../containers/MainPage/constants';
import loginconstants from '../../containers/LoginPage/constants';
import signUpConstants from '../../containers/SignUpPage/constants';
import LoginAdminConstants from '../../containers/AdminSignIn/constants';
import adminPageConstants from '../../containers/AdminPage/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  userData: {},
  images: [],
});
function appReducer(state = initialState, action) {
  switch (action.type) {
    case loginconstants.LOGIN_SUCCESS:
    case signUpConstants.SIGNUP_SUCCESS:
    case mainConstants.MAIN_PAGE_LOADING_SUCCUSS:
    case LoginAdminConstants.LOGIN_SUCCESS:
    case adminPageConstants.ADMIN_PAGE_LOADING_SUCCESS:
      return state.merge({
        userData: action.user,
      });

    case mainConstants.MAIN_PAGE_LOADING_FAILURE:
    case adminPageConstants.ADMIN_PAGE_LOADING_FAILURE:
      return state.merge({
        error: action.error,
      });

    case mainConstants.PREPARE_SLIDER_SUCCESS:
      return state.merge({
        images: action.images,
      });

    default:
      return state;
  }
}

export default appReducer;
