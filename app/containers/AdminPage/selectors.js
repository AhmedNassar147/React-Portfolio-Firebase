import { createSelector } from 'reselect';

/**
 * Direct selector to the adminPage state domain
 */
const selectAdminPageDomain = (state) => state.get('adminPage');

export const makeSelectInputCation = () =>
  createSelector(selectAdminPageDomain, (substate) =>
    substate.get('inputCaption').toJS()
  );

export const makeSelectDialogAdminData = () =>
  createSelector(selectAdminPageDomain, (substate) =>
    substate.get('dialogAdminData').toJS()
  );

export const makeSelectCreateNewAdmin = () =>
  createSelector(selectAdminPageDomain, (substate) =>
    substate.get('newAdmin').toJS()
  );

export const makeSelectServerError = () =>
  createSelector(selectAdminPageDomain, (substate) =>
    substate.get('error').toJS()
  );

export const makeSelectDialogErrors = () =>
  createSelector(selectAdminPageDomain, (substate) =>
    substate.get('errors').toJS()
  );
const makeSelectAdminPage = () =>
  createSelector(selectAdminPageDomain, (substate) => substate.toJS());

export default makeSelectAdminPage;
export { selectAdminPageDomain };
