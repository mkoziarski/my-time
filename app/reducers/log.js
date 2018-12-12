// @flow
import moment from 'moment';
import uuid from 'uuid/v4';
import { START_LOG_ENTRY } from '../actions/log';
import type { LogDayItem, LogStateType, Action } from './types';

const findDaysEntryIndexBeforeTime = (log: LogStateType, time: moment): ?number => {
  let index;
  log.forEach((item, i) => {
    if (item.date.isBefore(time)) {
      index = i;
    }
  });
  return index;
};

const getDaysEntry = (log: LogStateType, now: moment): {
  daysEntry?: LogDayItem,
  index: number } => {

  const index = findDaysEntryIndexBeforeTime(log, now);

  if (index !== null && index !== undefined) {
    if (log[index].date.isSame(moment(now).startOf('day'), 'day')) {
      // we have the day log item for the new entry
      return { daysEntry: log[index], index };
    } else {
      // there's not a day entry in the log for the event being created,
      // return index + 1 as the index at which to create the new entry
      return { index: index + 1 };
    }
  } else {
    // there's not a day in the log that starts before the time of the new entry
    // return 0 as the index to create the log entry at
    // whether the log is empty or not
    return { index: 0 };
  }
};

const insertActivityIntoDaysEntry =
      (daysEntry: LogDayItem, now: moment, categoryId: string): LogDayItem => {

  // create activity entry in daysEntry:
  // assuming realtime event creation, either create the first event
  // or end the previous event for the day and create the new one
  return {
    ...daysEntry,
    entries: [
      ...daysEntry.entries.slice(0, -1),
      ...daysEntry.entries.slice(-1).map((item) => {
        if (item.endTime) {
          return item;
        }
        return { ...item, endTime: now };
      }),
      {
        id: uuid(),
        categoryId: categoryId,
        startTime: now
      }
    ]
  }
};

const initialLogState: LogStateType = [
  {
    date: moment().startOf('day'),
    entries: []
  }
];

export default function log(state: LogStateType = initialLogState, action: Action): LogStateType {
  switch (action.type) {
    case START_LOG_ENTRY:
      // ultimately we intend to support adding entries with arbitrary time,
      // for now, assume that entries are only created in real time
      const categoryId = action.categoryId;
      const now = moment();
      const { daysEntry, index } = getDaysEntry(state, now);
      if (daysEntry) {
        // replace entry for the day with an updated one
        return state.map((item, i) => {
          if (i !== index) {
            return item;
          }
          // Flow fails if we use action.categoryId in this context
          // doesn't recognize that action is a StartLogEntryAction
          // we use a binding created in the parent scope instead
          return insertActivityIntoDaysEntry(item, now, categoryId);
        });
      } else {
        return [
          ...state.slice(0, index),
          {
            date: moment(now).startOf('day'),
            entries: [{
              id: uuid(),
              categoryId: categoryId,
              startTime: now
            }]
          },
          ...state.slice(index)
        ]
      }
    default:
      return state;
  }
}
