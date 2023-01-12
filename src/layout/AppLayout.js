import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TopNav from 'containers/navs/Topnav'
import Sidebar from 'containers/navs/Sidebar'

const AppLayout = ({ containerClassnames, children, history }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  )
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}
const mapActionToProps = {}

export default withRouter(connect(mapStateToProps, mapActionToProps)(AppLayout))
