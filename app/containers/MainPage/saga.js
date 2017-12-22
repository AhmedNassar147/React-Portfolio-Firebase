import { put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import MainActions from './actions';
import MainConstants from './constants';
import { database } from '../../utils/firebase';
import mapObject from '../../utils/transObjectIntoArray';

export function* MainPageLoadingSaga() {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      yield put(
        MainActions.mainPageLoadingFailure({ error: 'there is no user' })
      );
      yield put(push('/'));
    }
    if (user) {
      yield put(MainActions.mainPageLoadingSuccess({ user: JSON.parse(user) }));
    }
  } catch (error) {
    yield put(MainActions.mainPageLoadingFailure(error));
  }
}

export function* PrepareSliderSaga() {
  try {
    const sliderImages = yield database.ref('sliderImages').once('value');
    const sliderImagesArray = [];
    mapObject(sliderImages.val())((slideImage) =>
      sliderImagesArray.push(slideImage)
    );
    yield put(MainActions.prepareSliderSucces(sliderImagesArray));
  } catch (error) {
    yield put(MainActions.prepareSliderFailure(error));
  }
}

export function* signOutSage() {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      localStorage.clear();
      yield put(push('/'));
    }
  } catch (error) {
    //eslint-disable-next-line
    console.log('error in signout', error);
  }
}

export function* headToUserProfile() {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      yield put(push('/userProfile'));
    }
  } catch (error) {
    //eslint-disable-next-line
    console.log('error when head to create portfolio page', error);
  }
}

const formSelectorId = (globalState) => globalState.get('global').toJS();
// adding user personal data
const formSelector = (state) => state.get('mainPage').toJS();
export function* requestAddPersonalInfoSaga() {
  try {
    const { personalinfoFormData } = yield select(formSelector);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;

    const userInfo = {
      uid,
      ...personalinfoFormData,
    };
    yield put(MainActions.addingInfoSuccess(userInfo));
    setUserInfoToDatabase(userInfo);
  } catch (error) {
    yield put(MainActions.addingInfoFailed(error));
  }
}

const setUserInfoToDatabase = async ({
  uid,
  fullname,
  postion,
  address,
  phone,
  email,
  gitEmail,
  linkedEmail,
  summary,
}) => {
  try {
    const userData = {
      fullname,
      postion,
      address,
      phone,
      email,
      gitEmail,
      linkedEmail,
      summary,
    };
    await database.ref(`/Portfolios/${uid}/personalInfo`).set(userData);
    return userData;
  } catch (error) {
    return false;
  }
};

// adding user skills
export function* requestAddUserSkillsSaga() {
  try {
    const formSelectorSkills = (state) => state.get('mainPage').toJS();
    const { skillsFormData } = yield select(formSelectorSkills);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;

    const userSkills = {
      uid,
      ...skillsFormData,
    };
    yield put(MainActions.addingSkillsSuccess(userSkills));
    setUserSkillsToDatabase(userSkills);
  } catch (error) {
    yield put(MainActions.addingSkillsFailed(error));
  }
}

const setUserSkillsToDatabase = async (userSkills) => {
  try {
    await database.ref(`/Portfolios/${userSkills.uid}/Skills`).push(userSkills);
    return userSkills;
  } catch (error) {
    return false;
  }
};

// addding user experience
export function* requestAddUserExperience() {
  try {
    const formSelectorExperience = (state) =>
      state.get('mainPage').toJS();
    const { userExperieceFormData } = yield select(formSelectorExperience);
    const { datePickerData } = yield select(formSelectorExperience);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;
    const from = datePickerData.fromDate;
    const to = datePickerData.toDate;

    const userExperience = {
      uid,
      ...userExperieceFormData,
      fromDate: JSON.stringify(from),
      toDate: JSON.stringify(to),
    };
    yield put(MainActions.addExperienceSuccess(userExperience));
    setUserExperienceToDatabase(userExperience);
  } catch (error) {
    yield put(MainActions.addExperienceFailure(error));
  }
}

const setUserExperienceToDatabase = async ({
  uid,
  companyName,
  companyAddress,
  position,
  fromDate,
  toDate,
}) => {
  try {
    const userExperience = {
      companyName,
      companyAddress,
      position,
      fromDate,
      toDate,
    };
    await database.ref(`/Portfolios/${uid}/Experience`).push(userExperience);
    return userExperience;
  } catch (error) {
    return false;
  }
};

// adding user education data
export function* requestAddUserEducationSaga() {
  try {
    const formSelectUserEduc = (state) =>
      state.get('mainPage').toJS();
    const { userEducationFormData } = yield select(formSelectUserEduc);
    const { dropdownChangedData } = yield select(formSelectUserEduc);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;
    const userEducation = {
      ...userEducationFormData,
      ...dropdownChangedData,
      uid,
    };
    yield put(MainActions.addEducationSuccess(userEducation));
    setUserEducationDataToDatabase(userEducation);
  } catch (error) {
    yield put(MainActions.addEducationFailure(error));
  }
}

const setUserEducationDataToDatabase = async ({
  school,
  degree,
  studyField,
  grade,
  fromYear,
  toYear,
  uid,
}) => {
  try {
    const userEducation = {
      school,
      degree,
      studyField,
      grade,
      fromYear,
      toYear,
    };
    await database.ref(`/Portfolios/${uid}/Education`).push(userEducation);
    return userEducation;
  } catch (error) {
    return false;
  }
};
// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(MainConstants.MAIN_PAGE_LOADING, MainPageLoadingSaga)];
  yield [takeLatest(MainConstants.PREPARE_SLIDER, PrepareSliderSaga)];
  yield [takeLatest(MainConstants.SIGN_OUT, signOutSage)];

  yield [
    takeLatest(MainConstants.HEAD_TO_USER_PROFILE, headToUserProfile),
  ];
  yield [
    takeLatest(
      MainConstants.REQUEST_ADD_PERSONAL_INFO,
      requestAddPersonalInfoSaga
    ),
  ];

  yield [
    takeLatest(
      MainConstants.REQUEST_ADD_SKILLS,
      requestAddUserSkillsSaga
    ),
  ];

  yield [
    takeLatest(
      MainConstants.REQUEST_ADD_EXPERIENCE,
      requestAddUserExperience
    ),
  ];
  yield [
    takeLatest(
      MainConstants.REQUEST_ADD_EDUCATION,
      requestAddUserEducationSaga
    ),
  ];
}
