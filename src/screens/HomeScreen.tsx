// React Imports
import React, {FC, useContext, useEffect, useState} from 'react'

// React Native Imports
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

// Constant Imports
import {COLOURS} from '../constants'
import Images from '../constants/Images'

// Component Imports
import {List} from '../components'

// Database Imports
import database from '../database/database'

// Model Imports
import {Task} from './models'

// Translation Imports
import {TranslationContext} from '../translator/providers'

interface HomeScreenProps {
  navigation?: any
}

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const {translate} = useContext(TranslationContext)

  useEffect(() => {
    loadTasks()
  }, [tasks])

  const loadTasks = () => {
    database
      .getAllTasks()
      .then((data: Task[]) => setTasks(data))
      .catch((error: any) => console.error(translate('DATABASE_ERROR_FETCHING_DATA'), error))
  }

  const handleItemPress = (id: number) => {
    navigation.navigate('Detail', {taskId: id})
  }

  const handleToggleComplete = (id: number, completed: boolean) => {
    database
      .updateTask(id, {completed})
      .then(() => {
        loadTasks()
      })
      .catch((error) => {
        console.error('DATABASE_ERROR_UPDATING_TASK', error)
      })
  }

  const renderItem = ({item}: {item: Task}) => (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: item.completed ? COLOURS.RED_LIGHT : COLOURS.ORANGE_LIGHT,
          },
        ]}>
        <View style={styles.titleItem}>
          <Text style={styles.titleText} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => handleToggleComplete(item.id, !item.completed)}>
            <Image
              source={item.completed ? Images.CHECKED : Images.UNCHECKED}
              style={styles.checkIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.contentText} numberOfLines={2}>
          {item.content}
        </Text>

        <View style={{paddingTop: 4}}>
          <Text style={styles.contentText}>
            {item.date && (
              <Text>
                {new Date(item.date).getDate()}.{new Date(item.date).getMonth() + 1}.
                {new Date(item.date).getFullYear()} {new Date(item.date).toLocaleTimeString()}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Images.TO_DO_TITLE_IMAGE} />
        <Image source={Images.SETTINGS} />
      </View>

      <View style={styles.subHeader}>
        <View style={styles.subHeaderItem}>
          <Image source={Images.UNION} />
          <Image source={Images.TO_DO_LIST_IMAGE} />
        </View>
        <Image source={Images.FILTER} />
      </View>

      <View style={styles.flatListContainer}>
        <List
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item: Task) => item.id.toString()}
        />
      </View>

      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => navigation.navigate('AddTask', {taskId: null})}>
          <Image source={Images.PLUS_CIRCLE} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeader: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderItem: {
    flexDirection: 'row',
    gap: 16,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  itemContainer: {
    width: 340,
    height: 130,
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOURS.WHITE,
  },
  contentText: {
    fontSize: 14,
    marginTop: 8,
    color: COLOURS.WHITE,
  },
  addButton: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 80,
    marginRight: 20,
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
})
