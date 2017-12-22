import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paper, Step, Stepper, StepButton, FlatButton } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import mainPageActions from './actions';
import {
  makeSelectSliderImages,
  makeSelectCurrentUser,
} from '../App/selectors';
import Appbar from '../../components/Appbar/index';
import SliderGalary from '../../components/SliderGalary/index';
import Intro from '../../components/Intro/index';
import UserImage from '../../components/UserImage/index';
import UserInfo from '../../components/UserInfo/index';
import UserSkills from '../../components/UserSkills/index';
import UserEducation from '../../components/UserEducation/index';
import UserExperience from '../../components/UserExperience/index';

// eslint-disable-next-line
export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }
  componentWillMount() {
    this.props.mainPageLoading();
    this.props.onMainLoadingPrepareSLider();
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Paper>
            <UserImage
              currentUser={this.props.currentUser}
              handleNext={this.handelNextStep}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper>
            <UserInfo
              personalInfoFormChanged={this.props.personalInfoFormChanged}
              requestAddPersonalInfo={this.props.onRequestAddPersonalinfo}
              handleNext={this.handelNextStep}
            />
            <FlatButton label="back" fullWidth onClick={this.handelPrevStep} />
          </Paper>
        );
      case 2:
        return (
          <Paper>
            <UserSkills
              skillsFormChanged={this.props.onSkillsFormChanged}
              addingUserSkills={this.props.OnRequestAddingUserSkills}
              handleNext={this.handelNextStep}
            />
            <FlatButton label="back" fullWidth onClick={this.handelPrevStep} />
          </Paper>
        );
      case 3: return (
        <Paper>
          <UserExperience
            userExperienceFormChanged={this.props.onUserExperienceFormChanged}
            datePickerChanged={this.props.onDatePickerChanged}
            requestAddExperience={this.props.onRequestAddExperience}
            handleNext={this.handelNextStep}
          />
          <FlatButton label="back" fullWidth onClick={this.handelPrevStep} />
        </Paper>
      );
      case 4: return (
        <Paper>
          <UserEducation
            userEducationFormChanged={this.props.onUserEducationFormChanged}
            dropdownChanged={this.props.onDropdownChanged}
            requestAddEducation={this.props.onRequestAddEducation}
            handleNext={this.handelNextStep}
          />
          <FlatButton label="back" fullWidth onClick={this.handelPrevStep} />
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
    const {
      sliderImages,
      signOut,
      headToUserProfile,
      currentUser,
    } = this.props;
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    return (
      <div>
        <Appbar
          signOut={signOut}
          headToUserProfile={headToUserProfile}
          currentUser={currentUser}
        />

        <Paper>
          <SliderGalary sliderImages={sliderImages} />
        </Paper>

        <Paper>
          <Intro />
        </Paper>

        <Paper>
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
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

MainPage.propTypes = {
  mainPageLoading: PropTypes.func,
  onMainLoadingPrepareSLider: PropTypes.func,
  sliderImages: PropTypes.arrayOf(PropTypes.object),
  signOut: PropTypes.func.isRequired,
  headToUserProfile: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.string),
  personalInfoFormChanged: PropTypes.func.isRequired,
  onRequestAddPersonalinfo: PropTypes.func.isRequired,
  onSkillsFormChanged: PropTypes.func.isRequired,
  OnRequestAddingUserSkills: PropTypes.func.isRequired,
  onUserExperienceFormChanged: PropTypes.func.isRequired,
  onDatePickerChanged: PropTypes.func.isRequired,
  onRequestAddExperience: PropTypes.func.isRequired,
  onUserEducationFormChanged: PropTypes.func.isRequired,
  onRequestAddEducation: PropTypes.func.isRequired,
  onDropdownChanged: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
  sliderImages: makeSelectSliderImages(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    mainPageLoading: () => dispatch(mainPageActions.mainPageLoading()),

    onMainLoadingPrepareSLider: () => dispatch(mainPageActions.prepareSlider()),

    signOut: () => dispatch(mainPageActions.signOut()),

    headToUserProfile: () => dispatch(mainPageActions.headToUserprofile()),

    personalInfoFormChanged: (event, inputValue) =>
    dispatch(
      mainPageActions.personalInfoFormChanged({
        inputName: event.target.name,
        inputValue,
      })
    ),

    onRequestAddPersonalinfo: () =>
      dispatch(mainPageActions.requestAddPersonalInfo()),

    onSkillsFormChanged: (event, value) =>
      dispatch(
        mainPageActions.skillsFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),

    OnRequestAddingUserSkills: () =>
      dispatch(mainPageActions.requestAddSkills()),

    onUserExperienceFormChanged: (event, value) =>
      dispatch(
        mainPageActions.userExperienceFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),

    onDatePickerChanged: (name, value) =>
      dispatch(
        mainPageActions.datePickerChanged({
          name,
          value,
        })
      ),

    onRequestAddExperience: () =>
      dispatch(mainPageActions.requestUserAddExperience()),

    onUserEducationFormChanged: (event, value) =>
      dispatch(
        mainPageActions.userEducationFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    onDropdownChanged: (name, value) =>
      dispatch(
        mainPageActions.dropdownChanged({
          name,
          value,
        })
      ),

    onRequestAddEducation: () =>
      dispatch(mainPageActions.requestUserAddEducation()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(withReducer, withSaga, withConnect)(MainPage);
