import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, LinearProgress } from 'material-ui';
import { userInfoStyle, ImageInput, customPadding } from '../../containers/MainPage/styles';
import { storage, database } from '../../utils/firebase';


class UserImage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      uploadValue: 0,
      errorMsg: '',
      successMsg: '',
    };
  }

  handleChange = (event) => {
    const file = event.target.files[0];
    const task = storage.ref(`usersImages/${file.name}`).put(file);
    task.on(
      'state_changed',
      (snapshot) => {
        // eslint-disable-next-line
        let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        this.setState({ uploadValue: percentage });
      },
      (error) => {
        this.setState({
          errorMsg: `error when trying upload image because: ${error.message}`,
        });
      },
      () => {
        this.setState({ successMsg: 'Success' });
        const { user } = this.props.currentUser;
        const url = task.snapshot.downloadURL;
        database.ref(`/Portfolios/${user.uid}/userImage`).set({
          userImage: url,
        });
        this.props.handleNext();
      }
    );
  };

  render() {
    return (
      <div>
        <h5 style={userInfoStyle}>Upload Your Image</h5>
        <div style={customPadding}>
          <div>
            <cenetr>
              <h4>{this.state.errorMsg}</h4>
              <h4>{this.state.successMsg}</h4>
            </cenetr>
            <LinearProgress mode="determinate" value={this.state.uploadValue} />
            <br />
            <RaisedButton
              fullWidth
              label="Choose an Image"
              labelPosition="before"
              containerElement="label"
              primary
              style={{ margin: '13px 0px 5px 0px' }}
            >
              <input
                type="file"
                onChange={this.handleChange}
                style={ImageInput}
              />
            </RaisedButton>
          </div>
        </div>
      </div>
    );
  }
}

UserImage.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string),
  handleNext: PropTypes.func,
};

export default UserImage;
