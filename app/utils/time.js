// @flow
import moment from 'moment';

export const timeFormat = 'HH:mm:ss';
export const dateTimeFormat = `MMM Do, ${timeFormat}`;

export const timeToDayPercentage = (time: moment): number => {
  const day = moment(time).startOf('day');
  const diff = time.diff(day, 'seconds');
  return diff / 864; // percentage of the number of seconds in a day
}
