// @flow
import React, { Component } from 'react';
import type { Activity, Category } from '../reducers/types';
import { timeToDayPercentage } from '../utils/time';
import EditableLabel from './EditableLabel';
import styles from './LogTrack.css';

type Props = {
  startLogEntry: (categoryId: string) => void,
  editCategory: (id: string, name: string) => void,
  category: Category,
  activities: Array<Activity>
};

export default class LogTrack extends Component<Props> {
  props: Props;

  render() {
    const { startLogEntry, editCategory, activities, category } = this.props;

    return (
      <div className={styles.activityLine}>
        <span className={styles.activityLabel}>
          <EditableLabel
            label={category.name}
            onChange={(value) => { editCategory(category.id, value); }} />
        </span>
        <div className={styles.activityBar} onClick={() => { startLogEntry(category.id); }}>
          {activities.map((activity) => (
            <div
              className={styles.activityItem}
              key={activity.id}
              style={{
                left: `${timeToDayPercentage(activity.startTime)}%`,
                right: activity.endTime
                  ?
                    `${100 - timeToDayPercentage(activity.endTime)}%`
                  :
                    `${100 - timeToDayPercentage(activity.startTime)}%`
              }} />
            ))
          }
        </div>
      </div>
    );
  }
}
