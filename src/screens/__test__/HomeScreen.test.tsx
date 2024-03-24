// React Imports
import React from 'react'

// React Native Imports
import {render, fireEvent} from '@testing-library/react-native'

// Component Imports
import {HomeScreen} from '../HomeScreen'

describe('HomeScreen', () => {
  it('renders HomeScreen correctly', () => {
    const renderedHomeScreen = render(<HomeScreen />)

    expect(renderedHomeScreen).toMatchSnapshot()
  })
})
