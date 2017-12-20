import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  RaisedButton,
  FlatButton,
} from 'material-ui';

const drawerUserProfile = {
  backgroundColor: '#E1BEE7',
};
const userDataStyle = {
  color: '#263238',
};

const flatbtn = {
  margin: 'auto',
  color: '#ffff',
  border: '1px solid white',
  marginLeft: '5px',
};

//eslint-disable-next-line
class Appbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false,
    };
  }
  openDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    });
  };

  render() {
    const { currentUser, signOut, headToCreatePortfolio } = this.props;
    const stringfiedCurrentuser = currentUser;
    return (
      <div>
        <AppBar
          title="portfolio"
          style={{ marginBottom: '2px' }}
          onLeftIconButtonTouchTap={this.openDrawer}
        >
          <FlatButton label="Home" style={flatbtn} hoverColor="#FF80AB" />
          <FlatButton
            label="create Portfolio"
            hoverColor="#FF80AB"
            style={flatbtn}
            onClick={headToCreatePortfolio}
          />
          <FlatButton label="categories" hoverColor="#FF80AB" style={flatbtn} />
          <FlatButton label="about" hoverColor="#FF80AB" style={flatbtn} />
        </AppBar>
        <Drawer
          open={this.state.isDrawerOpen}
          docked={false}
          onRequestChange={this.openDrawer}
        >
          <List style={drawerUserProfile}>
            <ListItem primaryText="Profile" style={userDataStyle} />
            <List>
              <ListItem style={userDataStyle}>{`Name:  ${
                stringfiedCurrentuser.displayName
              }`}</ListItem>

              <ListItem style={userDataStyle}>{`Email:  ${
                stringfiedCurrentuser.email
              }`}</ListItem>
            </List>
          </List>
          <List>
            <RaisedButton label="log out" fullWidth onClick={signOut} />
          </List>
        </Drawer>
      </div>
    );
  }
}

Appbar.propTypes = {
  currentUser: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  headToCreatePortfolio: PropTypes.func,
};

export default Appbar;
