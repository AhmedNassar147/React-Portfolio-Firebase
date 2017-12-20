import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SwipeableViews from 'react-swipeable-views';
import { Paper, Tab, Tabs } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCreateUserPortfolio from './selectors';

import reducer from './reducer';
import saga from './saga';
import createUserPortolioActions from './actions';
import UserInfo from './UserInfo';
import ProfilePage from './userImage';
import AddSkills from './userSkills';
import UserExperience from './userExperiece';
import UserEducation from './userEducation';
import UserImages from './userImage2';

const slide = {
  padding: 10,
};

// eslint-disable-next-line
export class CreateUserPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  componentWillMount() {
    this.props.onCreateUserPortfolioLoading();
  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
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
      OnUserImageChanges,
      onRequestAddUserImage,
    } = this.props;
    return (
      <div style={{ paddingLeft: '5px' }}>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="First Step" value={0} />
          <Tab label="Second Step" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={slide}>
            <Paper>
              <UserImages
                userImageChanges={OnUserImageChanges}
                requestAddUserImage={onRequestAddUserImage}
              />
            </Paper>
            <Paper>
              <UserInfo
                personalInfoFormChanged={personalInfoFormChanged}
                requestAddPersonalInfo={onRequestAddPersonalinfo}
              />
            </Paper>

            <Paper>
              <AddSkills
                skillsFormChanged={onSkillsFormChanged}
                addingUserSkills={OnRequestAddingUserSkills}
              />
            </Paper>

            <Paper>
              <ProfilePage />
            </Paper>
          </div>

          <div style={slide}>
            <Paper>
              <UserExperience
                userExperienceFormChanged={onUserExperienceFormChanged}
                datePickerChanged={onDatePickerChanged}
                requestAddExperience={onRequestAddExperience}
              />
            </Paper>

            <Paper>
              <UserEducation
                userEducationFormChanged={onUserEducationFormChanged}
                dropdownChanged={onDropdownChanged}
                requestAddEducation={onRequestAddEducation}
              />
            </Paper>
            <br />
          </div>
        </SwipeableViews>
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
  OnUserImageChanges: PropTypes.func.isRequired,
  onRequestAddUserImage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createuserportfolio: makeSelectCreateUserPortfolio(),
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

    OnUserImageChanges: (name, imageUrl) =>
      dispatch(
        createUserPortolioActions.userImagesChanged({
          name,
          imageUrl,
        })
      ),
    onRequestAddUserImage: () =>
      dispatch(createUserPortolioActions.requestAddUserImage()),

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
