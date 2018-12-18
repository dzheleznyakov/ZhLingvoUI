import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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

class App extends Component {
  getRoutes = () => {
    let routes;
    const selectedLanguage = this.props.selectedLanguage;
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

  render() {
    return (
      <Layout>
        {this.getRoutes()}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLanguage: state.language.selectedLanguage,
  };
};

export default withRouter(connect(mapStateToProps)(App));
