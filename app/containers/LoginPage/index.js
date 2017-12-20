import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';

import makeSelectLoginPage, { makeSelectLoginFormErrors } from './selectors';
import reducer from './reducer';
import saga from './saga';
import loginActions from './actions';

const contentStyle = {
  width: '40%',
  margin: '200px auto',
  backgroundColor: grey50,
  padding: '22px',
};
const signUpbtn = {
  margin: '10px auto',
};
// eslint-disable-next-line
export class LoginPage extends React.PureComponent {
  componentWillMount() {
    this.props.requestLoginPageFromMainPage();
    this.props.requestLoginPageFromAdminPage();
  }
  render() {
    const { loginFormChanged, requestLogin } = this.props;
    const { email, password } = this.props.error;
    return (
      <Paper zDepth={3} style={contentStyle}>
        <TextField
          id="email"
          type="email"
          name="email"
          errorText={email}
          floatingLabelText="Email"
          fullWidth
          onChange={loginFormChanged}
        />
        <TextField
          id="password"
          type="password"
          name="password"
          errorText={password}
          floatingLabelText="Password"
          fullWidth
          onChange={loginFormChanged}
        />
        <RaisedButton
          type="submit"
          fullWidth
          label="Login"
          primary
          onClick={requestLogin}
        />
        <RaisedButton
          type="submit"
          fullWidth
          label="OrSignUp"
          secondary
          style={signUpbtn}
          onClick={this.props.headToSignUpPage}
        />
      </Paper>
    );
  }
}

LoginPage.propTypes = {
  headToSignUpPage: PropTypes.func.isRequired,
  loginFormChanged: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  requestLoginPageFromMainPage: PropTypes.func.isRequired,
  error: PropTypes.object,
  requestLoginPageFromAdminPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  error: makeSelectLoginFormErrors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    headToSignUpPage: () => dispatch(push('/signUp')),
    loginFormChanged: (event, value) =>
      dispatch(
        loginActions.loginFormChanged({
          inputName: [event.target.name],
          inputValue: value,
        })
      ),
    requestLogin: () => dispatch(loginActions.loginRequest()),

    requestLoginPageFromMainPage: () =>
      dispatch(loginActions.requestLoginPageFromMainPage()),
    requestLoginPageFromAdminPage: () =>
      dispatch(loginActions.requestLoginPageFromAdminPage()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(withReducer, withSaga, withConnect)(LoginPage);
