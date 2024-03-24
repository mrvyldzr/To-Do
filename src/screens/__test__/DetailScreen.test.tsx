// React Imports
import React from 'react'

// React Native Imports
import {render, fireEvent} from '@testing-library/react-native'

// Component Imports
import { DetailScreen } from '../DetailScreen'

const mockRoute = {
    params: {
      taskId: 1,
    },
  }
  
describe('DetailScreen', () => {
  it('renders DetailScreen correctly', () => {
    const renderedHomeScreen = render(<DetailScreen route={mockRoute.params.taskId} />)

    expect(renderedHomeScreen).toMatchSnapshot()
  })
})
