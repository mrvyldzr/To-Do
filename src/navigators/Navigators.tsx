// Package Imports
import {createStackNavigator} from '@react-navigation/stack'

// Navigation Imports
import {AddTaskScreen, HomeScreen, DetailScreen} from '../screens'
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native'


export const Stack = createStackNavigator()
export const navigationRef = createNavigationContainerRef()

export const Navigators = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name='Detail' component={DetailScreen} options={{headerShown: false}} />
        <Stack.Screen
          name='AddTask'
          component={AddTaskScreen}
          options={{headerShown: false, presentation: 'transparentModal', animationEnabled: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
