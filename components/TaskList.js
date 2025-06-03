import { StyleSheet, View, Text, FlatList } from "react-native"
import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
    </View>
  )

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onToggleComplete={onToggleComplete} onEdit={onEdit} onDelete={onDelete} />
      )}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={renderEmptyList}
    />
  )
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
})

export default TaskList
