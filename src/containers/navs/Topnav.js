/* eslint-disable no-undef */

/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { getCurrentColor } from 'helpers/Utils'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from 'reactstrap'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

// import IntlMessages from 'helpers/IntlMessages';
import {
  menuHiddenBreakpoint,
  searchPath,
  // localeOptions,
  isDarkSwitchActive,
  adminRoot,
} from 'constants/defaultValues'
import { MobileMenuIcon, MenuIcon } from 'components/svg'
// import { getDirection, setDirection } from 'helpers/Utils';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from 'redux/actions'

import { API_URL } from 'config/api'
import axios from 'axios'
import Cookies from 'js-cookie'

// import TopnavEasyAccess from './Topnav.EasyAccess';
// import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch'

const TopNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  // locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  // eslint-disable-next-line no-unused-vars
  logoutUser
  // logoutUserAction,
  // changeLocaleAction,
}) => {
  // const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('')

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`)
    setSearchKeyword('')
  }

  useEffect(() => {
    getCurrentColor()
  }, [])

  const color = getCurrentColor()

  // const handleChangeLocale = (_locale, direction) => {
  //   changeLocaleAction(_locale);

  //   const currentDirection = getDirection().direction;
  //   if (direction !== currentDirection) {
  //     setDirection(direction);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 500);
  //   }
  // };

  // const isInFullScreenFn = () => {
  //   return (
  //     (document.fullscreenElement && document.fullscreenElement !== null) ||
  //     (document.webkitFullscreenElement &&
  //       document.webkitFullscreenElement !== null) ||
  //     (document.mozFullScreenElement &&
  //       document.mozFullScreenElement !== null) ||
  //     (document.msFullscreenElement && document.msFullscreenElement !== null)
  //   );
  // };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement
        }
      }

      if (elem.classList.contains('mobile-view')) {
        search()
        elem.classList.remove('mobile-view')
        removeEventsSearch()
      } else {
        elem.classList.add('mobile-view')
        addEventsSearch()
      }
    } else {
      search()
    }
    e.stopPropagation()
  }

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search()
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view')
      if (input && input.classList) input.classList.remove('mobile-view')
      removeEventsSearch()
      setSearchKeyword('')
    }
  }

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true)
  }

  const addEventsSearch = () => {
    document.addEventListener('click', handleDocumentClickSearch, true)
  }

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  // const toggleFullScreen = () => {
  //   const isFS = isInFullScreenFn();

  //   const docElm = document.documentElement;
  //   if (!isFS) {
  //     if (docElm.requestFullscreen) {
  //       docElm.requestFullscreen();
  //     } else if (docElm.mozRequestFullScreen) {
  //       docElm.mozRequestFullScreen();
  //     } else if (docElm.webkitRequestFullScreen) {
  //       docElm.webkitRequestFullScreen();
  //     } else if (docElm.msRequestFullscreen) {
  //       docElm.msRequestFullscreen();
  //     }
  //   } else if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen();
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen();
  //   } else if (document.msExitFullscreen) {
  //     document.msExitFullscreen();
  //   }
  //   setIsInFullScreen(!isFS);
  // };

  const handleLogout = () => {
    const inputToken = Cookies.get('token')
    
      try {
        axios
          .post(`${API_URL}/api/auth/logout`, {
            headers: {
              Authorization: `Bearer ${inputToken}`,
            },
          })
          .then((res) => res)
          .catch((err) => err)
      } catch (err) {
        console.log(err)
      }
    Cookies.remove('token')
    Cookies.remove('expireAt')
    Cookies.remove('_id')
    window.localStorage.clear()
    history.push('/')
  }

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault()

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents')
      event.initEvent('resize', false, false)
      window.dispatchEvent(event)
    }, 350)
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    )
  }

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault()
    clickOnMobileMenuAction(_containerClassnames)
  }

  const { messages } = intl
  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        <div className="search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages['menu.search']}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div>

        {/* <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
      </div>
      {/* logo */}
      <NavLink
        className="navbar-logo"
        to={adminRoot}
        style={{ width: '100%', maxWidth: '141px' }}
      >
        <svg
          className="d-block"
          xmlns="http://www.w3.org/2000/svg"
          width="141"
          height="32"
          fill="none"
          viewBox="0 0 141 32"
        >
          <path
            fill="#E6523B"
            d="M15.946.116c8.824.073 15.915 7.232 15.86 16.012-.053 8.687-7.3 15.813-16.01 15.745C7.01 31.805-.09 24.583 0 15.803.09 7.15 7.312.043 15.946.115z"
          />
          <path
            fill={color.indexOf('dark') ? '#212121' : '#fff'}
            d="M140.491 16.928c0 2.254.084 4.511-.023 6.76-.108 2.281-.486 4.513-2.314 6.194-1.22 1.121-2.714 1.556-4.279 1.854-2.819.538-5.517.332-7.947-1.356-.828-.576-1.444-1.328-1.177-2.431.307-1.27 1.388-1.767 2.849-1.326 1.284.388 2.514.958 3.921.82a8.724 8.724 0 002.451-.598 2.327 2.327 0 001.176-1.057c.186-.338.417-.74.205-1.063-.225-.343-.554.061-.831.123-3.466.767-7.162-.438-8.751-3.204-.649-1.13-.943-2.36-.994-3.641-.118-2.98-.279-5.966.094-8.937.172-1.372 1.186-2.12 2.477-2.012 1.302.108 2.068 1.005 2.188 2.387.229 2.636-.003 5.278.146 7.91.133 2.335 2.352 3.515 4.426 2.418 1.079-.57 1.483-1.523 1.492-2.668.019-2.448-.002-4.896.013-7.344.006-.97.322-1.796 1.172-2.38 1.346-.926 3.663-.224 3.698 2.44.032 2.37.007 4.74.008 7.111zM113.403 16.19c.001 2.058-.012 4.116.007 6.174.009 1.042-.306 1.892-1.261 2.41-.958.519-1.896.379-2.68-.304-.365-.317-.594-.18-.896-.055-2.815 1.17-5.522.82-8.013-.798-1.918-1.247-2.711-3.244-2.782-5.454-.09-2.794-.036-5.592-.024-8.389.008-1.64.953-2.82 2.322-2.735 1.623.1 2.26.644 2.527 2.575.121.877.027 1.784.028 2.677.001 1.592-.009 3.184.003 4.777.014 1.839 1.241 3.108 3 3.126 1.61.016 2.886-1.318 2.896-3.06.012-2.33-.019-4.66.013-6.99.015-1.054.245-2.081 1.175-2.743.743-.529 1.612-.577 2.398-.156.879.471 1.287 1.297 1.287 2.304v6.64zM116.687 12.424c.001-3.18-.026-6.362.011-9.542.024-1.983 1.151-3.025 2.864-2.764 1.216.184 1.922 1.111 1.98 2.726.048 1.317.015 2.637.015 3.956 0 4.888-.006 9.775.007 14.663.002.627-.055 1.239-.239 1.832-.306.982-1.136 1.546-2.188 1.563-1.113.017-1.829-.53-2.212-1.532-.209-.544-.248-1.121-.246-1.709.014-3.064.007-6.129.008-9.193z"
          />
          <path
            fill="#FFFDFD"
            d="M9.548 15.894c0-1.048-.008-2.096.004-3.144.007-.6.032-1.268.869-1.226.803.04.809.701.81 1.3.003 1.825-.011 3.65.004 5.475.024 2.958 1.94 4.978 4.69 4.969 2.736-.01 4.673-2.073 4.691-5 .006-.893.006-1.786.002-2.679-.002-.545.238-.94.796-.946.549-.005.847.386.837.92-.029 1.51.147 3.027-.198 4.525-.701 3.04-3.51 5.023-6.795 4.783-2.902-.211-5.387-2.661-5.607-5.604-.083-1.118-.013-2.248-.013-3.373h-.09z"
          />
          <path
            fill="#fff"
            d="M19.465 13.952c0 1.435.012 2.87-.003 4.305-.022 2.115-1.494 3.69-3.49 3.758-1.955.066-3.63-1.496-3.672-3.583-.062-2.985-.018-5.972-.017-8.959 0-.586.12-1.14.84-1.156.764-.017.815.572.816 1.143.002 2.521 0 5.042.001 7.563 0 .272-.004.543.001.815.027 1.619.73 2.536 1.94 2.538 1.206.002 1.933-.939 1.936-2.527.007-2.715.001-5.43.013-8.145.003-.597-.164-1.388.773-1.395.987-.007.856.806.86 1.454.008 1.397.002 2.793.002 4.19z"
          />
          <path
            fill="#FFFDFD"
            d="M15.045 13.08c0-1.59.004-3.182-.002-4.773-.002-.576.03-1.158.778-1.19.84-.036.863.585.862 1.206-.005 3.144-.01 6.288.005 9.432.003.618-.137 1.156-.828 1.149-.687-.007-.829-.552-.821-1.166.019-1.552.006-3.105.006-4.657z"
          />
          <path
            fill={color.indexOf('dark') ? '#212121' : '#fff'}
            d="M53.745 13.338c-1.43-4.825-6.733-7.56-11.615-5.947-.988.326-1.915.986-2.82-.123-.078-.096-.281-.102-.43-.128-1.76-.316-3.015.825-3.027 2.818-.02 3.69-.007 7.381-.007 11.072 0 2.68-.015 5.362.007 8.042.015 1.8.795 2.741 2.225 2.777 1.69.041 2.597-.776 2.64-2.49.044-1.706.01-3.414.01-5.224 3.8 1.06 4.765 1.146 6.66.62 4.963-1.378 7.815-6.5 6.357-11.417zm-8.854 6.89c-1.941.025-4.148-1.55-4.141-4.308.005-2.44 1.887-4.192 4.382-4.167 2.453.025 4.112 1.76 4.091 4.279-.02 2.516-1.77 4.163-4.332 4.196zM94.712 11.836c0-3.145.022-6.291-.009-9.437C94.686.613 93.23-.396 91.55.147c-1.085.35-1.672 1.352-1.696 2.984-.022 1.549-.005 3.098-.005 4.76-.302-.09-.413-.111-.514-.155-3.677-1.614-7.076-.99-9.94 1.66-2.78 2.571-3.588 5.875-2.395 9.51 1.665 5.076 7.525 7.521 12.45 5.285.341-.155.703-.546 1.138-.078.813.877 1.815 1.01 2.842.493 1.055-.531 1.296-1.522 1.29-2.633-.02-3.379-.008-6.758-.008-10.136zm-4.884 4.094c.009 2.523-1.728 4.285-4.224 4.285-2.41 0-4.12-1.798-4.25-4.211-.115-2.146 1.995-4.35 4.284-4.3 2.381.053 4.316 2.01 4.19 4.226z"
          />
          <path
            fill={color.indexOf('dark') ? '#212121' : '#fff'}
            d="M71.708 17.62c1.727-.006 2.919-1.366 2.631-3.036-1.117-6.49-8.03-9.818-13.787-6.258-3.264 2.02-4.6 5.167-4.112 8.926.465 3.583 2.598 6.04 5.964 7.277 3.45 1.268 7.106.334 9.36-2.088.75-.806.913-1.851.357-2.635-.628-.886-1.49-.922-2.475-.612-.706.223-1.321.61-1.994.885-2.384.975-5.066.166-5.947-2.455 3.405 0 6.704.008 10.003-.004zm-5.914-5.822c1.384.136 2.516.732 3.314 2.135h-7.393c1.024-1.547 2.325-2.308 4.08-2.135z"
          />
        </svg>
        {/* <span className="logo-mobile d-block d-xs-none" /> */}
      </NavLink>

      <div className="navbar-right">
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        {/* <div className="header-icons d-inline-block align-middle">
          <TopnavEasyAccess />
          <TopnavNotifications />
          <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button>
        </div> */}
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">Sarah Kortney</span>
              <span>
                <img alt="Profile" src="/assets/img/profiles/l-1.jpg" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Features</DropdownItem>
              <DropdownItem>History</DropdownItem>
              <DropdownItem>Support</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu
  const { locale } = settings
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  }
}
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
)
