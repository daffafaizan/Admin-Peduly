import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const getUrl = (path, sub) => {
  return path.split(sub)[0] + sub
}

const BreadcrumbContainer = ({ match }) => {
  return <BreadcrumbItems match={match} />
}

const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1)
  let paths = path.split('/')

  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1)
  }

  return (
    <>
      <Breadcrumb className="p-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => (
          <BreadcrumbItem key={index} active={paths.length === index + 1}>
            {paths.length !== index + 1 ? (
              <NavLink to={`/${getUrl(path, sub, index)}`}>{sub}</NavLink>
            ) : (
              sub
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbContainer
