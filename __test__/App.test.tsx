// React Imports
import React from 'react'

// React Native Imports
import {render, fireEvent} from '@testing-library/react-native'

// Component Imports
import App from '../App'

describe('App', () => {
  it('renders App correctly', () => {
    const renderedHomeScreen = render(<App />)

    expect(renderedHomeScreen).toMatchSnapshot()
  })
})