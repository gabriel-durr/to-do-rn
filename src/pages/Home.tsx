import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface PropsEditTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isTaskExist = tasks.find((task) => task.title === newTaskTitle);
    if (isTaskExist) {
      Alert.alert(
        `Task já cadastrada`,
        `Você não pode cadastrar uma task com o mesmo nome`
      );
      return;
    }

    //TODO - add new task
    const newDataTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newDataTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      `Remover item`,
      `Tem certeza que você deseja remover esse item?`,
      [
        {
          text: 'Sim',
          onPress: () =>
            setTasks((oldState) => oldState.filter((task) => task.id !== id)),
          style: 'cancel',
        },
        { text: 'Não' },
      ]
    );
    //TODO - remove task from state
  }

  function handleEditTask(data: PropsEditTask) {
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === data.taskId) {
          task.title = data.taskNewTitle;
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
