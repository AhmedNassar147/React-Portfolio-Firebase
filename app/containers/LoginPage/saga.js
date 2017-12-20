import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import loginConstants from './constants';
import loginActions from './actions';
import firebase, { database } from '../../utils/firebase';

const formselector = (state) => state.get('loginPage').toJS();
export function* loginRequestSaga() {
  try {
    const { loginFormData } = yield select(formselector);
    const errors = validateLoginForm(loginFormData);
    if (Object.keys(errors).length > 0) {
      yield put(loginActions.loginFailure(errors));
    }
    let userLoginAuth = yield firebase
      .auth()
      .signInWithEmailAndPassword(loginFormData.email, loginFormData.password);
    userLoginAuth = userLoginAuth.toJSON();
    const snapshat = yield database
      .ref(`/Users/${userLoginAuth.uid}/`)
      .once('value');
    const currentUser = snapshat.val();
    localStorage.setItem('user', JSON.stringify(currentUser));
    yield put(loginActions.loginSuccess(currentUser));
    yield put(push('/main'));
  } catch (error) {
    console.log(error);
  }
}

function validateLoginForm({ email, password }) {
  const errors = {};
  const regsExForEmail = new RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  ).test(email);

  const regExForPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  ).test(password);
  if (!regsExForEmail || !email) {
    errors.email = 'required field and should like xxxx123@xxxx.com';
  } else {
    errors.email = '';
  }
  if (!regExForPassword || !password) {
    errors.password =
      'required field and must contains at least 1 lowercase alphabetical,special ,numeric, lower,uperCase and 8 character';
  } else {
    errors.password = '';
  }
  return errors;
}

export function* requestLoginPageFromMainPageSaga() {
  try {
    // eslint-disable-next-line
    let isUserExist = localStorage.getItem('user');
    if (isUserExist) {
      yield put(push('/main'));
    }
    if (!isUserExist) {
      yield put(push('/'));
    }
  } catch (error) {
    console.log('error when try to request to LoginPage from Main', error);
  }
}
export function* requestLoginPageFromAdminPageSaga() {
  try {
    const isAdminExist = localStorage.getItem('admin');
    const isUserExist = localStorage.getItem('user');
    if (isAdminExist) {
      yield put(push('/adminPage'));
    }
    if (!isUserExist) {
      yield put(push('/'));
    }
  } catch (error) {
    console.log('error when try to request to LoginPage from Main', error);
  }
}
export default function* defaultSaga() {
  yield [takeLatest(loginConstants.LOGIN_REQUEST, loginRequestSaga)];
  yield [
    takeLatest(
      loginConstants.REQUEST_LOGINPAGE_FROM_MAINPAGE,
      requestLoginPageFromMainPageSaga
    ),
  ];
  yield [
    takeLatest(
      loginConstants.REQUEST_LOGINPAGE_FROM_ADMINPAGE,
      requestLoginPageFromAdminPageSaga
    ),
  ];
}
