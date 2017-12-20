import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import createPortfolioActions from './actions';
import createPortfolioConstants from './constants';
import { database } from '../../utils/firebase';

// testing if user is member to loading page
export function* createUserPortfolioPageLoadingSaga() {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      yield put(
        createPortfolioActions.createUserPageLoadingFailed({
          error: 'there is no user',
        })
      );
      yield put(push('/main'));
    }
    if (user) {
      yield put(
        createPortfolioActions.createUserPageLoadingSuccess({
          user: JSON.parse(user),
        })
      );
    }
  } catch (error) {
    yield put(createPortfolioActions.createUserPageLoadingFailed(error));
  }
}

const formSelectorId = (globalState) => globalState.get('global').toJS();

// adding user personal data
const formSelector = (state) => state.get('createUserPortfolio').toJS();
export function* requestAddPersonalInfoSaga() {
  try {
    const { personalinfoFormData } = yield select(formSelector);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;

    const userInfo = {
      uid,
      ...personalinfoFormData,
    };
    yield put(createPortfolioActions.addingInfoSuccess(userInfo));
    setUserInfoToDatabase(userInfo);
  } catch (error) {
    yield put(createPortfolioActions.addingInfoFailed(error));
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
const formSelectorSkills = (state) => state.get('createUserPortfolio').toJS();
export function* requestAddUserSkillsSaga() {
  try {
    const { skillsFormData } = yield select(formSelectorSkills);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;

    const userSkills = {
      uid,
      ...skillsFormData,
    };
    yield put(createPortfolioActions.addingSkillsSuccess(userSkills));
    setUserSkillsToDatabase(userSkills);
  } catch (error) {
    yield put(createPortfolioActions.addingSkillsFailed(error));
  }
}

const setUserSkillsToDatabase = async (userSkills) => {
  try {
    await database.ref(`/Portfolios/${userSkills.uid}/Skills`).set(userSkills);
    return userSkills;
  } catch (error) {
    return false;
  }
};

// addding user experience
export function* requestAddUserExperience() {
  try {
    const formSelectorExperience = (state) =>
      state.get('createUserPortfolio').toJS();
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
    yield put(createPortfolioActions.addExperienceSuccess(userExperience));
    setUserExperienceToDatabase(userExperience);
  } catch (error) {
    yield put(createPortfolioActions.addExperienceFailure(error));
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
      state.get('createUserPortfolio').toJS();
    const { userEducationFormData } = yield select(formSelectUserEduc);
    const { dropdownChangedData } = yield select(formSelectUserEduc);
    const { userData } = yield select(formSelectorId);
    const uid = userData.user.uid;
    const userEducation = {
      ...userEducationFormData,
      ...dropdownChangedData,
      uid,
    };
    yield put(createPortfolioActions.addEducationSuccess(userEducation));
    setUserEducationDataToDatabase(userEducation);
  } catch (error) {
    yield put(createPortfolioActions.addEducationFailure(error));
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

export default function* defaultSaga() {
  yield [
    takeLatest(
      createPortfolioConstants.CREATE_USER_PORTFOLIO_PAGE_LOADING,
      createUserPortfolioPageLoadingSaga
    ),
  ];

  yield [
    takeLatest(
      createPortfolioConstants.REQUEST_ADD_PERSONAL_INFO,
      requestAddPersonalInfoSaga
    ),
  ];

  yield [
    takeLatest(
      createPortfolioConstants.REQUEST_ADD_SKILLS,
      requestAddUserSkillsSaga
    ),
  ];

  yield [
    takeLatest(
      createPortfolioConstants.REQUEST_ADD_EXPERIENCE,
      requestAddUserExperience
    ),
  ];
  yield [
    takeLatest(
      createPortfolioConstants.REQUEST_ADD_EDUCATION,
      requestAddUserEducationSaga
    ),
  ];
}
