import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';

const asyncLanguageChooser = asyncComponent(() => {
  return import('./components/Language/LanguageChooser/LanguageChooser');
});

const asyncDictionary = asyncComponent(() => {
  return import('./components/Dictionary/Dictionary');
});

const asyncTutor = asyncComponent(() => {
  return import('./components/Tutor/Tutor');
});

const App = props => {
  const selectedLanguage = useSelector(state => _.get(state, 'language.selectedLanguage'));
  const getRoutes = () => {
    let routes;
    if (selectedLanguage) {
      routes = (
        <Switch>
          <Route path='/dictionary' component={asyncDictionary} />
          <Route path='/tutor' component={asyncTutor} />
          <Route path='/language' component={asyncLanguageChooser} />
          <Redirect to='/dictionary' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/language' component={asyncLanguageChooser} />
          <Redirect to='/language' />
        </Switch>
      );
    }
    return routes;
  };

  return (
    <Layout>
      {getRoutes()}
    </Layout>
  );
}

export default withRouter(App);
