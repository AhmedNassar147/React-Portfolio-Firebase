import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Slide } from 'react-materialize';

// eslint-disable-next-line
class SliderGalary extends React.Component {
  getAllImages = () =>
    !(this.props.sliderImages.length === 0) && (
      <Slider>
        {this.props.sliderImages.map((sliderImage) => (
          <Slide
            style={{ height: 600 }}
            key={sliderImage.downloadUrl}
            src={sliderImage.downloadUrl}
            title={sliderImage.caption}
          />
        ))}
      </Slider>
    );

  render() {
    return this.getAllImages();
  }
}
SliderGalary.propTypes = {
  sliderImages: PropTypes.arrayOf(PropTypes.object),
};

export default SliderGalary;
