// @flow
import type { StartLogEntryAction, GetState, Dispatch } from '../reducers/types';

export const START_LOG_ENTRY = 'START_LOG_ENTRY';

export function startLogEntry(categoryId: string): StartLogEntryAction {
  return {
    type: START_LOG_ENTRY,
    categoryId: categoryId
  }
}
