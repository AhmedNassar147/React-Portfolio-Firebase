import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, MenuItem, DropDownMenu } from 'material-ui';
import { customPadding, customWidth } from '../../containers/MainPage/styles';


class UserEducation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { fromYear: 1980, toYear: 1985 };
  }
  handleFromYearChange = (event, index, value) => {
    this.setState({ fromYear: value });
    this.props.dropdownChanged('fromYear', value);
  };

  handleToYearChange = (event, index, value) => {
    this.setState({
      toYear: value,
    });
    this.props.dropdownChanged('toYear', value);
  };
  handleReqeusts = () => {
    this.props.requestAddEducation();
    this.props.handleNext();
  };

  render() {
    const items = [];
    for (let i = 1975; i < 2026; i += 1) {
      items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
    }
    const { userEducationFormChanged } = this.props;

    return (
      <div style={customPadding}>
        <div>
          <TextField
            type="text"
            name="school"
            autoFocus
            hintText="like Ain Shams university"
            fullWidth
            floatingLabelText="School"
            floatingLabelStyle={{ fontSize: 'medium' }}
            onChange={userEducationFormChanged}
          />
          <TextField
            type="text"
            name="degree"
            autoFocus
            hintText="like bacholar degree"
            fullWidth
            floatingLabelText="Degree"
            floatingLabelStyle={{ fontSize: 'medium' }}
            onChange={userEducationFormChanged}
          />
          <TextField
            type="text"
            name="studyField"
            autoFocus
            hintText="like computer science"
            fullWidth
            floatingLabelText="Field of Study"
            floatingLabelStyle={{ fontSize: 'medium' }}
            onChange={userEducationFormChanged}
          />
          <TextField
            type="text"
            autoFocus
            hintText="grade in this field"
            name="grade"
            fullWidth
            floatingLabelText="Grade"
            floatingLabelStyle={{ fontSize: 'medium' }}
            onChange={userEducationFormChanged}
          />
          <DropDownMenu
            autoWidth={false}
            style={customWidth}
            animated
            maxHeight={300}
            value={this.state.fromYear}
            onChange={this.handleFromYearChange}
            targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            {items}
          </DropDownMenu>

          <DropDownMenu
            autoWidth={false}
            style={customWidth}
            animated
            maxHeight={300}
            value={this.state.toYear}
            onChange={this.handleToYearChange}
            targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            {items}
          </DropDownMenu>
        </div>

        <RaisedButton
          label="Add Education"
          fullWidth
          style={{ margin: '13px 0px 5px 0px' }}
          primary
          onClick={this.handleReqeusts}
        />
      </div>
    );
  }
}


UserEducation.propTypes = {
  userEducationFormChanged: PropTypes.func.isRequired,
  dropdownChanged: PropTypes.func.isRequired,
  requestAddEducation: PropTypes.func.isRequired,
  handleNext: PropTypes.func,
};

export default UserEducation;
