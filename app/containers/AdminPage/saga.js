import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import adminPageConstants from './constants';
import adminPageActions from './actions';
import firebase, { database } from '../../utils/firebase';

export function* adminPageLoadingSaga() {
  try {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      yield put(
        adminPageActions.adminPageLoadingFailure({
          error: 'there is no admin to load',
        })
      );
      yield put(push('/admin'));
    }
    if (admin) {
      yield put(
        adminPageActions.adminPageLoadingSuccess({ user: JSON.parse(admin) })
      );
    }
  } catch (error) {
    yield put(adminPageActions.adminPageLoadingFailure(error));
  }
}

const formSelector = (state) => state.get('adminPage').toJS();
export function* requestCreateNewAdminSage() {
  try {
    const { dialogAdminData } = yield select(formSelector);
    const errors = validatesignUpForm(dialogAdminData);
    if (Object.keys(errors).length > 0) {
      yield put(adminPageActions.adminDialogError(errors));
    }
    const adminAuth = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        dialogAdminData.email,
        dialogAdminData.password
      );
    yield adminAuth.updateProfile({
      displayName: dialogAdminData.username,
    });
    const updateAdmin = adminAuth.toJSON();
    const adminId = {
      uid: updateAdmin.uid,
    };
    const newAdmin = {
      ...adminId,
      ...dialogAdminData,
    };
    yield put(adminPageActions.adminCreatedSuccessfully(newAdmin));
    setUserIntoDatabase(newAdmin);
    console.log('حبيبي يا  قونصل');
  } catch (error) {
    yield put(adminPageActions.adminCreatedFailure(error));
  }
}

// validate dialog of create new admin
function validatesignUpForm({ username, email, password, confirmPassword }) {
  // eslint-disable-next-line
  let errors = {};

  const regExForText = new RegExp('^[a-zA-Z]+$').test(username);

  const regsExForEmail = new RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  ).test(email);

  const regExForPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  ).test(password);

  if (!regExForText || !username) {
    errors.username = 'required field and should be letters';
  } else {
    errors.username = '';
  }

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

  if (confirmPassword !== password || !confirmPassword) {
    errors.confirmPassword =
      'required field and should match with password field';
  } else {
    errors.confirmPassword = '';
  }
  return errors;
}

// async set data ino database
const setUserIntoDatabase = async ({
  uid,
  username,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const newAdminData = {
      username,
      email,
      password,
      confirmPassword,
      uid,
    };
    await database.ref(`/Admins/${uid}`).set(newAdminData);
    return newAdminData;
  } catch (error) {
    return adminPageActions.adminCreatedFailure(error);
  }
};

// admin log out admin page
export function* adminLogout() {
  try {
    const isAdminExsit = localStorage.getItem('admin');
    if (isAdminExsit) {
      localStorage.clear();
      yield put(push('/admin'));
    }
  } catch (error) {
    console.log('error when admin trying logout', error);
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(adminPageConstants.ADMIN_PAGE_LOADING, adminPageLoadingSaga),
  ];
  yield [
    takeLatest(
      adminPageConstants.REQUEST_CREATE_NEW_ADMIN,
      requestCreateNewAdminSage
    ),
  ];
  yield [takeLatest(adminPageConstants.LOG_OUT, adminLogout)];
}
