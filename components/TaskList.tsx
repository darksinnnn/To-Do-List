import React from "react";
import { StyleSheet, View, Text, FlatList, ListRenderItem } from "react-native";
import TaskItem from "./TaskItem";
import { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
    </View>
  );

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TaskItem
      task={item}
      onToggleComplete={onToggleComplete}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={renderEmptyList}
    />
  );
};

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
});

export default TaskList;
