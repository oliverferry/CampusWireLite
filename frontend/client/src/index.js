import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";


const theme = createMuiTheme({

  palette: {
    primary: {
      main: '#4267B2'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>,
  document.getElementById('root')
);


