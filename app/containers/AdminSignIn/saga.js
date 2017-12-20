import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import loginConstants from './constants';
import loginActions from './actions';
import firebase, { database } from '../../utils/firebase';

const formselector = (state) => state.get('adminSignIn').toJS();
export function* loginAdminRequestSaga() {
  try {
    const { loginFormAdminData } = yield select(formselector);
    const errors = validateLoginForm(loginFormAdminData);
    if (Object.keys(errors).length > 0) {
      yield put(loginActions.loginErrors(errors));
    }
    let adminLoginAuth = yield firebase
      .auth()
      .signInWithEmailAndPassword(
        loginFormAdminData.email,
        loginFormAdminData.password
      );
    adminLoginAuth = adminLoginAuth.toJSON();
    const snapshat = yield database
      .ref(`/Admins/${adminLoginAuth.uid}/`)
      .once('value');
    const currentAdmin = snapshat.val();
    localStorage.setItem('admin', JSON.stringify(currentAdmin));
    yield put(loginActions.loginSuccess(currentAdmin));
    console.log('currentadmin', currentAdmin);
    yield put(push('/adminPage'));
  } catch (error) {
    yield put(loginActions.loginFailure(error));
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

export function* requestLoginAdminPageFromAdminPage() {
  try {
    const isAdminExist = localStorage.getItem('admin');
    if (isAdminExist) {
      yield put(push('/adminPage'));
    }
    if (!isAdminExist) {
      yield put(push('/admin'));
    }
  } catch (error) {
    console.log('error when try to get loginAdminPage', error);
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(loginConstants.LOGIN_REQUEST_ADMINPAGE, loginAdminRequestSaga),
  ];
  yield [
    takeLatest(
      loginConstants.REQUEST_LOGINPAGE_FROM_ADMINPAGE,
      requestLoginAdminPageFromAdminPage
    ),
  ];
}
