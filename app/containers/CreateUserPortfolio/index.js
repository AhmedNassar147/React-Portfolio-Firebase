import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paper, Step, Stepper, StepButton, RaisedButton, FlatButton } from 'material-ui';

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
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }
  componentWillMount() {
    this.props.onCreateUserPortfolioLoading();
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Paper>
            <UserImages currentUser={this.props.currentUser} />
          </Paper>
        );
      case 1:
        return (
          <Paper>
            <UserInfo
              personalInfoFormChanged={this.props.personalInfoFormChanged}
              requestAddPersonalInfo={this.props.onRequestAddPersonalinfo}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper>
            <AddSkills
              skillsFormChanged={this.props.onSkillsFormChanged}
              addingUserSkills={this.props.OnRequestAddingUserSkills}
            />
          </Paper>
        );
      case 3: return (
        <Paper>
          <UserExperience
            userExperienceFormChanged={this.props.onUserExperienceFormChanged}
            datePickerChanged={this.props.onDatePickerChanged}
            requestAddExperience={this.props.onRequestAddExperience}
          />
        </Paper>
      );
      case 4: return (
        <Paper>
          <UserEducation
            userEducationFormChanged={this.props.onUserEducationFormChanged}
            dropdownChanged={this.props.onDropdownChanged}
            requestAddEducation={this.props.onRequestAddEducation}
          />
        </Paper>
      );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
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
  render() {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} linear={false} >
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
             Image
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              Personal Information
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })} >
              Skills
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 3 })} >
              Experience
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 4 })} >
              Education
            </StepButton>
          </Step>
        </Stepper>
        <div>
          <div style={contentStyle}>
            {this.getStepContent(stepIndex)}
          </div>
          <div style={{ marginTop: 12 }}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handelPrevStep}
              style={{ marginRight: 12 }}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === 4}
              primary
              onClick={this.handelNextStep}
            />
          </div>
        </div>
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
