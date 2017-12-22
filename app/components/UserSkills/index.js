import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';
import { customPadding } from '../../containers/MainPage/styles';

class UserSkills extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      name: 1,
      inputs: ['input-0'],
    };
  }
  addNewInput = () => {
    const newInput = `input-${this.state.inputs.length}`;
    this.setState({
      name: this.state.name + 1,
      inputs: this.state.inputs.concat([newInput]),
    });
  };
  handelRequests = () => {
    this.props.addingUserSkills();
    this.props.handleNext();
  }
  render() {
    const { skillsFormChanged } = this.props;
    return (
      <div style={customPadding}>
        <div>
          {this.state.inputs.map((input, name) => (
            <TextField
              key={input}
              type="text"
              name={`${name}`}
              fullWidth
              floatingLabelText={`Skill ${name}`}
              floatingLabelStyle={{ fontSize: 'medium' }}
              onChange={skillsFormChanged}
            />
          ))}
        </div>
        <RaisedButton
          label="create new skill"
          fullWidth
          style={{ margin: '13px 0px 5px 0px' }}
          onClick={this.addNewInput}
        />
        <RaisedButton
          label="ADD your Skills"
          fullWidth
          primary
          style={{ margin: '13px 0px 5px 0px' }}
          onClick={this.handelRequests}
        />
      </div>
    );
  }
}

UserSkills.propTypes = {
  skillsFormChanged: PropTypes.func,
  addingUserSkills: PropTypes.func,
  handleNext: PropTypes.func,
};

export default UserSkills;
