import { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { adminRoot } from 'constants/defaultValues'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from 'redux/actions'
import menuItems from 'constants/menu'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedParentMenu: '',
      isDashboardHovered: false,
      isTransaksiHovered: false,
      isHalamanHovered: false,
      isPenggunaHovered: false,
      isSlideHovered: false,
      isFundraiserHovered: false,
      containerClassnames: '',
      menuClickCount: 0,
    }
    // this bind required cause default this is undefined
    this.handleDashboardMouseEnter = this.handleDashboardMouseEnter.bind(this)
    this.handleDashboardMouseLeave = this.handleDashboardMouseLeave.bind(this)
    this.handleTransaksiMouseEnter = this.handleTransaksiMouseEnter.bind(this)
    this.handleTransaksiMouseLeave = this.handleTransaksiMouseLeave.bind(this)
    this.handleHalamanMouseEnter = this.handleHalamanMouseEnter.bind(this)
    this.handleHalamanMouseLeave = this.handleHalamanMouseLeave.bind(this)
    this.handlePenggunaMouseEnter = this.handlePenggunaMouseEnter.bind(this)
    this.handlePenggunaMouseLeave = this.handlePenggunaMouseLeave.bind(this)
    this.handleSlideMouseEnter = this.handleSlideMouseEnter.bind(this)
    this.handleSlideMouseLeave = this.handleSlideMouseLeave.bind(this)
    this.handleFundraiserMouseEnter = this.handleFundraiserMouseEnter.bind(this)
    this.handleFundraiserMouseLeave = this.handleFundraiserMouseLeave.bind(this)
  }

  handleDashboardMouseEnter() {
    this.setState({ isDashboardHovered: true })
  }

  handleDashboardMouseLeave() {
    this.setState({ isDashboardHovered: false })
  }

  handleTransaksiMouseEnter() {
    this.setState({ isTransaksiHovered: true })
  }

  handleTransaksiMouseLeave() {
    this.setState({ isTransaksiHovered: false })
  }

  handleHalamanMouseEnter() {
    this.setState({ isHalamanHovered: true })
  }

  handleHalamanMouseLeave() {
    this.setState({ isHalamanHovered: false })
  }

  handlePenggunaMouseEnter() {
    this.setState({ isPenggunaHovered: true })
  }

  handlePenggunaMouseLeave() {
    this.setState({ isPenggunaHovered: false })
  }

  handleSlideMouseEnter() {
    this.setState({ isSlideHovered: true })
  }

  handleSlideMouseLeave() {
    this.setState({ isSlideHovered: false })
  }

  handleFundraiserMouseEnter() {
    this.setState({ isFundraiserHovered: true })
  }

  handleFundraiserMouseLeave() {
    this.setState({ isFundraiserHovered: false })
  }

  handleWindowResize(e) {
    if (e && !e.isTrusted) {
      return
    }
    const { containerClassnames } = this.props
    const nextClasses = this.getMenuClassesForResize(containerClassnames)
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems
    )
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props
    let nextClasses = classes.split(' ').filter((x) => x !== '')
    const windowWidth = window.innerWidth
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile')
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden')
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden')
      }
    }
    return nextClasses
  }

  toggle() {
    const hasSubItems = this.getIsHasSubItem()
    this.props.changeSelectedMenuHasSubItems(hasSubItems)
    const { containerClassnames, menuClickCount } = this.props
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : ''
    let clickIndex = -1

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0
    }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      )
    }
  }

  setSelectedLiActive(callback) {
    const oldli = document.querySelector('.sub-menu  li.active')
    if (oldli != null) {
      oldli.classList.remove('active')
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active')
    if (oldliSub != null) {
      oldliSub.classList.remove('active')
    }

    const selectedSublink = document.querySelector(
      '.third-level-menu  a.active'
    )
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add('active')
    }

    const selectedlink = document.querySelector('.sub-menu  a.active')
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active')
      this.setState(
        {
          selectedParentMenu:
            selectedlink.parentElement.parentElement.getAttribute(
              'data-parent'
            ),
        },
        callback
      )
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      )
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu:
              selectedParentNoSubItem.getAttribute('data-flag'),
          },
          callback
        )
      } else if (this.state.selectedParentMenu === '') {
        this.setState(
          {
            selectedParentMenu: menuItems[0].id,
          },
          callback
        )
      }
    }
  }

  setHasSubItemStatus() {
    const hasSubmenu = this.getIsHasSubItem()
    this.props.changeSelectedMenuHasSubItems(hasSubmenu)
    this.toggle()
  }

  getIsHasSubItem() {
    const { selectedParentMenu } = this.state
    const menuItem = menuItems.find((x) => x.id === selectedParentMenu)
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0)
    return false
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
    this.setSelectedLiActive(this.setHasSubItemStatus)
  }

  componentWillUnmount() {
    this.removeEvents()
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render() {
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {/* DASHBOARD */}
                <NavItem
                  className={`${
                    this.props.location.pathname === '/app/dashboard' &&
                    'active'
                  }`}
                  onMouseEnter={this.handleDashboardMouseEnter}
                  onMouseLeave={this.handleDashboardMouseLeave}
                >
                  <NavLink to={`${adminRoot}/dashboard`} data-flag="dashboard">
                    <span style={{ marginBottom: '4px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          stroke={
                            this.props.location.pathname === '/app/dashboard' ||
                            this.state.isDashboardHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.027 3.787l-7.187 5.6c-1.2.933-2.173 2.92-2.173 4.426v9.88c0 3.094 2.52 5.627 5.613 5.627h15.44c3.093 0 5.613-2.533 5.613-5.613V14c0-1.613-1.08-3.68-2.4-4.6l-8.24-5.773c-1.867-1.307-4.867-1.24-6.667.16zM16 23.987v-4"
                        />
                      </svg>
                    </span>
                    <span>Dashboard</span>
                  </NavLink>
                </NavItem>
                {/* TRANSAKSI */}
                <NavItem
                  className={`${
                    this.props.location.pathname === '/app/transaksi-donasi' &&
                    'active'
                  }`}
                  onMouseEnter={this.handleTransaksiMouseEnter}
                  onMouseLeave={this.handleTransaksiMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/transaksi-donasi`}
                    data-flag="transaksi"
                  >
                    <span style={{ marginBottom: '4px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          stroke={
                            this.props.location.pathname ===
                              '/app/transaksi-donasi' ||
                            this.state.isTransaksiHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 29.333h8c6.666 0 9.333-2.666 9.333-9.333v-8c0-6.667-2.666-9.334-9.333-9.334h-8c-6.667 0-9.334 2.667-9.334 9.334v8c0 6.666 2.667 9.333 9.334 9.333z"
                        />
                        <path
                          stroke={
                            this.props.location.pathname ===
                              '/app/transaksi-donasi' ||
                            this.state.isTransaksiHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.773 19.32l3.174-4.12a1.338 1.338 0 011.88-.24l2.44 1.92a1.349 1.349 0 001.88-.226l3.08-3.974"
                        />
                      </svg>
                    </span>
                    <span>Transaksi</span>
                  </NavLink>
                </NavItem>
                {/* HALAMAN */}
                <NavItem
                  className={`${
                    this.props.location.pathname.substring(0, 24) ===
                    '/app/halaman-galang-dana'
                      ? 'active'
                      : ''
                  }`}
                  onMouseEnter={this.handleHalamanMouseEnter}
                  onMouseLeave={this.handleHalamanMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/halaman-galang-dana`}
                    data-flag="halaman"
                  >
                    <span style={{ marginBottom: '4px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 24) ===
                              '/app/halaman-galang-dana' ||
                            this.state.isHalamanHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M29.333 13.333V20c0 6.666-2.666 9.333-9.333 9.333h-8c-6.667 0-9.334-2.666-9.334-9.333v-8c0-6.667 2.667-9.334 9.334-9.334h6.666"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 24) ===
                              '/app/halaman-galang-dana' ||
                            this.state.isHalamanHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M29.333 13.333H24c-4 0-5.334-1.333-5.334-5.333V2.667l10.667 10.666zM9.334 17.334h8M9.334 22.666h5.333"
                        />
                      </svg>
                    </span>
                    <span>Halaman</span>
                  </NavLink>
                </NavItem>
                {/* PENGGUNA */}
                <NavItem
                  className={`${
                    this.props.location.pathname.substring(0, 13) ===
                      '/app/pengguna' && 'active'
                  }`}
                  onMouseEnter={this.handlePenggunaMouseEnter}
                  onMouseLeave={this.handlePenggunaMouseLeave}
                >
                  <NavLink to={`${adminRoot}/pengguna`} data-flag="pengguna">
                    <span style={{ marginBottom: '4px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 13) ===
                              '/app/pengguna' || this.state.isPenggunaHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16 16a6.667 6.667 0 100-13.333A6.667 6.667 0 0016 16zM27.453 29.333C27.453 24.173 22.32 20 16 20c-6.32 0-11.453 4.173-11.453 9.333"
                        />
                      </svg>
                    </span>
                    <span>Pengguna</span>
                  </NavLink>
                </NavItem>
                {/* SLIDE */}
                <NavItem
                  className={`${
                    this.props.location.pathname.substring(0, 10) ===
                    '/app/slide'
                      ? 'active'
                      : ''
                  }`}
                  onMouseEnter={this.handleSlideMouseEnter}
                  onMouseLeave={this.handleSlideMouseLeave}
                >
                  <NavLink to={`${adminRoot}/slide`} data-flag="slide">
                    <span style={{ marginBottom: '4px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 10) ===
                              '/app/slide' || this.state.isSlideHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 29.333h8c6.666 0 9.333-2.666 9.333-9.333v-8c0-6.667-2.666-9.334-9.333-9.334h-8c-6.667 0-9.334 2.667-9.334 9.334v8c0 6.666 2.667 9.333 9.334 9.333z"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 10) ===
                              '/app/slide' || this.state.isSlideHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 13.333A2.667 2.667 0 1012 8a2.667 2.667 0 000 5.333zM3.56 25.267l6.573-4.414c1.054-.706 2.574-.626 3.52.187l.44.387c1.04.893 2.72.893 3.76 0l5.547-4.76c1.04-.894 2.72-.894 3.76 0l2.173 1.866"
                        />
                      </svg>
                    </span>
                    <span>Slide</span>
                  </NavLink>
                </NavItem>
                {/* FUNDRAISER */}
                <NavItem
                  className={`${
                    this.props.location.pathname.substring(0, 15) ===
                      '/app/fundraiser' && 'active'
                  }`}
                  onMouseEnter={this.handleFundraiserMouseEnter}
                  onMouseLeave={this.handleFundraiserMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/fundraiser`}
                    data-flag="fundraiser"
                  >
                    <span style={{ marginBottom: '4px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 15) ===
                              '/app/fundraiser' ||
                            this.state.isFundraiserHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M24.0004 9.54663C23.9204 9.5333 23.8271 9.5333 23.7471 9.54663C21.9071 9.47996 20.4404 7.9733 20.4404 6.10663C20.4404 4.19996 21.9738 2.66663 23.8804 2.66663C25.7871 2.66663 27.3204 4.2133 27.3204 6.10663C27.3071 7.9733 25.8404 9.47996 24.0004 9.54663Z"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 15) ===
                              '/app/fundraiser' ||
                            this.state.isFundraiserHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M22.6269 19.2536C24.4536 19.5603 26.4669 19.2403 27.8803 18.2936C29.7603 17.0403 29.7603 14.987 27.8803 13.7336C26.4536 12.787 24.4136 12.467 22.5869 12.787"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 15) ===
                              '/app/fundraiser' ||
                            this.state.isFundraiserHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M7.95965 9.54675C8.03965 9.53342 8.13298 9.53342 8.21298 9.54675C10.053 9.48009 11.5196 7.97342 11.5196 6.10675C11.5196 4.20008 9.98632 2.66675 8.07965 2.66675C6.17298 2.66675 4.63965 4.21342 4.63965 6.10675C4.65298 7.97342 6.11965 9.48009 7.95965 9.54675Z"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 15) ===
                              '/app/fundraiser' ||
                            this.state.isFundraiserHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.33325 19.2536C7.50659 19.5603 5.49325 19.2403 4.07992 18.2936C2.19992 17.0403 2.19992 14.987 4.07992 13.7336C5.50659 12.787 7.54658 12.467 9.37325 12.787"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 15) ===
                              '/app/fundraiser' ||
                            this.state.isFundraiserHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M15.9995 19.507C15.9195 19.4936 15.8261 19.4936 15.7461 19.507C13.9061 19.4403 12.4395 17.9336 12.4395 16.067C12.4395 14.1603 13.9728 12.627 15.8795 12.627C17.7861 12.627 19.3195 14.1736 19.3195 16.067C19.3061 17.9336 17.8395 19.4536 15.9995 19.507Z"
                        />
                        <path
                          stroke={
                            this.props.location.pathname.substring(0, 15) ===
                              '/app/fundraiser' ||
                            this.state.isFundraiserHovered
                              ? '#E7513B'
                              : '#717171'
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.12 23.7071C10.24 24.9604 10.24 27.0138 12.12 28.2671C14.2533 29.6938 17.7466 29.6938 19.88 28.2671C21.76 27.0138 21.76 24.9604 19.88 23.7071C17.76 22.2938 14.2533 22.2938 12.12 23.7071Z"
                        />
                      </svg>
                    </span>
                    <span>Fundraiser</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ menu, authUser }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  } = menu

  const { currentUser } = authUser
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
    currentUser,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
  })(Sidebar)
)
