// Package Imports
import AsyncStorage from '@react-native-async-storage/async-storage'

// Model Imports
import {Task} from '../screens/models'

const TASKS_STORAGE_KEY = 'tasks'

const database = {
  getAllTasks: (): Promise<Task[]> => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
      try {
        const tasksString = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
        const tasks: Task[] = tasksString ? JSON.parse(tasksString) : []
        resolve(tasks)
      } catch (error) {
        reject(error)
      }
    }, 1000)
    })
  },

  getTaskById: (id: number): Promise<Task> => {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const tasksString = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
          const tasks: Task[] = tasksString ? JSON.parse(tasksString) : []
          const task = tasks.find((task) => task.id === id)
          if (task) {
            resolve(task)
          } else {
            reject('Görev bulunamadı')
          }
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  },

  addTask: (title: string, content: string, date: Date): Promise<Task> => {
    return new Promise(async (resolve, reject) => {
      try {
        const tasksString = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
        const tasks: Task[] = tasksString ? JSON.parse(tasksString) : []
        console.info(tasks)
        const newTask: Task = {
          id: tasks.length + 1,
          title: title,
          content: content,
          completed: false,
          date: date,
        }
        tasks.push(newTask)
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
        resolve(newTask)
      } catch (error) {
        reject(error)
      }
    })
  },

  updateTask: (id: number, updatedTask: Partial<Task>): Promise<Task> => {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const tasksString = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
          let tasks: Task[] = tasksString ? JSON.parse(tasksString) : []
          const index = tasks.findIndex((task) => task.id === id)
          if (index !== -1) {
            tasks[index] = {...tasks[index], ...updatedTask}
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
            resolve(tasks[index])
          } else {
            reject('Görev bulunamadı')
          }
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  },

  deleteTask: async (id: number): Promise<string> => {
    try {
      const tasksString = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
      let tasks: Task[] = tasksString ? JSON.parse(tasksString) : []
      const index = tasks.findIndex((task) => task.id === id)
      if (index !== -1) {
        tasks.splice(index, 1)
        for (let i = index; i < tasks.length; i++) {
          tasks[i].id = i + 1
        }
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
        return Promise.resolve('Görev başarıyla silindi')
      } else {
        return Promise.reject('Görev bulunamadı')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export default database
