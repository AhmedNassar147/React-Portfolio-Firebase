
import { fromJS } from 'immutable';
import createUserPortfolioReducer from '../reducer';

describe('createUserPortfolioReducer', () => {
  it('returns the initial state', () => {
    expect(createUserPortfolioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
