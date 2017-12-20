import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { storage, database } from '../../utils/firebase';

const CustomUploadButtonStyles = {
  backgroundColor: 'steelblue',
  color: 'white',
  padding: 20,
  borderRadius: 4,
  width: '100%',
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
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    const admin = localStorage.getItem('admin');
    const updateAdmin = JSON.parse(admin);
    const adminId = updateAdmin.uid;
    storage
      .ref('sliderImages')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ imageURl: url });
        database.ref('sliderImages').push({
          downloadUrl: url,
          senderId: adminId,
          caption: this.props.inputCaption.caption,
        });
      });
  };

  render() {
    const { inputChanged } = this.props;
    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <h2>Edit on SLider</h2>
          <TextField
            id="caption"
            type="text"
            name="caption"
            fullWidth
            floatingLabelText="CAPTION"
            onChange={inputChanged}
          />
        </div>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        {this.state.imageURl && <image src={this.state.imageURl} />}
        <CustomUploadButton
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={storage.ref('sliderImages')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          style={CustomUploadButtonStyles}
        >
          Select image
        </CustomUploadButton>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  inputCaption: PropTypes.object,
  inputChanged: PropTypes.func.isRequired,
};
export default ProfilePage;
