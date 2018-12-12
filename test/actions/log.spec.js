import * as logActions from '../../app/actions/log';

describe('log actions', () => {
  test('startLogEntry returns a START_LOG_ENTRY action', () => {
    expect(logActions.startLogEntry('864df9b8-8885-4285-8ee1-426f8b8e7abf'))
      .toMatchSnapshot();
  });
});
