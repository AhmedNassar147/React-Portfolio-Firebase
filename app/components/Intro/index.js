import React from 'react';
import { Paper } from 'material-ui';
const container = {
  padding: '2px 0px 0px 0px',
  fontStyle: 'oblique',
};
const flexItem = {
  left: {
    float: 'left',
    textAlign: 'justify',
    padding: '0px 5px',
  },
  right: {
    float: 'right',
    textAlign: 'justify',
    padding: '0px 5px',
  },
};
const Intro = () => (
  <div style={container}>
    <Paper style={flexItem.left}>
      <h1>What is Portfolio?</h1>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets scrambled it to make a type specimen book. It has
        survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets
      </div>
    </Paper>
    <Paper style={flexItem.right}>
      <h1>why Portfolio ? </h1>
      <div>
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets scrambled it to make a type specimen book. It has
        survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets
      </div>
    </Paper>
  </div>
);

Intro.propTypes = {};

export default Intro;
