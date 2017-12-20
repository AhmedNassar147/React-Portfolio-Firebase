import adminPageConstants from './constants';

export default {
  // when adminPage loading
  adminPageLoading: () => ({
    type: adminPageConstants.ADMIN_PAGE_LOADING,
  }),
  adminPageLoadingSuccess: ({ user }) => ({
    type: adminPageConstants.ADMIN_PAGE_LOADING_SUCCESS,
    user,
  }),
  adminPageLoadingFailure: ({ error }) => ({
    type: adminPageConstants.ADMIN_PAGE_LOADING_FAILURE,
    error,
  }),

  // input caption changed
  inputChanged: ({ inputName, inputValue }) => ({
    type: adminPageConstants.INPUT_CHANGED,
    inputName,
    inputValue,
  }),

  // create new admin form change
  dialogAdminFormChanged: ({ name, value }) => ({
    type: adminPageConstants.DIALOG_ADMIN_FORM_CHANGED,
    name,
    value,
  }),

  // create new admin
  requestCreateNewAdmin: () => ({
    type: adminPageConstants.REQUEST_CREATE_NEW_ADMIN,
  }),
  adminCreatedSuccessfully: (newAdmin) => ({
    type: adminPageConstants.ADMIN_CREATED_SUCCESSFULLY,
    newAdmin,
  }),

  adminCreatedFailure: (error) => ({
    type: adminPageConstants.ADMIN_CREATED_FAILURE,
    error,
  }),
  adminDialogError: (errors) => ({
    type: adminPageConstants.NEW_ADMIN_DIALOG_ERRORS,
    errors,
  }),
  logout: () => ({
    type: adminPageConstants.LOG_OUT,
  }),
};
