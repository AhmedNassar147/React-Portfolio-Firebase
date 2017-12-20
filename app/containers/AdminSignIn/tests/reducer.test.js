
import { fromJS } from 'immutable';
import adminSignInReducer from '../reducer';

describe('adminSignInReducer', () => {
  it('returns the initial state', () => {
    expect(adminSignInReducer(undefined, {})).toEqual(fromJS({}));
  });
});
