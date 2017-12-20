import { put, takeLatest } from 'redux-saga/effects';
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

export function* headToCreatePortfolio() {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      yield put(push('/createPortfolio'));
    }
  } catch (error) {
    //eslint-disable-next-line
    console.log('error when head to create portfolio page', error);
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(MainConstants.MAIN_PAGE_LOADING, MainPageLoadingSaga)];
  yield [takeLatest(MainConstants.PREPARE_SLIDER, PrepareSliderSaga)];
  yield [takeLatest(MainConstants.SIGN_OUT, signOutSage)];
  yield [
    takeLatest(MainConstants.HEAD_TO_CREARTE_PORTFOLIO, headToCreatePortfolio),
  ];
}
