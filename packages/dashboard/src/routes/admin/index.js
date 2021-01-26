import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Pages from './pages';
import Features from './features';
import withAdminLayout from '../../layout/withAdminLayout';

const Posts = lazy(() => import('./posts'));

const Contact = lazy(() => import('../../container/contact/Contact'));

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}`} component={Features} />
        <Route path={`${path}/post`} component={Posts} />
        <Route path={`${path}/users/list`} component={Contact} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
