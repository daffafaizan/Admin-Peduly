import { FormattedMessage, injectIntl } from 'react-intl'

const InjectMassage = (props) => {
  return <FormattedMessage {...props} />
}

export default injectIntl(InjectMassage, {
  withRef: false,
})
