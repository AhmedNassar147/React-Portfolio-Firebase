import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paper } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import mainPageActions from './actions';
import {
  makeSelectSliderImages,
  makeSelectCurrentUser,
} from '../App/selectors';
import Appbar from '../../components/Appbar/index';
import SliderGalary from '../../components/SliderGalary/index';
import Intro from '../../components/Intro/index';

// eslint-disable-next-line
export class MainPage extends React.Component {
  componentWillMount() {
    this.props.mainPageLoading();
    this.props.onMainLoadingPrepareSLider();
  }
  render() {
    const {
      sliderImages,
      signOut,
      headToCreatePortfolio,
      headToUserProfile,
      currentUser,
    } = this.props;

    return (
      <div>
        <div>
          <Appbar
            signOut={signOut}
            headToCreatePortfolio={headToCreatePortfolio}
            headToUserProfile={headToUserProfile}
            currentUser={currentUser}
          />
        </div>

        <Paper>
          <SliderGalary sliderImages={sliderImages} />
        </Paper>

        <Paper>
          <Intro />
        </Paper>
      </div>
    );
  }
}

MainPage.propTypes = {
  mainPageLoading: PropTypes.func,
  onMainLoadingPrepareSLider: PropTypes.func,
  sliderImages: PropTypes.arrayOf(PropTypes.object),
  signOut: PropTypes.func.isRequired,
  headToCreatePortfolio: PropTypes.func,
  headToUserProfile: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
  sliderImages: makeSelectSliderImages(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    mainPageLoading: () => dispatch(mainPageActions.mainPageLoading()),
    onMainLoadingPrepareSLider: () => dispatch(mainPageActions.prepareSlider()),
    signOut: () => dispatch(mainPageActions.signOut()),
    headToCreatePortfolio: () =>
      dispatch(mainPageActions.headToCreatePortfolio()),
    headToUserProfile: () => dispatch(mainPageActions.headToUserprofile()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(withReducer, withSaga, withConnect)(MainPage);
