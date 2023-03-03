import { Route, Redirect } from 'react-router-dom'
import { isAuthGuardActive } from 'constants/defaultValues'
import Cookies from 'js-cookie'
import { CookieKeys } from 'constants/CookieKeys'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const token = Cookies.get(CookieKeys.authToken)

      if (!token) {
        return (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location },
            }}
          />
        )
      }
    }

    return <Component {...props} />
  }

  return <Route {...rest} render={setComponent} />
}

export { ProtectedRoute }
