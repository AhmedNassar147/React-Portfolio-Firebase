import { fromJS } from 'immutable';
import adminPageContants from './constants';

const initialState = fromJS({
  inputCaption: {},
  dialogAdminData: {},
  newAdmin: {},
  error: {},
  errors: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
});

function adminPageReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case adminPageContants.INPUT_CHANGED:
      return state.merge({
        inputCaption: {
          ...oldState.inputCaption,
          [action.inputName]: action.inputValue,
        },
      });

    case adminPageContants.DIALOG_ADMIN_FORM_CHANGED:
      return state.merge({
        dialogAdminData: {
          ...oldState.dialogAdminData,
          [action.name]: action.value,
        },
      });
    case adminPageContants.ADMIN_CREATED_SUCCESSFULLY:
      return state.merge({
        newAdmin: action.newAdmin,
      });
    case adminPageContants.ADMIN_CREATED_FAILURE:
      return state.merge({
        error: action.error,
      });
    case adminPageContants.NEW_ADMIN_DIALOG_ERRORS:
      return state.merge({
        errors: action.errors,
      });
    default:
      return state;
  }
}

export default adminPageReducer;
