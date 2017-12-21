import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

export const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.get('userData').toJS()
  );

const makeSelectSliderImages = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.get('images').toJS()
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) =>
    routeState.get('location').toJS()
  );

const makeSelectRepos = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.getIn(['userData', 'repositories'])
  );

const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('error'));

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectSliderImages,
};
