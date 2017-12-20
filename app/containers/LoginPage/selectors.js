import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = (state) => state.get('loginPage');

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.toJS());

export const makeSelectLoginFormChanged = () =>
  createSelector(selectLoginPageDomain, (substate) =>
    substate.get('loginFormData').toJS()
  );

export const makeSelectLoginFormErrors = () =>
  createSelector(selectLoginPageDomain, (substate) =>
    substate.get('error').toJS()
  );
export default makeSelectLoginPage;
export { selectLoginPageDomain };
