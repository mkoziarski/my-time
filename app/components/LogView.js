// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import type { Activity, LogStateType, Categories } from '../reducers/types';
import { timeFormat, dateTimeFormat } from '../utils/time';
import LogTrack from './LogTrack';
import styles from './LogView.css';
import routes from '../constants/routes';

type Props = {
  startLogEntry: (categoryId: string) => void,
  editCategory: (id: string, name: string) => void,
  log: LogStateType,
  categories: Categories
};

const logActivityBounds = (activity: Activity) => {
  const startTimeText = activity.startTime.format(dateTimeFormat);
  let endTimeText;
  if (activity.endTime !== undefined && activity.endTime !== null) {
    endTimeText = activity.endTime.format(timeFormat);
  }

  return (endTimeText)
    ?
      `${startTimeText} – ${endTimeText}`
    :
      `started ${startTimeText}`;
}

export default class LogView extends Component<Props> {
  props: Props;

  findTodaysLogItem = () => (
    this.props.log.find(
      (item) => (item.date.isSame(moment().startOf('day'), 'day'))
    )
  )

  render() {
    const {
      startLogEntry,
      editCategory,
      log,
      categories
    } = this.props;

    const todaysLog = this.findTodaysLogItem();

    return (
      <div className={styles.LogView}>
        {/*<div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>*/}

        {categories.map((category) => (
          <LogTrack
            key={category.id}
            startLogEntry={startLogEntry}
            editCategory={editCategory}
            category={category}
            activities={
              todaysLog &&
              todaysLog.entries
                .filter((item) => (item.categoryId === category.id)) ||
              []
            } />
        ))}

        <div className={styles.activityLog}>
          {todaysLog && todaysLog.entries.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityName}>
                {(() => {
                  const cat = categories.find((cat) => (cat.id === activity.categoryId));
                  return cat ? cat.name : 'unknown';
                })()}:
              </div>
              <div className={styles.activityBounds}>
                {logActivityBounds(activity)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
