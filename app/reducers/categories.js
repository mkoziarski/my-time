// @flow
import uuid from 'uuid/v4';
import type { Categories, Action } from './types';
import { EDIT_CATEGORY } from '../actions/categories';

const initialCategories: Categories = [
  { id: uuid(), name: 'hoovering'},
  { id: uuid(), name: 'washing up'},
  { id: uuid(), name: 'laundry'},
  { id: uuid(), name: 'shopping'},
  { id: uuid(), name: 'cooking'},
  { id: uuid(), name: 'meals'},
  { id: uuid(), name: 'time with Edzilla'}
];

export default function categories(state: Categories = initialCategories, action: Action): Categories {
  switch (action.type) {
    case EDIT_CATEGORY:
      const id = action.id;
      const name = action.name;

      return state.map((category) => {
        // Flow fails if we use action.id and action.name in this context
        // doesn't recognize that action is an EditCategoryAction
        // we use bindings created in the parent scope instead
        if (category.id === id) {
          return {
            ...category,
            name: name
          };
        }

        return category;
      });
    default:
      return state;
  }
};
