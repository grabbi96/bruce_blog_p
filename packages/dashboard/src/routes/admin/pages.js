import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const Settings = lazy(() =>
  import('../../container/profile/settings/Settings')
);

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/404`} component={NotFound} />
      <Route path={`${path}/settings`} component={Settings} />
    </Switch>
  );
};

export default PagesRoute;
