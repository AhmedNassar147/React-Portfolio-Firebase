import { fromJS } from 'immutable';
import createUserPortfolioConstants from './constants';

const initialState = fromJS({
  personalinfoFormData: {},
  skillsFormData: {},
  userExperieceFormData: {},
  datePickerData: {},
  userEducationFormData: {},
  dropdownChangedData: {},
  userImageData: {},

  personalInfo: {},
  userSkills: {},
  userExperience: {},
  userEducation: {},
  userImage: {},

  error: false,
});

function createUserPortfolioReducer(state = initialState, action) {
  const oldState = state.toJS();

  switch (action.type) {
    case createUserPortfolioConstants.PERSONAL_INFO_FORM_CHANGED:
      return state.merge({
        personalinfoFormData: {
          ...oldState.personalinfoFormData,
          [action.inputName]: action.inputValue,
        },
      });
    case createUserPortfolioConstants.USER_IMAGE_CHANGED:
      return state.merge({
        userImageData: {
          ...oldState.userImageData,
          [action.name]: action.imageUrl,
        },
      });

    case createUserPortfolioConstants.SKILLS_FORM_CHANGED:
      return state.merge({
        skillsFormData: {
          ...oldState.skillsFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case createUserPortfolioConstants.USER_EXPERIENCE_FORM_CHANGED:
      return state.merge({
        userExperieceFormData: {
          ...oldState.userExperieceFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case createUserPortfolioConstants.USER_EDUCATION_FORM_CHANGED:
      return state.merge({
        userEducationFormData: {
          ...oldState.userEducationFormData,
          [action.inputName]: action.inputValue,
        },
      });

    case createUserPortfolioConstants.DROPDOWN_CHANGED:
      return state.merge({
        dropdownChangedData: {
          ...oldState.dropdownChangedData,
          [action.name]: action.value,
        },
      });

    case createUserPortfolioConstants.ADDING_INFO_SUCCESS:
      return state.merge({
        personalInfo: action.userInfo,
      });
    case createUserPortfolioConstants.ADD_USER_IMAGE_SUCCESS:
      return state.merge({
        userImage: action.imageData,
      });

    case createUserPortfolioConstants.ADDING_SKILLS_SUCCESS:
      return state.merge({
        userSkills: action.userSkills,
      });

    case createUserPortfolioConstants.ADD_EXPERIENCE_SUCCESS:
      return state.merge({
        userExperience: action.userExperience,
      });
    case createUserPortfolioConstants.DATE_PICKER_CHANGED:
      return state.merge({
        datePickerData: {
          ...oldState.datePickerData,
          [action.name]: action.value,
        },
      });

    case createUserPortfolioConstants.ADD_EDUCATION_SUCCESS:
      return state.merge({
        userEducation: action.userEducation,
      });

    case createUserPortfolioConstants.ADDING_INFO_FAILURE:
    case createUserPortfolioConstants.ADDING_SKILLS_FAILURE:
    case createUserPortfolioConstants.ADD_EXPERIENCE_FAILURE:
    case createUserPortfolioConstants.ADD_EDUCATION_FAILURE:
      return state.merge({
        error: action.error,
      });

    default:
      return state;
  }
}

export default createUserPortfolioReducer;
