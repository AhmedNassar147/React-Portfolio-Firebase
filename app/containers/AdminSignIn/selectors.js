import { createSelector } from 'reselect';

/**
 * Direct selector to the adminSignIn state domain
 */
const selectAdminSignInDomain = (state) => state.get('adminSignIn');

export const makeSelectLoginFormAdminChanged = () =>
  createSelector(selectAdminSignInDomain, (substate) =>
    substate.get('loginFormAdminData').toJS()
  );

export const makeSelectAdminLoginFormErrors = () =>
  createSelector(selectAdminSignInDomain, (substate) =>
    substate.get('errors').toJS()
  );
export const makeSelectAdminLoginRequestError = () =>
  createSelector(selectAdminSignInDomain, (substate) =>
    substate.get('error').toJS()
  );

const makeSelectAdminSignIn = () =>
  createSelector(selectAdminSignInDomain, (substate) => substate.toJS());

export default makeSelectAdminSignIn;
export { selectAdminSignInDomain };
