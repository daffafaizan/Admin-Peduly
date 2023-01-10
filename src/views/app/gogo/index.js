import React from 'react'
import { Row } from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'

const Gogo = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="Dashboard" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p>
          <IntlMessages id="Dashboard" />
        </p>
      </Colxx>
    </Row>
  </>
)
export default Gogo
