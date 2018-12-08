# My Time

An application for tracking where time is spent during the day. It presents a timeline with tracks corresponding to different categories of activities. Clicking a track starts an activity of the given category. A set of example category tracks are provided and they can be renamed as needed.

This is a very early stage of the project with the bare minimum of functionality to demonstrate the general idea.

## Running

This is an [Electron](https://electronjs.org/) app, based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). The UI is built with [React](https://reactjs.org/), [Redux](https://redux.js.org/) is used for state managemet and [Flow](https://flow.org/) for static type checking.

To run the app, install dependencies:

```bash
$ yarn
```

and start in development mode with

```bash
$ yarn dev
```

Please refer to `electron-react-boilerplate`'s documentation for more information.

Note: the version of `electron-react-boilerplate` used is compatible with Node >=10.x <11. Use [nvm](https://github.com/creationix/nvm) to get a compatible Node version. This repository comes with an `.nvmrc` file for this purpose.

## Major issues / unimplemented functionality

- No persistence. Logged activities will not be remembered across app restarts.

## Other planned features

- Add ability to add new categories in addition to renaming existing ones,
- Add ability to add notes with more detailed information about an activity,
- Provide statistics such as aggregate time spent on a particular activity category
- Allow for hierarchical categories
- Various UI improvements
