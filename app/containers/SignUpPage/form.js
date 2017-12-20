import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';

const contentStyle = {
  width: '40vw',
  margin: '12px auto',
  backgroundColor: grey50,
  padding: '50px',
};
const buttonsStyle = {
  marginTop: '8px',
};

// eslint-disable-next-line
class SignUpForm extends React.Component {
  render() {
    const { headtoLogin, SignUpFormChanged, signUpFormSubmited } = this.props;
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
    } = this.props.errors;
    return (
      <Paper zDepth={3} style={contentStyle}>
        <TextField
          id="firstname"
          type="text"
          name="firstname"
          errorText={firstname}
          fullWidth
          floatingLabelText="FirstName"
          onChange={SignUpFormChanged}
        />

        <TextField
          id="lastname"
          type="text"
          name="lastname"
          errorText={lastname}
          fullWidth
          floatingLabelText="LastName"
          onChange={SignUpFormChanged}
        />

        <TextField
          id="email"
          type="email"
          name="email"
          errorText={email}
          fullWidth
          floatingLabelText="Email"
          onChange={SignUpFormChanged}
        />

        <TextField
          id="telNo"
          type="tel"
          name="phone"
          errorText={phone}
          fullWidth
          floatingLabelText="Phone"
          onChange={SignUpFormChanged}
        />

        <TextField
          id="password"
          type="password"
          name="password"
          errorText={password}
          fullWidth
          floatingLabelText="Password"
          onChange={SignUpFormChanged}
        />

        <TextField
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          errorText={confirmPassword}
          fullWidth
          floatingLabelText="ConfirmPassword"
          onChange={SignUpFormChanged}
        />

        <RaisedButton
          type="submit"
          label="signUp"
          primary
          fullWidth
          style={buttonsStyle}
          onClick={signUpFormSubmited}
        />

        <RaisedButton
          type="submit"
          fullWidth
          label="OrLogin"
          secondary
          style={buttonsStyle}
          onClick={headtoLogin}
        />
      </Paper>
    );
  }
}
SignUpForm.propTypes = {
  headtoLogin: PropTypes.func,
  SignUpFormChanged: PropTypes.func,
  signUpFormSubmited: PropTypes.func,
  errors: PropTypes.object,
};
export default SignUpForm;
