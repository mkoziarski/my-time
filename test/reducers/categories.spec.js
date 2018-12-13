import categories from '../../app/reducers/categories';
import { EDIT_CATEGORY } from '../../app/actions/categories';

describe('categories reducer', () => {
  const sampleId = 'f5e96125-4abb-416a-aa36-03d2bac923a9';
  const sampleState = [{ id: sampleId, name: 'sample name' }];

  test('returns initial state if passed undefined', () => {
    const state = categories(undefined, {});
    expect(state.length).toBeGreaterThan(0);
  });

  test('handles EDIT_CATEGORY', () => {
    const state = categories(
      sampleState,
      {
        type: EDIT_CATEGORY,
        id: sampleId,
        name: 'changed name'
      }
    );
    expect(state).toMatchSnapshot();
  });

  test('handles unknown action', () => {
    expect(categories(sampleState, { type: 'unknown' })).toMatchSnapshot();
  });
});
