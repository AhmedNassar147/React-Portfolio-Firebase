import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Paper,
  AppBar,
  FlatButton,
  Dialog,
  TextField,
} from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAdminPage, {
  makeSelectInputCation,
  makeSelectDialogErrors,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import adminPageActions from './actions';
import adminPageStyle from './style';
import ProfilePage from './uploadfiles';
// import addNewAdmin from './dialog';

// eslint-disable-next-line
export class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    this.props.adminPageLoading();
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const {
      onInputChanged,
      inputCaption,
      dialogAdminFormChanged,
      requestCreateNewAdmin,
      errors,
      logout,
    } = this.props;

    const actions = [
      <FlatButton label="Cancel" primary onClick={this.closeDialog} />,
      <FlatButton
        label="Create Admin"
        primary
        onClick={() => {
          requestCreateNewAdmin();
          this.setState(({ open }) => ({ open: !open }));
        }}
      />,
    ];

    return (
      <div style={adminPageStyle.container}>
        <Paper>
          <AppBar title="Admin Panel">
            <FlatButton
              label="Add New Admin"
              primary
              style={adminPageStyle.flatbtn}
              onClick={this.openDialog}
            />
            <FlatButton
              label="Log out"
              style={adminPageStyle.logout}
              onClick={logout}
            />
          </AppBar>

          <Dialog
            title="Add New Admin"
            actions={actions}
            modal
            open={this.state.open}
          >
            <div>
              <TextField
                id="username"
                type="text"
                name="username"
                fullWidth
                errorText={errors.username}
                floatingLabelText="UserName"
                onChange={dialogAdminFormChanged}
              />

              <TextField
                id="email"
                type="email"
                name="email"
                errorText={errors.email}
                fullWidth
                floatingLabelText="Email"
                onChange={dialogAdminFormChanged}
              />

              <TextField
                id="password"
                type="password"
                name="password"
                errorText={errors.password}
                fullWidth
                floatingLabelText="Password"
                onChange={dialogAdminFormChanged}
              />

              <TextField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                errorText={errors.confirmPassword}
                fullWidth
                floatingLabelText="ConfirmPassword"
                onChange={dialogAdminFormChanged}
              />
            </div>
          </Dialog>
        </Paper>

        <Paper style={adminPageStyle.sliderActionStyle}>
          <ProfilePage
            inputCaption={inputCaption}
            inputChanged={onInputChanged}
          />
        </Paper>
      </div>
    );
  }
}

AdminPage.propTypes = {
  adminPageLoading: PropTypes.func.isRequired,
  onInputChanged: PropTypes.func.isRequired,
  inputCaption: PropTypes.object,
  dialogAdminFormChanged: PropTypes.func.isRequired,
  requestCreateNewAdmin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminpage: makeSelectAdminPage(),
  inputCaption: makeSelectInputCation(),
  errors: makeSelectDialogErrors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    adminPageLoading: () => dispatch(adminPageActions.adminPageLoading()),
    onInputChanged: (event, value) =>
      dispatch(
        adminPageActions.inputChanged({
          inputName: [event.target.name],
          inputValue: value,
        })
      ),
    dialogAdminFormChanged: (event, value) =>
      dispatch(
        adminPageActions.dialogAdminFormChanged({
          name: [event.target.name],
          value,
        })
      ),
    requestCreateNewAdmin: () =>
      dispatch(adminPageActions.requestCreateNewAdmin()),
    logout: () => dispatch(adminPageActions.logout()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminPage', reducer });
const withSaga = injectSaga({ key: 'adminPage', saga });

export default compose(withReducer, withSaga, withConnect)(AdminPage);
