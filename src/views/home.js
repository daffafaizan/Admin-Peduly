import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const UserLogin = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './user/newLogin')
)

const Home = () => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from="/" to="user/login" />
      <Route path="user/login" render={(props) => <UserLogin {...props} />} />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
export default Home
