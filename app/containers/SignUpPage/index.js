import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignUpPage, {
  makeSelectSignUpErrorsValidation,
} from './selectors';
import SignUpForm from './form';
import reducer from './reducer';
import saga from './saga';
import signUpActions from './actions';

// eslint-disable-next-line
export class SignUpPage extends React.Component {
  componentWillMount() {
    this.props.OnRequestSignupPageFromMainPage();
  }
  render() {
    const {
      headToLoginPage,
      onSignUpFormChanged,
      onSignUpRequest,
      errors,
    } = this.props;
    return (
      <div>
        <SignUpForm
          headtoLogin={headToLoginPage}
          SignUpFormChanged={onSignUpFormChanged}
          signUpFormSubmited={onSignUpRequest}
          errors={errors}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  headToLoginPage: PropTypes.func.isRequired,
  onSignUpFormChanged: PropTypes.func.isRequired,
  onSignUpRequest: PropTypes.func,
  errors: PropTypes.object.isRequired,
  OnRequestSignupPageFromMainPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  signuppage: makeSelectSignUpPage(),
  errors: makeSelectSignUpErrorsValidation(),
});

function mapDispatchToProps(dispatch) {
  return {
    headToLoginPage: () => dispatch(push('/')),
    onSignUpFormChanged: (event, value) =>
      dispatch(
        signUpActions.SignUpFormChanged({
          inputName: event.target.name,
          inputValue: value,
        })
      ),
    onSignUpRequest: () => dispatch(signUpActions.signUpRequest()),
    OnRequestSignupPageFromMainPage: () =>
      dispatch(signUpActions.RequestSignUpPageFromMainPage()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpPage', reducer });
const withSaga = injectSaga({ key: 'signUpPage', saga });

export default compose(withReducer, withSaga, withConnect)(SignUpPage);
