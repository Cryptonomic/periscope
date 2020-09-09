import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import { Accounts } from '../containers/Accounts';
import { Bakers } from '../containers/Bakers';
import { Contracts } from '../containers/Contracts';
import { Operations } from '../containers/Operations';
import { Blocks } from '../containers/Blocks';
import { Home } from '../containers/Home';

export default () => {

  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/bakers" component={Bakers} />
        <Route exact path="/contracts" component={Contracts} />
        <Route exact path="/operations" component={Operations} />
        <Route exact path="/blocks" component={Blocks} />
      </Layout>
    </Switch>
  );
};
