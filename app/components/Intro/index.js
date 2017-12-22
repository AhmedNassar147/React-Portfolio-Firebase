import React from 'react';
import { RaisedButton } from 'material-ui';
const Intro = () => (
  <div style={introStyles.container}>
    <div style={introStyles.SmallChild}></div>
    <div style={introStyles.BigChild}>
      <center>
        <h4>
        About Portfolio
        </h4>
        <h6>Portfolio helps You make your resume quick </h6>
        <br />
        <RaisedButton label="GitHub" primary style={introStyles.btnStyle} />
        <RaisedButton label="LinkedIn" primary style={introStyles.btnStyle} />
        <RaisedButton label="Facebook" primary style={introStyles.btnStyle} />
      </center>
    </div>
    <div style={introStyles.SmallChild}></div>
  </div>
);
const introStyles = {
  container: {
    display: 'flex',
    padding: '5px',
    marginBottom: '5px',
  },
  SmallChild: {
    flex: 1,
  },
  BigChild: {
    flex: 7,
  },
  btnStyle: {
    margin: '2px',
    width: '21%',
  },
};

Intro.propTypes = {};

export default Intro;
