import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
//eslint-disable-next-line
class UserImages extends React.Component {
  constructor() {
    super();
    this.state = {
      file: '',
      imageUrl: '',
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imageUrl: reader.result,
      });
      this.props.userImageChanges('userImage', this.state.imageUrl);
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { requestAddUserImage } = this.props;
    const { imageUrl } = this.state;
    let imagePrivew = null;
    if (imageUrl) {
      imagePrivew = (
        <img src={imageUrl} alt="dasdasas" width="143px" height="170px" />
      );
    } else {
      imagePrivew = <div>fuck</div>;
    }
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <RaisedButton
            fullWidth
            label="Choose an Image"
            labelPosition="before"
            containerElement="label"
          >
            <input
              type="file"
              onChange={this.handleChange}
              style={styles.exampleImageInput}
            />
          </RaisedButton>
        </div>

        <div style={{ flex: 1 }}>
          <RaisedButton
            label="Upload Image"
            fullWidth
            primary
            onClick={requestAddUserImage}
          />
        </div>

        <div style={{ flex: 1 }}>{imagePrivew}</div>
      </div>
    );
  }
}
UserImages.propTypes = {
  userImageChanges: PropTypes.func.isRequired,
  requestAddUserImage: PropTypes.func.isRequired,
};

export default UserImages;
