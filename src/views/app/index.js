import React, { Suspense } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AppLayout from 'layout/AppLayout'

const Dashboard = React.lazy(() => import('./Dashboard'))
const BlankPage = React.lazy(() => import('./blank-page'))
const TransaksiDonasi = React.lazy(() => import('./Transaksi'))
const DetailTransaksi = React.lazy(() => import('./Transaksi/DetailTransaksi'))
const Pengguna = React.lazy(() => import('./Pengguna'))
const DetailPengguna = React.lazy(() => import('./Pengguna/DetailPengguna'))
const HalamanGalangDana = React.lazy(() => import('./HalamanGalangDana'))
const DetailGalangDana = React.lazy(() =>
  import('./HalamanGalangDana/DetailGalangDana')
)
const SlidePage = React.lazy(() => import('./slide'))
const AddSlide = React.lazy(() => import('./slide/AddSlide'))
const EditSlide = React.lazy(() => import('./slide/EditSlide'))
const SurveyCharts = React.lazy(() =>
  import('../../containers/applications/SurveyCharts')
)

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
              exact
              path={`${match.url}/transaksi-donasi`}
              render={(props) => <TransaksiDonasi {...props} />}
            />
            <Route
              exact
              path={`${match.url}/transaksi-donasi/detail/:id`}
              render={(props) => <DetailTransaksi {...props} />}
            />
            <Route
              exact
              path={`${match.url}/pengguna`}
              render={(props) => <Pengguna {...props} />}
            />
            <Route
              exact
              path={`${match.url}/pengguna/detail/:id`}
              render={(props) => <DetailPengguna {...props} />}
            />
            <Route
              exact
              path={`${match.url}/halaman-galang-dana`}
              render={(props) => <HalamanGalangDana {...props} />}
            />
            <Route
              exact
              path={`${match.url}/halaman-galang-dana/detail/:id`}
              render={(props) => <DetailGalangDana {...props} />}
            />
            <Route
              exact
              path={`${match.url}/slide`}
              render={(props) => <SlidePage {...props} />}
            />
            <Route
              path={`${match.url}/slide/add`}
              render={(props) => <AddSlide {...props} />}
            />
            <Route
              path={`${match.url}/slide/edit/:id`}
              render={(props) => <EditSlide {...props} />}
            />
            <Route
              path={`${match.url}/chart`}
              render={(props) => <SurveyCharts {...props} />}
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
