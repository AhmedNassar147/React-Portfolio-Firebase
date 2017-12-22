import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'containers/LoginPage/Loadable';
import signUpPage from 'containers/SignUpPage/Loadable';
import MainPage from 'containers/MainPage/Loadable';
import AdminSignIn from 'containers/AdminSignIn/Loadable';
import AdminPage from 'containers/AdminPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import UserProfile from 'components/UserProfile/Loadable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signUp" component={signUpPage} />
          <Route exact path="/admin" component={AdminSignIn} />
          <Route exact path="/adminPage" component={AdminPage} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/userProfile" component={UserProfile} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}
