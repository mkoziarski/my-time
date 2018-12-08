// @flow
import type { EditCategoryAction } from '../reducers/types';

export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export function editCategory(id: string, name: string): EditCategoryAction {
  return {
    type: EDIT_CATEGORY,
    id: id,
    name: name
  }
}
