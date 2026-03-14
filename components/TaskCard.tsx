import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Task, useTasksStore } from "@/store/tasksStore";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {

  const toggleTask = useTasksStore((s) => s.toggleTask);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  return (

    <View style={styles.container}>

      {/* Checkbox */}

      <TouchableOpacity
        style={[
          styles.checkbox,
          task.completed && styles.checked
        ]}
        onPress={() => toggleTask(task.id)}
      />


      {/* Task title */}

      <Text
        style={[
          styles.title,
          task.completed && styles.completed
        ]}
      >
        {task.title}
      </Text>


      {/* Delete button */}

      <TouchableOpacity
        onPress={() => deleteTask(task.id)}
      >
        <Text style={styles.delete}>
          ✕
        </Text>
      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#4F46E5",
    marginRight: 12,
  },

  checked: {
    backgroundColor: "#4F46E5",
  },

  title: {
    flex: 1,
    fontSize: 16,
  },

  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  delete: {
    fontSize: 18,
    color: "#999",
  },

});