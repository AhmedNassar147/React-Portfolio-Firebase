import loginConstants from './constants';

export default {
  loginFormChanged: ({ inputName, inputValue }) => ({
    type: loginConstants.LOGIN_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  loginRequest: () => ({
    type: loginConstants.LOGIN_REQUEST,
  }),
  loginSuccess: (user) => ({
    type: loginConstants.LOGIN_SUCCESS,
    user,
  }),
  loginFailure: (error) => ({
    type: loginConstants.LOGIN_FAILURE,
    error,
  }),
  requestLoginPageFromMainPage: () => ({
    type: loginConstants.REQUEST_LOGINPAGE_FROM_MAINPAGE,
  }),
  requestLoginPageFromAdminPage: () => ({
    type: loginConstants.REQUEST_LOGINPAGE_FROM_ADMINPAGE,
  }),
};
