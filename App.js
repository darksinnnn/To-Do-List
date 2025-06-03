"use client"

import { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import TaskList from "./components/TaskList"
import TaskModal from "./components/TaskModal"
import FilterButtons from "./components/FilterButtons"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [filter, setFilter] = useState("all")

  // Load tasks from AsyncStorage on app start
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks))
        }
      } catch (error) {
        console.error("Error loading tasks", error)
      }
    }

    loadTasks()
  }, [])

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
      } catch (error) {
        console.error("Error saving tasks", error)
      }
    }

    saveTasks()
  }, [tasks])

  // Add a new task
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  // Update an existing task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Open modal to add a new task
  const handleAddTask = () => {
    setCurrentTask(null)
    setModalVisible(true)
  }

  // Open modal to edit an existing task
  const handleEditTask = (task) => {
    setCurrentTask(task)
    setModalVisible(true)
  }

  // Handle task submission from modal
  const handleTaskSubmit = (task) => {
    if (currentTask) {
      updateTask({ ...currentTask, ...task })
    } else {
      addTask(task)
    }
    setModalVisible(false)
  }

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true // 'all' filter
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
        <View style={styles.header}>
          <Text style={styles.title}>To-Do List</Text>
        </View>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onEdit={handleEditTask}
          onDelete={deleteTask}
        />

        <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>

        <TaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleTaskSubmit}
          task={currentTask}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#6200ee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200ee",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})
