import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Forms = lazy(() => import('../../container/forms/Forms'));
const Editors = lazy(() => import('../../container/pages/Editor'));

const FeaturesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/editor`} component={Editors} />
      <Route path={`${path}/forms`} component={Forms} />
    </Switch>
  );
};

export default FeaturesRoute;
