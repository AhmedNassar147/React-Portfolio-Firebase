import React from 'react';
import PropTypes from 'prop-types';
import { TextField, DatePicker, RaisedButton } from 'material-ui';
import { customPadding } from '../../containers/MainPage/styles';

class UserExperience extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
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
  handleRequests = () => {
    this.props.requestAddExperience();
    this.props.handleNext();
  };

  render() {
    const { userExperienceFormChanged } = this.props;

    return (
      <div style={customPadding}>
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
          primary
          onClick={this.handleRequests}
        />
      </div>
    );
  }
}

UserExperience.propTypes = {
  userExperienceFormChanged: PropTypes.func,
  datePickerChanged: PropTypes.func,
  requestAddExperience: PropTypes.func,
  handleNext: PropTypes.func,
};

export default UserExperience;
