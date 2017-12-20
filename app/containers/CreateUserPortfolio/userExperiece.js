import React from 'react';
import PropTypes from 'prop-types';
import { TextField, DatePicker, RaisedButton } from 'material-ui';
import { userInfoStyle } from './style';

const textfieldStyled = {
  padding: '0px 5px',
};
// eslint-disable-next-line
export default class UserExperience extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
    };
  }
  selectStartDate = (event, date) => {
    this.setState({
      startDate: date,
    });
    this.props.datePickerChanged('fromDate', date);
  };

  selectEndDate = (event, date) => {
    this.setState({
      startDate: date,
    });
    this.props.datePickerChanged('toDate', date);
  };

  render() {
    const { userExperienceFormChanged, requestAddExperience } = this.props;

    return (
      <div>
        <h5 style={userInfoStyle}>Experience</h5>
        <div style={textfieldStyled}>
          <div>
            <TextField
              type="text"
              name="companyName"
              fullWidth
              floatingLabelText="The Company's name"
              floatingLabelStyle={{ fontSize: 'medium' }}
              onChange={userExperienceFormChanged}
            />
            <TextField
              type="text"
              name="companyAddress"
              fullWidth
              floatingLabelText="The Company's Address"
              floatingLabelStyle={{ fontSize: 'medium' }}
              onChange={userExperienceFormChanged}
            />
            <TextField
              type="text"
              name="position"
              fullWidth
              floatingLabelText="your Position in this Company"
              floatingLabelStyle={{ fontSize: 'medium' }}
              onChange={userExperienceFormChanged}
            />

            <DatePicker
              hintText="From"
              name="from"
              fullWidth
              openToYearSelection
              onChange={this.selectStartDate}
            />
            <DatePicker
              hintText="To"
              name="to"
              fullWidth
              openToYearSelection
              onChange={this.selectEndDate}
            />
          </div>

          <RaisedButton
            label="Add Experience"
            fullWidth
            style={{ margin: '13px 0px 5px 0px' }}
            secondary
            onClick={requestAddExperience}
          />
        </div>
      </div>
    );
  }
}

UserExperience.propTypes = {
  userExperienceFormChanged: PropTypes.func,
  datePickerChanged: PropTypes.func,
  requestAddExperience: PropTypes.func,
};
