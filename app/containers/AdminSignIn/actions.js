import loginConstants from './constants';

export default {
  loginFormAdminChanged: ({ inputName, inputValue }) => ({
    type: loginConstants.LOGIN_FORM_ADMIN_CHANGED,
    inputName,
    inputValue,
  }),
  RequestLoginToAdminPage: () => ({
    type: loginConstants.LOGIN_REQUEST_ADMINPAGE,
  }),
  loginSuccess: (user) => ({
    type: loginConstants.LOGIN_SUCCESS,
    user,
  }),
  loginFailure: (error) => ({
    type: loginConstants.LOGIN_FAILURE,
    error,
  }),

  loginErrors: (errors) => ({
    type: loginConstants.LOGIN_ERRORS,
    errors,
  }),
  requestLoginAdminPageFromAdminPage: () => ({
    type: loginConstants.REQUEST_LOGINPAGE_FROM_ADMINPAGE,
  }),
};
