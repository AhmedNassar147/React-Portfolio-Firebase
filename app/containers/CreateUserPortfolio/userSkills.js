import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';

import { userInfoStyle } from './style';

const textfieldStyled = {
  padding: '0px 5px',
};

// eslint-disable-next-line
export default class AddSkills extends React.Component {
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
  render() {
    const { skillsFormChanged, addingUserSkills } = this.props;
    return (
      <div>
        <h5 style={userInfoStyle}>Skills</h5>
        <div style={textfieldStyled}>
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
            onClick={addingUserSkills}
          />
        </div>
      </div>
    );
  }
}
AddSkills.propTypes = {
  skillsFormChanged: PropTypes.func,
  addingUserSkills: PropTypes.func,
};
