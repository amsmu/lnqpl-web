import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDetails from './views/userDetails/userDetails';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/'>
            <UserDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
