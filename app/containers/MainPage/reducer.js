import { fromJS } from 'immutable';
import mainpageConstants from './constants';

const initialState = fromJS({
  personalinfoFormData: {},
  skillsFormData: {},
  userExperieceFormData: {},
  datePickerData: {},
  userEducationFormData: {},
  dropdownChangedData: {},

  personalInfo: {},
  userSkills: {},
  userExperience: {},
  userEducation: {},

  error: false,
});

function mainPageReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case mainpageConstants.PERSONAL_INFO_FORM_CHANGED:
      return state.merge({
        personalinfoFormData: {
          ...oldState.personalinfoFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case mainpageConstants.SKILLS_FORM_CHANGED:
      return state.merge({
        skillsFormData: {
          ...oldState.skillsFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case mainpageConstants.USER_EXPERIENCE_FORM_CHANGED:
      return state.merge({
        userExperieceFormData: {
          ...oldState.userExperieceFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case mainpageConstants.USER_EDUCATION_FORM_CHANGED:
      return state.merge({
        userEducationFormData: {
          ...oldState.userEducationFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case mainpageConstants.DROPDOWN_CHANGED:
      return state.merge({
        dropdownChangedData: {
          ...oldState.dropdownChangedData,
          [action.name]: action.value,
        },
      });

    case mainpageConstants.ADDING_INFO_SUCCESS:
      return state.merge({
        personalInfo: action.userInfo,
      });

    case mainpageConstants.ADDING_SKILLS_SUCCESS:
      return state.merge({
        userSkills: action.userSkills,
      });

    case mainpageConstants.ADD_EXPERIENCE_SUCCESS:
      return state.merge({
        userExperience: action.userExperience,
      });
    case mainpageConstants.DATE_PICKER_CHANGED:
      return state.merge({
        datePickerData: {
          ...oldState.datePickerData,
          [action.name]: action.value,
        },
      });

    case mainpageConstants.ADD_EDUCATION_SUCCESS:
      return state.merge({
        userEducation: action.userEducation,
      });

    case mainpageConstants.ADDING_INFO_FAILURE:
    case mainpageConstants.ADDING_SKILLS_FAILURE:
    case mainpageConstants.ADD_EXPERIENCE_FAILURE:
    case mainpageConstants.ADD_EDUCATION_FAILURE:
      return state.merge({
        error: action.error,
      });
    default:
      return state;
  }
}

export default mainPageReducer;
