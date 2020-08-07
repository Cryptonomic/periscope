import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import Layout from '../components/Layout';
import { Accounts } from '../containers/Accounts';
import { Bakers } from '../containers/Bakers';


export default () => {

  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Accounts} />
        <Route exact path="/bakers" component={Bakers} />
        {/* <Redirect to="/" /> */}
      </Layout>
    </Switch>
  );
};
