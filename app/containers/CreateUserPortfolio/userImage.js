import React, { Component } from 'react';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
// import { userInfoStyle } from './style';

import { storage, database } from '../../utils/firebase';

const CustomUploadButtonStyles = {
  backgroundColor: '#EC407A',
  color: 'white',
  padding: '10px 21%',
  borderRadius: 2,
  fontSize: 'medium',
  zIndex: 4,
};
class ProfilePage extends Component {
  state = {
    isUploading: false,
    progress: 0,
    imageURl: '',
    image: '',
  };
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    // eslint-disable-next-line
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    try {
      const user = localStorage.getItem('user');
      const updateUser = JSON.parse(user);
      const userId = updateUser.uid;
      storage
        .ref('usersImages')
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          this.setState({ imageURl: url });
          database.ref(`/Portfolios/${userId}/userImage`).set({
            userImage: url,
          });
        });
    } catch (error) {
      console.log('error when trying add image', error);
    }
  };

  render() {
    return (
      <div style={{ marginTop: '4px' }}>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        {this.state.imageURl && <image src={this.state.imageURl} />}

        <center>
          <CustomUploadButton
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={storage.ref('usersImages')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            style={CustomUploadButtonStyles}
          >
            Upload Image
          </CustomUploadButton>
        </center>
      </div>
    );
  }
}

export default ProfilePage;
