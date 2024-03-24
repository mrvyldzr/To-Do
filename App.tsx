// React Impors
import * as React from 'react'

// Navigator Imports
import {Navigators} from './src/navigators'
import {TranslationProvider} from './src/translator/providers'

export default function App() {
  return (
      <TranslationProvider>
        <Navigators />
      </TranslationProvider>
  )
}
