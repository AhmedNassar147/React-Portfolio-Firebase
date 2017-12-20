import signUpConstats from './constants';
export default {
  SignUpFormChanged: ({ inputName, inputValue }) => ({
    type: signUpConstats.SIGNUP_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  signUpRequest: () => ({
    type: signUpConstats.SIGNUP_REQUEST,
  }),
  signUpSuccess: (user) => ({
    type: signUpConstats.SIGNUP_SUCCESS,
    user,
  }),
  signUpFailure: (errors) => ({
    type: signUpConstats.SIGNUP_FAILURE,
    errors,
  }),
  RequestSignUpPageFromMainPage: () => ({
    type: signUpConstats.REQUEST_SIGNUPPAGE_FROM_MAINPAGE,
  }),
};
