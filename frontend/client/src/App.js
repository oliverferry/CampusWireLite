import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import { CssBaseline } from '@material-ui/core';



function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline/>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
