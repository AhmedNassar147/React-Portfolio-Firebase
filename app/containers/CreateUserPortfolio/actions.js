import createUserPortolioConstants from './constants';

export default {
  createUserPortfolioLoading: () => ({
    type: createUserPortolioConstants.CREATE_USER_PORTFOLIO_PAGE_LOADING,
  }),
  createUserPageLoadingSuccess: (user) => ({
    type: createUserPortolioConstants.CREATE_USER_PAGE_LOADING_SUCCESS,
    user,
  }),
  createUserPageLoadingFailed: (error) => ({
    type: createUserPortolioConstants.CREATE_USER_PAGE_LOADING_FAILURE,
    error,
  }),

  personalInfoFormChanged: ({ inputName, inputValue }) => ({
    type: createUserPortolioConstants.PERSONAL_INFO_FORM_CHANGED,
    inputName,
    inputValue,
  }),

  requestAddPersonalInfo: () => ({
    type: createUserPortolioConstants.REQUEST_ADD_PERSONAL_INFO,
  }),
  addingInfoSuccess: (userInfo) => ({
    type: createUserPortolioConstants.ADDING_INFO_SUCCESS,
    userInfo,
  }),
  addingInfoFailed: (error) => ({
    type: createUserPortolioConstants.ADDING_INFO_FAILURE,
    error,
  }),
  formAddingInfoErrors: (formErrors) => ({
    type: createUserPortolioConstants.FORM_ADD_INFO_ERRORS,
    formErrors,
  }),

  skillsFormChanged: ({ inputName, inputValue }) => ({
    type: createUserPortolioConstants.SKILLS_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  requestAddSkills: () => ({
    type: createUserPortolioConstants.REQUEST_ADD_SKILLS,
  }),
  addingSkillsSuccess: (userSkills) => ({
    type: createUserPortolioConstants.ADDING_SKILLS_SUCCESS,
    userSkills,
  }),
  addingSkillsFailed: (error) => ({
    type: createUserPortolioConstants.ADDING_SKILLS_FAILURE,
    error,
  }),
  formAddingSkillsErrors: (formErrors) => ({
    type: createUserPortolioConstants.FORM_ADD_SKILLS_ERRORS,
    formErrors,
  }),

  userExperienceFormChanged: ({ inputName, inputValue }) => ({
    type: createUserPortolioConstants.USER_EXPERIENCE_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  datePickerChanged: ({ name, value }) => ({
    type: createUserPortolioConstants.DATE_PICKER_CHANGED,
    name,
    value,
  }),
  requestUserAddExperience: () => ({
    type: createUserPortolioConstants.REQUEST_ADD_EXPERIENCE,
  }),
  addExperienceSuccess: (userExperience) => ({
    type: createUserPortolioConstants.ADD_EXPERIENCE_SUCCESS,
    userExperience,
  }),
  addExperienceFailure: (error) => ({
    type: createUserPortolioConstants.ADD_EXPERIENCE_FAILURE,
    error,
  }),

  userEducationFormChanged: ({ inputName, inputValue }) => ({
    type: createUserPortolioConstants.USER_EDUCATION_FORM_CHANGED,
    inputName,
    inputValue,
  }),
  dropdownChanged: ({ name, value }) => ({
    type: createUserPortolioConstants.DROPDOWN_CHANGED,
    name,
    value,
  }),
  requestUserAddEducation: () => ({
    type: createUserPortolioConstants.REQUEST_ADD_EDUCATION,
  }),
  addEducationSuccess: (userEducation) => ({
    type: createUserPortolioConstants.ADD_EDUCATION_SUCCESS,
    userEducation,
  }),
  addEducationFailure: (error) => ({
    type: createUserPortolioConstants.ADD_EDUCATION_FAILURE,
    error,
  }),
};
