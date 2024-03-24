// React Imports
import React from 'react'

// React Native Imports
import {render, fireEvent} from '@testing-library/react-native'

// Component Imports
import { AddTaskScreen } from '../AddTaskScreen'


const mockRoute = {
    params: {
      taskId: 1,
    },
  }
  
describe('AddTaskScreen', () => {
  it('renders AddTaskScreen correctly', () => {
    const renderedHomeScreen = render(<AddTaskScreen  route={mockRoute.params.taskId}/>)

    expect(renderedHomeScreen).toMatchSnapshot()
  })
})