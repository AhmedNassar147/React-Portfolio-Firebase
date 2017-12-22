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

  headToUserprofile: () => ({
    type: mainPageConstants.HEAD_TO_USER_PROFILE,
  }),

  personalInfoFormChanged: ({ inputName, inputValue }) => ({
    type: mainPageConstants.PERSONAL_INFO_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  requestAddPersonalInfo: () => ({
    type: mainPageConstants.REQUEST_ADD_PERSONAL_INFO,
  }),
  addingInfoSuccess: (userInfo) => ({
    type: mainPageConstants.ADDING_INFO_SUCCESS,
    userInfo,
  }),
  addingInfoFailed: (error) => ({
    type: mainPageConstants.ADDING_INFO_FAILURE,
    error,
  }),
  formAddingInfoErrors: (formErrors) => ({
    type: mainPageConstants.FORM_ADD_INFO_ERRORS,
    formErrors,
  }),

  skillsFormChanged: ({ inputName, inputValue }) => ({
    type: mainPageConstants.SKILLS_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  requestAddSkills: () => ({
    type: mainPageConstants.REQUEST_ADD_SKILLS,
  }),
  addingSkillsSuccess: (userSkills) => ({
    type: mainPageConstants.ADDING_SKILLS_SUCCESS,
    userSkills,
  }),
  addingSkillsFailed: (error) => ({
    type: mainPageConstants.ADDING_SKILLS_FAILURE,
    error,
  }),
  formAddingSkillsErrors: (formErrors) => ({
    type: mainPageConstants.FORM_ADD_SKILLS_ERRORS,
    formErrors,
  }),

  userExperienceFormChanged: ({ inputName, inputValue }) => ({
    type: mainPageConstants.USER_EXPERIENCE_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  datePickerChanged: ({ name, value }) => ({
    type: mainPageConstants.DATE_PICKER_CHANGED,
    name,
    value,
  }),
  requestUserAddExperience: () => ({
    type: mainPageConstants.REQUEST_ADD_EXPERIENCE,
  }),
  addExperienceSuccess: (userExperience) => ({
    type: mainPageConstants.ADD_EXPERIENCE_SUCCESS,
    userExperience,
  }),
  addExperienceFailure: (error) => ({
    type: mainPageConstants.ADD_EXPERIENCE_FAILURE,
    error,
  }),

  userEducationFormChanged: ({ inputName, inputValue }) => ({
    type: mainPageConstants.USER_EDUCATION_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  dropdownChanged: ({ name, value }) => ({
    type: mainPageConstants.DROPDOWN_CHANGED,
    name,
    value,
  }),
  requestUserAddEducation: () => ({
    type: mainPageConstants.REQUEST_ADD_EDUCATION,
  }),
  addEducationSuccess: (userEducation) => ({
    type: mainPageConstants.ADD_EDUCATION_SUCCESS,
    userEducation,
  }),
  addEducationFailure: (error) => ({
    type: mainPageConstants.ADD_EDUCATION_FAILURE,
    error,
  }),
};
