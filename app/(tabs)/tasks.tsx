import { FlatList, StyleSheet } from 'react-native';
import { useGame } from '@/context/GameContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';

export default function TaskScreen() {
  const { tasks } = useGame();

  const renderTaskItem = ({ item }: { item: typeof tasks[0] }) => (
    <ThemedView style={styles.taskItem}>
      <ThemedText style={styles.taskText}>
        {item.description}
      </ThemedText>
      <ThemedView style={styles.taskStatusContainer}>
        {item.progress !== undefined && !item.completed && (
          <ThemedText style={styles.taskProgress}>
            {item.progress}/{item.required}
          </ThemedText>
        )}
        <ThemedText style={[
          styles.taskStatus,
          item.completed ? styles.taskCompleted : styles.taskIncomplete
        ]}>
          {item.completed ? '✓' : '✗'}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="list.bullet"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tasks</ThemedText>
      </ThemedView>

      <ThemedView style={styles.tasksContainer}>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.taskList}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  tasksContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  taskList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4 ,
    paddingLeft: 8,
    paddingRight: 8 
  },
  taskProgress: {
    fontSize: 14,
  },
  taskStatus: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  taskCompleted: {
    color: '#4CAF50',
  },
  taskIncomplete: {
    color: '#F44336',
  },
});