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
    const { signOut, headToCreatePortfolio, headToUserProfile } = this.props;
    return (
      <div>
        <AppBar
          title="portfolio"
          style={{ marginBottom: '2px' }}
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Profile" onClick={headToUserProfile} leftIcon={<Avatar />} />
              <MenuItem primaryText="Create Portfolio" onClick={headToCreatePortfolio} />
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
  headToCreatePortfolio: PropTypes.func,
  headToUserProfile: PropTypes.func,
};

export default Appbar;
