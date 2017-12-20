import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import signUpConstants from './constants';
import signUpActions from './actions';
import firebase, { database } from '../../utils/firebase';

// request sign up , check form data validation to make user auth and set into database
const formselector = (state) => state.get('signUpPage').toJS();
export function* signUpRequestSaga() {
  try {
    const { signUpFormData } = yield select(formselector);
    const errors = validatesignUpForm(signUpFormData);
    if (Object.keys(errors).length > 0) {
      yield put(signUpActions.signUpFailure(errors));
    }
    const userAuthentication = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        signUpFormData.email,
        signUpFormData.confirmPassword
      );
    yield userAuthentication.updateProfile({
      displayName: `${signUpFormData.firstname} ${signUpFormData.lastname}`,
    });
    const updateUser = userAuthentication.toJSON();
    const userIdAndDisplayName = {
      uid: updateUser.uid,
      displayName: updateUser.displayName,
    };

    const userData = {
      ...signUpFormData,
      ...userIdAndDisplayName,
    };

    const strigfiedData = JSON.stringify(userData);
    localStorage.setItem('user', strigfiedData);
    yield put(signUpActions.signUpSuccess({ user: userData }));
    setUserIntoDatabase(userData);
    yield put(push('/main'));
  } catch (error) {
    console.log('error when try to request to signup', error);
  }
}

// validation
function validatesignUpForm({
  firstname,
  lastname,
  email,
  phone,
  password,
  confirmPassword,
}) {
  // eslint-disable-next-line
  let errors = {};

  const regExForText = new RegExp('^[a-zA-Z]+$').test(firstname, lastname);

  const regsExForEmail = new RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  ).test(email);

  const regExphone = new RegExp(
    /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{5}$/
  ).test(phone);

  const regExForPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  ).test(password);

  if (!regExForText || !firstname) {
    errors.firstname = 'required field and should be letters';
  } else {
    errors.firstname = '';
  }
  if (!regExForText || !lastname) {
    errors.lastname = 'required field and should be letters';
  } else {
    errors.lastname = '';
  }
  if (!regsExForEmail || !email) {
    errors.email = 'required field and should like xxxx123@xxxx.com';
  } else {
    errors.email = '';
  }
  if (!regExphone || !phone) {
    errors.phone = 'required field and should not has more than 11 number';
  } else {
    errors.phone = '';
  }

  if (!regExForPassword || !password) {
    errors.password =
      'required field and must contains at least 1 lowercase alphabetical,special ,numeric, lower,uperCase and 8 character';
  } else {
    errors.password = '';
  }
  if (confirmPassword !== password || !confirmPassword) {
    errors.confirmPassword =
      'required field and should match with password field';
  } else {
    errors.confirmPassword = '';
  }
  return errors;
}

// async func to set user into db
const setUserIntoDatabase = async ({
  uid,
  firstname,
  lastname,
  email,
  phone,
  password,
  confirmPassword,
  displayName,
}) => {
  try {
    const currentUserData = {
      firstname,
      lastname,
      email,
      password,
      phone,
      confirmPassword,
      displayName,
      uid,
    };
    await database.ref(`/Users/${uid}`).set(currentUserData);
    return currentUserData;
  } catch (error) {
    return false;
  }
};

export function* requestSignUpPageFromMainPage() {
  try {
    // eslint-disable-next-line
    let isUserExist = localStorage.getItem('user');
    if (isUserExist) {
      yield put(push('/main'));
      return;
    }
    if (!isUserExist) {
      yield put(push('/signUp'));
    }
  } catch (error) {
    console.log('error when try to request to SignUp from Main', error);
  }
}

export default function* defaultSaga() {
  yield [takeLatest(signUpConstants.SIGNUP_REQUEST, signUpRequestSaga)];
  yield [
    takeLatest(
      signUpConstants.REQUEST_SIGNUPPAGE_FROM_MAINPAGE,
      requestSignUpPageFromMainPage
    ),
  ];
}
