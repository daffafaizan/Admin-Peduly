/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Nav, NavItem } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { adminRoot } from 'constants/defaultValues'
// import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar'

import IntlMessages from 'helpers/IntlMessages'

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
      // viewingParentMenu: '',
      // collapsedMenus: [],
      isDashboardHovered: false,
      isTransaksiHovered: false,
      isHalamanHovered: false,
      isPenggunaHovered: false,
      isSlideHovered: false,
    }
  }

  handleDashboardMouseEnter = () => {
    this.setState({ isDashboardHovered: true })
  }

  handleDashboardMouseLeave = () => {
    this.setState({ isDashboardHovered: false })
  }

  handleTransaksiMouseEnter = () => {
    this.setState({ isTransaksiHovered: true })
  }

  handleTransaksiMouseLeave = () => {
    this.setState({ isTransaksiHovered: false })
  }

  handleHalamanMouseEnter = () => {
    this.setState({ isHalamanHovered: true })
  }

  handleHalamanMouseLeave = () => {
    this.setState({ isHalamanHovered: false })
  }

  handlePenggunaMouseEnter = () => {
    this.setState({ isPenggunaHovered: true })
  }

  handlePenggunaMouseLeave = () => {
    this.setState({ isPenggunaHovered: false })
  }

  handleSlideMouseEnter = () => {
    this.setState({ isSlideHovered: true })
  }

  handleSlideMouseLeave = () => {
    this.setState({ isSlideHovered: false })
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return
    }
    const { containerClassnames } = this.props
    const nextClasses = this.getMenuClassesForResize(containerClassnames)
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      // eslint-disable-next-line react/destructuring-assignment
      this.props.selectedMenuHasSubItems
    )
  }

  handleDocumentClick = (e) => {
    const container = this.getContainer()
    let isMenuClick = false
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return
    }
    // this.setState({
    //   viewingParentMenu: '',
    // });
    this.toggle()
  }

  getMenuClassesForResize = (classes) => {
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

  getContainer = () => {
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(this)
  }

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem()
    // eslint-disable-next-line react/destructuring-assignment
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
      // eslint-disable-next-line react/destructuring-assignment
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      )
    }
  }

  handleProps = () => {
    this.addEvents()
  }

  addEvents = () => {
    ;['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    )
  }

  removeEvents = () => {
    ;['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    )
  }

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active')
    if (oldli != null) {
      oldli.classList.remove('active')
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active')
    if (oldliSub != null) {
      oldliSub.classList.remove('active')
    }

    /* set selected parent menu */
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
        // eslint-disable-next-line react/destructuring-assignment
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

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeSelectedMenuHasSubItems(hasSubmenu)
    this.toggle()
  }

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state
    const menuItem = menuItems.find((x) => x.id === selectedParentMenu)
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0)
    return false
  }

  // componentDidUpdate(prevProps) {
  //   // eslint-disable-next-line react/destructuring-assignment
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.setSelectedLiActive(this.setHasSubItemStatus);

  //     window.scrollTo(0, 0);
  //   }
  //   this.handleProps();
  // }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
    this.handleProps()
    this.setSelectedLiActive(this.setHasSubItemStatus)
  }

  componentWillUnmount() {
    this.removeEvents()
    window.removeEventListener('resize', this.handleWindowResize)
  }

  // openSubMenu = (e, menuItem) => {
  //   const selectedParent = menuItem.id;
  //   const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
  //   // eslint-disable-next-line react/destructuring-assignment
  //   this.props.changeSelectedMenuHasSubItems(hasSubMenu);
  //   if (!hasSubMenu) {
  //     this.setState({
  //       // viewingParentMenu: selectedParent,
  //       selectedParentMenu: selectedParent,
  //     });
  //     this.toggle();
  //   } else {
  //     e.preventDefault();

  //     const { containerClassnames, menuClickCount } = this.props;
  //     const currentClasses = containerClassnames
  //       ? containerClassnames.split(' ').filter((x) => x !== '')
  //       : '';

  //     if (!currentClasses.includes('menu-mobile')) {
  //       if (
  //         currentClasses.includes('menu-sub-hidden') &&
  //         (menuClickCount === 2 || menuClickCount === 0)
  //       ) {
  //         // eslint-disable-next-line react/destructuring-assignment
  //         this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
  //       } else if (
  //         currentClasses.includes('menu-hidden') &&
  //         (menuClickCount === 1 || menuClickCount === 3)
  //       ) {
  //         // eslint-disable-next-line react/destructuring-assignment
  //         this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
  //       } else if (
  //         currentClasses.includes('menu-default') &&
  //         !currentClasses.includes('menu-sub-hidden') &&
  //         (menuClickCount === 1 || menuClickCount === 3)
  //       ) {
  //         // eslint-disable-next-line react/destructuring-assignment
  //         this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
  //       }
  //     } else {
  //       // eslint-disable-next-line react/destructuring-assignment
  //       this.props.addContainerClassname(
  //         'sub-show-temporary',
  //         containerClassnames
  //       );
  //     }
  //     // this.setState({
  //     //   viewingParentMenu: selectedParent,
  //     // });
  //   }
  // };

  // toggleMenuCollapse = (e, menuKey) => {
  //   e.preventDefault();

  //   const { collapsedMenus } = this.state;
  //   if (collapsedMenus.indexOf(menuKey) > -1) {
  //     this.setState({
  //       collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
  //     });
  //   } else {
  //     collapsedMenus.push(menuKey);
  //     this.setState({
  //       collapsedMenus,
  //     });
  //   }
  //   return false;
  // };

  // eslint-disable-next-line no-shadow
  // filteredList = (menuItems) => {
  //   const { currentUser } = this.props;
  //   if (currentUser) {
  //     return menuItems.filter(
  //       (x) => (x.roles && x.roles.includes(currentUser.role)) || !x.roles
  //     );
  //   }
  //   return menuItems;
  // };

  render() {
    // const { selectedParentMenu, viewingParentMenu } = this.state;
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                <NavItem
                  className={`${
                    // eslint-disable-next-line react/destructuring-assignment
                    this.props.location.pathname === '/app/dashboard' &&
                    'active'
                  }`}
                  onMouseEnter={this.handleDashboardMouseEnter}
                  onMouseLeave={this.handleDashboardMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/dashboard`}
                    // onClick={(e) => this.openSubMenu(e, item)}
                    data-flag="dashboard"
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
                            // eslint-disable-next-line react/destructuring-assignment
                            this.props.location.pathname === '/app/dashboard' ||
                            // eslint-disable-next-line react/destructuring-assignment
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
                    <IntlMessages id="dashboard" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={`${
                    // eslint-disable-next-line react/destructuring-assignment
                    this.props.location.pathname === '/app/transaksi-donasi' &&
                    'active'
                  }`}
                  onMouseEnter={this.handleTransaksiMouseEnter}
                  onMouseLeave={this.handleTransaksiMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/transaksi-donasi`}
                    // onClick={(e) => this.openSubMenu(e, item)}
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
                            // eslint-disable-next-line react/destructuring-assignment
                            this.props.location.pathname ===
                              '/app/transaksi-donasi' ||
                            // eslint-disable-next-line react/destructuring-assignment
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
                            // eslint-disable-next-line react/destructuring-assignment
                            this.props.location.pathname ===
                              '/app/transaksi-donasi' ||
                            // eslint-disable-next-line react/destructuring-assignment
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
                    <IntlMessages id="transaksi" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={`${
                    // eslint-disable-next-line react/destructuring-assignment
                    this.props.location.pathname === '/app/galang-dana' &&
                    'active'
                  }`}
                  onMouseEnter={this.handleHalamanMouseEnter}
                  onMouseLeave={this.handleHalamanMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/galang-dana`}
                    // onClick={(e) => this.openSubMenu(e, item)}
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
                            // eslint-disable-next-line react/destructuring-assignment
                            this.props.location.pathname ===
                              '/app/galang-dana' ||
                            // eslint-disable-next-line react/destructuring-assignment
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
                            // eslint-disable-next-line react/destructuring-assignment
                            this.props.location.pathname ===
                              '/app/galang-dana' ||
                            // eslint-disable-next-line react/destructuring-assignment
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
                    <IntlMessages id="halaman" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={`${
                    // eslint-disable-next-line react/destructuring-assignment
                    this.props.location.pathname === '/app/pengguna' && 'active'
                  }`}
                  onMouseEnter={this.handlePenggunaMouseEnter}
                  onMouseLeave={this.handlePenggunaMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/pengguna`}
                    // onClick={(e) => this.openSubMenu(e, item)}
                    data-flag="pengguna"
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
                            this.props.location.pathname === '/app/pengguna' ||
                            this.state.isPenggunaHovered
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
                    <IntlMessages id="pengguna" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={`${
                    // eslint-disable-next-line react/destructuring-assignment
                    this.props.location.pathname === '/app/slide' && 'active'
                  }`}
                  onMouseEnter={this.handleSlideMouseEnter}
                  onMouseLeave={this.handleSlideMouseLeave}
                >
                  <NavLink
                    to={`${adminRoot}/slide`}
                    // onClick={(e) => this.openSubMenu(e, item)}
                    data-flag="slide"
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
                            this.props.location.pathname === '/app/slide' ||
                            this.state.isSlideHovered
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
                            this.props.location.pathname === '/app/slide' ||
                            this.state.isSlideHovered
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
                    <IntlMessages id="slide" />
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
