import { setCurrentLanguage } from 'helpers/Utils'

import { CHANGE_LOCALE } from '../actions'

export const changeLocale = (locale) => {
  setCurrentLanguage(locale)
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  }
}
