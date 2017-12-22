import React from 'react';
import { RaisedButton } from 'material-ui';
const Intro = () => (
  <div style={introStyles.container}>
    <div style={introStyles.SmallChild}></div>
    <div style={introStyles.BigChild}>
      <center>
        <h4 style={{ display: 'flex', justifyContent: 'start' }}>
        About Portfolio
        </h4>
        <h6 style={{ display: 'flex', justifyContent: 'initial' }}>
          Portfolio helps you make your resume quickly.we make it easy for you <br />
          to create your resume in 10 minutes all you have to do just add your <br />
          image, info, skill, education, and education.yas just five steps and <br />
          your will get beatifull resume.
        </h6>
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
    marginBottom: '1px',
  },
  SmallChild: {
    flex: 1,
  },
  BigChild: {
    flex: 6,
  },
  btnStyle: {
    margin: '2px',
    width: '21%',
  },
};

Intro.propTypes = {};

export default Intro;
