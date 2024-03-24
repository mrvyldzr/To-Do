// React Imports
import React, {FC, useContext, useState, useEffect} from 'react'

// React Native Imports
import {View, StyleSheet, Image, TextInput, Alert} from 'react-native'

// Component Imports
import {Button} from '../components'

// Constant Imports
import {COLOURS} from '../constants'
import Images from '../constants/Images'

// Database Imports
import database from '../database/database'

// Package Imports
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {RouteProp, useNavigation} from '@react-navigation/native'

// Translation Imports
import {TranslationContext} from '../translator'

interface AddTaskScreenProps {
  route: RouteProp<{params: {taskId: number}}>
}

export const AddTaskScreen: FC<AddTaskScreenProps> = ({route}) => {
  const [titleContent, setTitleContent] = useState<string>('')
  const [taskContent, setTaskContent] = useState<string>('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const {translate} = useContext(TranslationContext)
  const navigation = useNavigation()
  const {taskId} = route.params

  useEffect(() => {
    if (taskId !== null) {
      database
        .getTaskById(taskId)
        .then((task) => {
          setTitleContent(task.title)
          setTaskContent(task.content)
        })
        .catch((error) => console.error('Error fetching task:', error))
    }
  }, [taskId])

  const handleAddOrUpdateTask = () => {
    if (taskContent.trim() === '') {
      Alert.alert(
        translate('COMMON_ALERT'),
        translate('DATABASE_ERROR_TASK_CONTENT_CANNOT_BE_EMPTY')
      )
      return
    }

    if (taskId === null) {
      database
        .addTask(titleContent, taskContent, selectedDate)
        .then((newTask) => {
          Alert.alert(translate('COMMON_SUCCESSFUL'), translate('COMMON_NEW_TASK_ADDED'), [
            {
              text: translate('COMMON_OK'),
              onPress: () => navigation.goBack(),
            },
          ])

          setTaskContent('')
        })
        .catch((error) => {
          Alert.alert(translate('Error'), translate('DATABASE_ERROR_ADDING_TASK:'), error)
          console.error(translate('DATABASE_ERROR_ADDING_TASK:'), error)
        })
    } else {
      database
        .updateTask(taskId, {content: taskContent, date: selectedDate})
        .then((updatedTask) => {
          Alert.alert(translate('COMMON_SUCCESSFUL'), translate('COMMON_TASK_UPDATED'), [
            {
              text: translate('COMMON_OK'),
              onPress: () => navigation.goBack,
            },
          ])
          setTaskContent('')
        })
        .catch((error) => {
          Alert.alert(translate('Error'), translate('DATABASE_ERROR_UPDATING_TASK:'), error)
          console.error(translate('DATABASE_ERROR_UPDATING_TASK:'), error)
        })
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date)
    hideDatePicker()
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerItem}>
        <Image source={Images.LINE} />
      </View>

      <View style={styles.titleItem}>
        <TextInput
          placeholder={translate('COMMON_TITLE')}
          value={titleContent}
          onChangeText={(text) => setTitleContent(text)}
          placeholderTextColor={COLOURS.WHITE}
          cursorColor={COLOURS.WHITE}
        />
      </View>

      <View style={styles.contentItem}>
        <TextInput
          placeholder={translate('COMMON_CONTENT')}
          value={taskContent}
          onChangeText={(text) => setTaskContent(text)}
          placeholderTextColor={COLOURS.WHITE}
          cursorColor={COLOURS.WHITE}
          multiline={true}
          numberOfLines={4}
          style={{height: '100%'}}
        />
      </View>

      <View style={styles.buttonItem}>
        <Button
          onPress={showDatePicker}
          label={translate('COMMON_SELECT_DATE')}
          image={Images.CALENDAR}
          borderColor={COLOURS.WHITE}
        />
        <Button
          onPress={handleAddOrUpdateTask}
          label={taskId === null ? translate('COMMON_ADD_TASK') : translate('COMMON_UPDATE_TASK')}
          backgroundColor={COLOURS.WHITE}
          labelColor={COLOURS.ORANGE_LIGHT}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.ORANGE_LIGHT,
    marginTop: 150,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  headerItem: {
    paddingTop: 30,
    alignItems: 'center',
  },
  titleItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginTop: 50,
    marginBottom: 10,
    width: 327,
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLOURS.WHITE,
  },
  contentItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    width: 327,
    height: 250,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLOURS.WHITE,
  },
  buttonItem: {
    marginTop: 30,
  },
})
