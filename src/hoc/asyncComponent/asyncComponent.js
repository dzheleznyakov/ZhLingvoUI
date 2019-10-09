/*
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const asyncComponent = props => {
  console.dir(props);
  
  const [component, setComponent] = useState(null);
  const { importComponent } = props;
  useEffect(() => {
    importComponent().then(cmp => setComponent(cmp.default));
  }, []);

  const C = component;
  return C ? <C {..._.omit(props, 'importComponent')} /> : null;
};

export default asyncComponent;
*/

import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
      state = {
          component: null,
      };

      componentDidMount() {
          importComponent()
              .then(cmp => {
                  this.setState({ component: cmp.default })
              });
      }

      render() {
          const C = this.state.component;
          return C ? <C {...this.props} /> : null;
      }
  };
};

export default asyncComponent;
