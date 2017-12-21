import React from 'react';
import { Paper } from 'material-ui';

class UserProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Paper zDepth={5} />
      </div>
    );
  }
}

UserProfile.propTypes = {

};

export default UserProfile;
