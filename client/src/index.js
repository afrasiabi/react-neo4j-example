import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import css from './index.styl';

window.SERVER_ADDRESS = "http://localhost:8000"

ReactDOM.render(
  <AppContainer>
    <MuiThemeProvider>
      <App prop="authName"/>
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
          <MuiThemeProvider>
            <NextApp prop="authName"/>
          </MuiThemeProvider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}