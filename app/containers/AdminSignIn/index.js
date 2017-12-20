import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TextField, RaisedButton, Paper } from 'material-ui';
// import { grey50 } from 'material-ui/styles/colors';
import makeSelectAdminSignIn, {
  makeSelectAdminLoginFormErrors,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import logininAdminActions from './actions';

const contentStyle = {
  width: '40%',
  margin: '200px auto',
  backgroundColor: 'white',
  padding: '22px',
};

// eslint-disable-next-line
export class AdminSignIn extends React.Component {
  componentWillMount() {
    this.props.requestLoginAdminPageFromAdminPage();
  }
  render() {
    const { loginFormAdminChanged, loginToAdminPage, errors } = this.props;
    return (
      <Paper zDepth={3} style={contentStyle}>
        <TextField
          id="email"
          type="email"
          name="email"
          errorText={errors.email}
          floatingLabelText="Email"
          fullWidth
          onChange={loginFormAdminChanged}
        />
        <TextField
          id="password"
          type="password"
          name="password"
          errorText={errors.password}
          floatingLabelText="Password"
          fullWidth
          onChange={loginFormAdminChanged}
        />
        <RaisedButton
          type="submit"
          fullWidth
          label="Login"
          secondary
          onClick={loginToAdminPage}
        />
      </Paper>
    );
  }
}

AdminSignIn.propTypes = {
  loginFormAdminChanged: PropTypes.func.isRequired,
  requestLoginAdminPageFromAdminPage: PropTypes.func.isRequired,
  loginToAdminPage: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminsignin: makeSelectAdminSignIn(),
  errors: makeSelectAdminLoginFormErrors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginFormAdminChanged: (event, value) =>
      dispatch(
        logininAdminActions.loginFormAdminChanged({
          inputName: [event.target.name],
          inputValue: value,
        })
      ),

    loginToAdminPage: () =>
      dispatch(logininAdminActions.RequestLoginToAdminPage()),

    requestLoginAdminPageFromAdminPage: () =>
      dispatch(logininAdminActions.requestLoginAdminPageFromAdminPage()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminSignIn', reducer });
const withSaga = injectSaga({ key: 'adminSignIn', saga });

export default compose(withReducer, withSaga, withConnect)(AdminSignIn);
