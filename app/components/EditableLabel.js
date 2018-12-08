// @flow
import * as React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import styles from './EditableLabel.css';

type Props = {
  onChange: (value: string) => void,
  label: string
};

type State = {
  editing: boolean,
  dirtyValue: ?string
};

export default class LogTrack extends React.Component<Props, State> {
  state = {
    editing: false,
    dirtyValue: null
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
      this.setState({ dirtyValue: event.currentTarget.value });
  }

  handleKeyUp = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.triggerChange();
    } else if (event.key === 'Escape') {
      this.setState({ editing: false, dirtyValue: null });
    }
  }

  triggerChange = () => {
      const { onChange } = this.props;
      const { dirtyValue } = this.state;
      if (dirtyValue) { // only set if not empty
          onChange(dirtyValue);
      }
      this.setState({ editing: false, dirtyValue: null });
  }

  render() {
    const { label } = this.props;
    const { editing, dirtyValue } = this.state;

    return (
      editing
        ?
          <input
            type="text"
            className={styles.input}
            autoFocus
            value={dirtyValue !== null ? dirtyValue : label}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onBlur={this.triggerChange} />
        :
          <span className={styles.display}>
            <span
              className={styles.editIconBox}
              onClick={() => {this.setState({ editing: true })}}>

              <FaRegEdit />
            </span>
            {' '}
            {label}
          </span>
    );
  }
}
