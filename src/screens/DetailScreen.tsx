// React Imports
import React, {FC, useContext, useEffect, useState} from 'react'

// React Native Imports
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'

// Database Imports
import database from '../database/database'

// Model Imports
import {Task} from './models'

// Package Imports
import {RouteProp, useNavigation} from '@react-navigation/native'

// Translation Imports
import {TranslationContext} from '../translator/providers'
import Images from '../constants/Images'

interface DetailScreenProps {
  navigation?: any
  route: RouteProp<{params: {taskId: number}}>
}

export const DetailScreen: FC<DetailScreenProps> = ({route, navigation}) => {
  const [task, setTask] = useState<Task | null>(null)
  const {translate} = useContext(TranslationContext)
  const {taskId} = route.params

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      database
        .getTaskById(taskId)
        .then((task) => setTask(task))
        .catch((error) => console.error(translate('DATABASE_ERROR_FETCHING_DATA'), error))
    })

    return unsubscribe
  }, [taskId, navigation])

  if (!task) {
    return (
      <View style={styles.loading}>
        <Text>{translate('COMMON_LOADING')}</Text>
      </View>
    )
  }

  const handleDeleteTask = (id: number) => {
    database
      .deleteTask(id)
      .then(() => {
        Alert.alert(translate('COMMON_SUCCESSFUL'), translate('COMMON_TASK_DELETED'), [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ])
      })
      .catch((error: any) => {
        console.error(translate('DATABASE_ERROR_DELETING_TASK'), error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={Images.LEFT_ARROW} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerRightContainer}>
          <Image source={Images.CLOCK} />
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTask', {taskId: taskId})}
            style={styles.touchableOpacity}>
            <Image source={Images.EDIT} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteTask(taskId)}
            style={styles.touchableOpacity}>
            <Image source={Images.TRASH} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.titleText}>{task.title}</Text>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.contentText}>{task.content}</Text>
      </View>

      <View style={[styles.completedTextContainer, {alignItems: 'center'}]}>
        {task.date && (
          <Text>
            {new Date(task.date).getDate()}.{new Date(task.date).getMonth() + 1}.
            {new Date(task.date).getFullYear()} {new Date(task.date).toLocaleTimeString()}
          </Text>
        )}
        <Text>
          {task.completed ? translate('COMMON_COMPLETED') : translate('COMMON_NOT_COMPLETED')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    width: 20,
    height: 20,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  subHeader: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  subContainer: {
    margin: 24,
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 60,
  },
  contentText: {
    fontSize: 20,
  },
  completedTextContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacity: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
})
