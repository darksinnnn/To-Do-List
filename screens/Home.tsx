import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import FilterButtons from "../components/FilterButtons";
import auth from "@react-native-firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, Task as TaskType } from "../components/types";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};


export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error: any) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks", error);
      }
    };

    saveTasks();
  }, [tasks]);

  const addTask = (task: Omit<TaskType, "id" | "completed">) => {
    const newTask: TaskType = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: TaskType) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setModalVisible(true);
  };

  const handleEditTask = (task: TaskType) => {
    setCurrentTask(task);
    setModalVisible(true);
  };

  const handleTaskSubmit = (task: Omit<TaskType, "id" | "completed">) => {
    if (currentTask) {
      updateTask({ ...currentTask, ...task });
    } else {
      addTask(task);
    }
    setModalVisible(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.title}>To-Do List</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
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
  );
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    padding: 6,
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
});
