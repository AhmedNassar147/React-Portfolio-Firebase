import { createSelector } from 'reselect';

const selectMainPageDomain = (state) => state.get('mainPage');

export const makeSelectPersonalInfoFormData = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('personalinfoFormData').toJS()
  );

export const makeSelectUserSkillsForm = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('skillsFormData ').toJS()
  );
export const makeSelectUserExperienceForm = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('userExperieceFormData ').toJS()
  );
export const makeSelectDatePickerData = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('datePickerData ').toJS()
  );

export const makeSelectUserEducationForm = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('userEducationFormData ').toJS()
  );

export const makeSelectDropdownchangedDate = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('dropdownChangedData ').toJS()
  );

export const makeSelectAddingInfoSuccess = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('personalInfo').toJS()
  );

export const makeSelectAddingSkillsSuccess = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('userSkills').toJS()
  );

export const makeSelectUserExperienceSuccess = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('userExperience ').toJS()
  );

export const makeSelectUserEducationSuccess = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('userEducation ').toJS()
  );
export const makeSelectAddingInfoFailed = () =>
  createSelector(selectMainPageDomain, (substate) =>
    substate.get('error').toJS()
  );
const makeSelectMainPage = () =>
  createSelector(selectMainPageDomain, (substate) => substate.toJS());

export default makeSelectMainPage;
export { selectMainPageDomain };
