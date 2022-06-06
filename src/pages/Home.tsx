import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((oldState) => [
      ...oldState, 
      { 
        id: new Date().getTime(), 
        title: newTaskTitle, 
        done: false 
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldState) => {
      const newState = oldState.map((state) => {
        if (state.id === id) {
          return { ...state, done: !state.done };
        }

        return state;
      });

      return newState;
    });
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState) => oldState.filter((state) => state.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})