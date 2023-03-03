import React, { Suspense } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AppLayout from 'layout/AppLayout'

const Dashboard = React.lazy(() => import('/Dashboard'))
const BlankPage = React.lazy(() => import('/blank-page'))
const TransaksiDonasi = React.lazy(() => import('/Transaksi'))
const Pengguna = React.lazy(() => import('/Pengguna'))
const SemuaDonasi = React.lazy(() => import('/Halaman'))
const HalamanGalangDana = React.lazy(() => import('/Halaman'))

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboard`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/transaksi-donasi`}
              render={(props) => <TransaksiDonasi {...props} />}
            />
            <Route
              path={`${match.url}/semua-donasi`}
              render={(props) => <SemuaDonasi {...props} />}
            />
            <Route
              path={`${match.url}/pengguna`}
              render={(props) => <Pengguna {...props} />}
            />
            <Route
              path={`${match.url}/halaman-galang-dana`}
              render={(props) => <HalamanGalangDana {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  )
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}

export default withRouter(connect(mapStateToProps, {})(App))
