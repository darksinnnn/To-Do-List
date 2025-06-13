import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={() => onToggleComplete(task.id)}>
        <Icon
          name={task.completed ? 'checkbox' : 'square-outline'}
          size={24}
          color={task.completed ? '#6200ee' : '#757575'}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, task.completed && styles.completedText]}>{task.title}</Text>
        {task.description ? (
          <Text style={[styles.description, task.completed && styles.completedText]}>
            {task.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(task)}>
          <Icon name="pencil" size={20} color="#4a4a4a" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(task.id)}>
          <Icon name="trash-bin" size={20} color="#ff5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  checkbox: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#b0b0b0',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
    marginLeft: 6,
    borderRadius: 8,
  },
});

export default TaskItem;
