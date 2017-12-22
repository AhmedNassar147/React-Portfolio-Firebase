import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  IconMenu,
  MenuItem,
  IconButton,
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
//eslint-disable-next-line
class Appbar extends React.Component {
  render() {
    const { signOut, headToUserProfile, currentUser } = this.props;
    return (
      <div>
        <AppBar
          title="Portfolio"
          style={{ marginBottom: '2px' }}
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText={`${currentUser.displayName}`} onClick={headToUserProfile} leftIcon={<Avatar />} />
              <MenuItem primaryText="SignOut" onClick={signOut} />
            </IconMenu>
          }
        />
      </div>
    );
  }
}

Appbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  headToUserProfile: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.string),
};

export default Appbar;
