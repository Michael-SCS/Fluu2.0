import { useRouter } from "expo-router";
import { useState } from "react";

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { useFocusStore } from "@/store/focusStore";

export default function CreateFocus() {

  const router = useRouter();

  const addActivity =
    useFocusStore((state) => state.addActivity);

  const [title, setTitle] = useState("");

  const [duration, setDuration] = useState("25");


  const createFocus = () => {

    addActivity({

      id: Date.now().toString(),

      title,

      duration: Number(duration)

    });

    router.back();
  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Create Focus
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Activity name"
        value={title}
        onChangeText={setTitle}
      />


      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />


      <TouchableOpacity
        style={styles.button}
        onPress={createFocus}
      >

        <Text style={styles.buttonText}>
          Create
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },

});