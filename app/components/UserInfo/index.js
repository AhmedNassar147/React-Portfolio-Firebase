import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';
import { customPadding } from '../../containers/MainPage/styles';


class UserInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleRequests = () => {
    this.props.requestAddPersonalInfo();
    this.props.handleNext();
  };
  render() {
    const { personalInfoFormChanged } = this.props;
    return (
      <div style={customPadding}>
        <TextField
          id="fullname"
          name="fullname"
          type="text"
          errorText=""
          fullWidth
          floatingLabelText="Full Name"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="postion"
          name="postion"
          type="text"
          errorText=""
          fullWidth
          floatingLabelText="Postion"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="address"
          name="address"
          type="text"
          errorText=""
          fullWidth
          floatingLabelText="Address"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="phone"
          name="phone"
          type="tel"
          errorText=""
          fullWidth
          floatingLabelText="Phone No"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          errorText=""
          fullWidth
          floatingLabelText="Email"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="gitEmail"
          name="gitEmail"
          type="text"
          errorText=""
          fullWidth
          floatingLabelText="Github url"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="linkedEmail"
          name="linkedEmail"
          type="text"
          errorText=""
          fullWidth
          floatingLabelText="Linkedin Url"
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />
        <TextField
          id="summary"
          name="summary"
          type="text"
          multiLine
          rows={2}
          rowsMax={4}
          floatingLabelText="Summary"
          fullWidth
          floatingLabelStyle={{ fontSize: 'medium' }}
          onChange={personalInfoFormChanged}
        />

        <RaisedButton
          label="Add Personal Data"
          fullWidth
          primary
          style={{ margin: '13px 0px 5px 0px' }}
          onClick={this.handleRequests}
        />
      </div>
    );
  }
}

UserInfo.propTypes = {
  personalInfoFormChanged: PropTypes.func.isRequired,
  requestAddPersonalInfo: PropTypes.func.isRequired,
  handleNext: PropTypes.func,
};

export default UserInfo;
