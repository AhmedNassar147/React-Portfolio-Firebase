import { createSelector } from 'reselect';

const selectSignUpPageDomain = (state) => state.get('signUpPage');

const makeSelectSignUpPage = () =>
  createSelector(selectSignUpPageDomain, (substate) => substate.toJS());

export const makeSelectSignUpChangedForm = () =>
  createSelector(selectSignUpPageDomain, (substate) =>
    substate.get('signUpFormData').toJS()
  );

export const makeSelectSignUpErrorsValidation = () =>
  createSelector(selectSignUpPageDomain, (substate) =>
    substate.get('error').toJS()
  );
export default makeSelectSignUpPage;
export { selectSignUpPageDomain };
