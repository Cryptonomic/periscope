import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import Layout from '../components/Layout';
import { Accounts } from '../containers/Accounts';
import { Bakers } from '../containers/Bakers';
import { Contracts } from '../containers/Contracts';

export default () => {

  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Accounts} />
        <Route exact path="/bakers" component={Bakers} />
        <Route exact path="/contracts" component={Contracts} />
        
        {/* <Redirect to="/" /> */}
      </Layout>
    </Switch>
  );
};
