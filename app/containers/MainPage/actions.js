import mainPageConstants from './constants';

export default {
  mainPageLoading: () => ({
    type: mainPageConstants.MAIN_PAGE_LOADING,
  }),
  mainPageLoadingSuccess: ({ user }) => ({
    type: mainPageConstants.MAIN_PAGE_LOADING_SUCCUSS,
    user,
  }),
  mainPageLoadingFailure: ({ error }) => ({
    type: mainPageConstants.MAIN_PAGE_LOADING_FAILURE,
    error,
  }),

  prepareSlider: () => ({
    type: mainPageConstants.PREPARE_SLIDER,
  }),
  prepareSliderSucces: (images) => ({
    type: mainPageConstants.PREPARE_SLIDER_SUCCESS,
    images,
  }),
  prepareSliderFailure: (error) => ({
    type: mainPageConstants.PREPARE_SLIDER_FAILURE,
    error,
  }),
  signOut: () => ({
    type: mainPageConstants.SIGN_OUT,
  }),
  headToCreatePortfolio: () => ({
    type: mainPageConstants.HEAD_TO_CREARTE_PORTFOLIO,
  }),
};
