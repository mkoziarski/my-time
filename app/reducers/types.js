// @flow
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import type Moment from 'moment';

export type Activity = {
  +id: string,
  +categoryId: string,
  +startTime: Moment,
  +endTime?: Moment,
  +comment?: string
};

export type LogDayItem = {
  +date: Moment,
  +entries: Array<Activity>
};

export type LogStateType = Array<LogDayItem>;

export type Category = {
  +id: string,
  +name: string
};

export type Categories = Array<Category>;

export type StateType = {
  +log: LogStateType,
  +categories: Categories
};

// export type Action = {
//   +type: string
// };

export type StartLogEntryAction = { type: 'START_LOG_ENTRY', categoryId: string };

export type EditCategoryAction = { type: 'EDIT_CATEGORY', id: string, name: string };

export type Action =
  | StartLogEntryAction
  | EditCategoryAction;

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
