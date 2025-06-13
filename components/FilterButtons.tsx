import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface FilterButtonsProps {
  filter: 'all' | 'pending' | 'completed';
  setFilter: (filter: 'all' | 'pending' | 'completed') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
        onPress={() => setFilter('all')}
      >
        <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
          All
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
        onPress={() => setFilter('pending')}
      >
        <Text style={[styles.filterText, filter === 'pending' && styles.activeFilterText]}>
          Pending
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
        onPress={() => setFilter('completed')}
      >
        <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: '#6200ee',
  },
  filterText: {
    fontWeight: '500',
    color: '#757575',
  },
  activeFilterText: {
    color: 'white',
  },
});

export default FilterButtons;
