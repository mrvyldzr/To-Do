// React Imports
import React, {createContext, useEffect, useState} from 'react'

// React Native Imports
import {View} from 'react-native'

// Translation Imports
import {I18n} from 'i18n-js'
import translations from '../i18n/translations'
import * as Localization from 'expo-localization'

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true

export const TranslationContext = createContext({
  translate: (key) => key,
})

export const TranslationProvider = ({children}) => {
  const [locale, setLocale] = useState(Localization.locale)

  useEffect(() => {
    i18n.locale = locale
  }, [locale])

  const translate = (key) => i18n.t(key)

  return (
    <TranslationContext.Provider value={{translate}}>
      <View style={{flex: 1}}>{children}</View>
    </TranslationContext.Provider>
  )
}
