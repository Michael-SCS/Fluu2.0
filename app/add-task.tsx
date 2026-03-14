import { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { useRouter } from "expo-router";

import { useTasksStore } from "@/store/tasksStore";

import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTask() {

  const [title, setTitle] = useState("");

  const addTask = useTasksStore((state) => state.addTask);

  const router = useRouter();



  const handleCreateTask = () => {

    if (!title.trim()) return;

    addTask(title);

    router.back();

  };



  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        New Task
      </Text>



      <TextInput
        placeholder="Write your task..."
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />



      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateTask}
      >
        <Text style={styles.buttonText}>
          Create Task
        </Text>
      </TouchableOpacity>

    </SafeAreaView>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F7F8FA",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

});