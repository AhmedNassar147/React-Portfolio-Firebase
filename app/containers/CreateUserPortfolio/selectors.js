import { createSelector } from 'reselect';

const selectCreateUserPortfolioDomain = (state) =>
  state.get('createUserPortfolio');

export const makeSelectPersonalInfoFormData = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('personalinfoFormData').toJS()
  );
export const makeSelectUserImageData = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userImageData').toJS()
  );

export const makeSelectUserSkillsForm = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('skillsFormData ').toJS()
  );
export const makeSelectUserExperienceForm = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userExperieceFormData ').toJS()
  );
export const makeSelectDatePickerData = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('datePickerData ').toJS()
  );

export const makeSelectUserEducationForm = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userEducationFormData ').toJS()
  );

export const makeSelectDropdownchangedDate = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('dropdownChangedData ').toJS()
  );

export const makeSelectAddingInfoSuccess = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('personalInfo').toJS()
  );
export const makeSelectUserImageSuccess = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userImage').toJS()
  );
export const makeSelectAddingSkillsSuccess = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userSkills').toJS()
  );

export const makeSelectUserExperienceSuccess = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userExperience ').toJS()
  );

export const makeSelectUserEducationSuccess = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('userEducation ').toJS()
  );
export const makeSelectAddingInfoFailed = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.get('error').toJS()
  );

const makeSelectCreateUserPortfolio = () =>
  createSelector(selectCreateUserPortfolioDomain, (substate) =>
    substate.toJS()
  );

export default makeSelectCreateUserPortfolio;
export { selectCreateUserPortfolioDomain };
