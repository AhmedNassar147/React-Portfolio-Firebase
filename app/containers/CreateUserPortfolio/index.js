import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paper, Step, Stepper, StepButton, StepContent, RaisedButton, FlatButton } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCreateUserPortfolio from './selectors';

import reducer from './reducer';
import saga from './saga';
import createUserPortolioActions from './actions';
import UserInfo from './UserInfo';
import AddSkills from './userSkills';
import UserExperience from './userExperiece';
import UserEducation from './userEducation';
import UserImages from './userImage';
import { makeSelectCurrentUser } from '../App/selectors';

// eslint-disable-next-line
export class CreateUserPortfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      stepIndex: 0,
    };
  }
  componentWillMount() {
    this.props.onCreateUserPortfolioLoading();
  }
  handelNextStep = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 4) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };
  handelPrevStep = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };
  renderStepActions(step) {
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label="Next"
          disableTouchRipple
          disableFocusRipple
          primary
          onClick={this.handelNextStep}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple
            disableFocusRipple
            onClick={this.handelPrevStep}
          />
        )}
      </div>
    );
  }
  render() {
    const {
      personalInfoFormChanged,
      onRequestAddPersonalinfo,
      onSkillsFormChanged,
      OnRequestAddingUserSkills,
      onUserExperienceFormChanged,
      onDatePickerChanged,
      onRequestAddExperience,
      onUserEducationFormChanged,
      onDropdownChanged,
      onRequestAddEducation,
      currentUser,
    } = this.props;

    const { stepIndex } = this.state;
    return (
      <div style={{ maxWidth: 420, maxHeight: 400, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
             Image
            </StepButton>
            <StepContent>
              <Paper>
                <UserImages currentUser={currentUser} />
              </Paper>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              Personal Information
            </StepButton>
            <StepContent>
              <Paper>
                <UserInfo
                  personalInfoFormChanged={personalInfoFormChanged}
                  requestAddPersonalInfo={onRequestAddPersonalinfo}
                />
              </Paper>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })} >
              Skills
            </StepButton>
            <StepContent>
              <Paper>
                <AddSkills
                  skillsFormChanged={onSkillsFormChanged}
                  addingUserSkills={OnRequestAddingUserSkills}
                />
              </Paper>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 3 })} >
              Experience
            </StepButton>
            <StepContent>
              <Paper>
                <UserExperience
                  userExperienceFormChanged={onUserExperienceFormChanged}
                  datePickerChanged={onDatePickerChanged}
                  requestAddExperience={onRequestAddExperience}
                />
              </Paper>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 4 })} >
              Education
            </StepButton>
            <StepContent>
              <Paper>
                <UserEducation
                  userEducationFormChanged={onUserEducationFormChanged}
                  dropdownChanged={onDropdownChanged}
                  requestAddEducation={onRequestAddEducation}
                />
              </Paper>
              {this.renderStepActions(4)}
            </StepContent>
          </Step>

        </Stepper>
      </div>
    );
  }
}

CreateUserPortfolio.propTypes = {
  personalInfoFormChanged: PropTypes.func.isRequired,
  onRequestAddPersonalinfo: PropTypes.func.isRequired,
  onCreateUserPortfolioLoading: PropTypes.func.isRequired,
  onSkillsFormChanged: PropTypes.func.isRequired,
  OnRequestAddingUserSkills: PropTypes.func.isRequired,
  onUserExperienceFormChanged: PropTypes.func.isRequired,
  onDatePickerChanged: PropTypes.func.isRequired,
  onRequestAddExperience: PropTypes.func.isRequired,
  onUserEducationFormChanged: PropTypes.func.isRequired,
  onRequestAddEducation: PropTypes.func.isRequired,
  onDropdownChanged: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.object),
};

const mapStateToProps = createStructuredSelector({
  createuserportfolio: makeSelectCreateUserPortfolio(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCreateUserPortfolioLoading: () =>
      dispatch(createUserPortolioActions.createUserPortfolioLoading()),

    personalInfoFormChanged: (event, inputValue) =>
      dispatch(
        createUserPortolioActions.personalInfoFormChanged({
          inputName: event.target.name,
          inputValue,
        })
      ),

    onRequestAddPersonalinfo: () =>
      dispatch(createUserPortolioActions.requestAddPersonalInfo()),

    onSkillsFormChanged: (event, value) =>
      dispatch(
        createUserPortolioActions.skillsFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),

    OnRequestAddingUserSkills: () =>
      dispatch(createUserPortolioActions.requestAddSkills()),

    onUserExperienceFormChanged: (event, value) =>
      dispatch(
        createUserPortolioActions.userExperienceFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),

    onDatePickerChanged: (name, value) =>
      dispatch(
        createUserPortolioActions.datePickerChanged({
          name,
          value,
        })
      ),

    onRequestAddExperience: () =>
      dispatch(createUserPortolioActions.requestUserAddExperience()),

    onUserEducationFormChanged: (event, value) =>
      dispatch(
        createUserPortolioActions.userEducationFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    onDropdownChanged: (name, value) =>
      dispatch(
        createUserPortolioActions.dropdownChanged({
          name,
          value,
        })
      ),

    onRequestAddEducation: () =>
      dispatch(createUserPortolioActions.requestUserAddEducation()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'createUserPortfolio', reducer });
const withSaga = injectSaga({ key: 'createUserPortfolio', saga });

export default compose(withReducer, withSaga, withConnect)(CreateUserPortfolio);
