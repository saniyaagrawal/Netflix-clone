import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from "./Main";
import Play from './Play';

function App() {
  return (
      <Switch>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
  );
}

export default App;
