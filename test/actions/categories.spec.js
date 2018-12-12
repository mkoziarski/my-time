import * as categoryActions from '../../app/actions/categories';

describe('category actions', () => {
  test('editCategory returns an EDIT_CATEGORY action', () => {
    const id = '1a1eb070-d55a-4bb9-a094-6529633e0fa0';
    const name = 'categoryName';

    expect(categoryActions.editCategory(id, name)).toMatchSnapshot();
  });
});
