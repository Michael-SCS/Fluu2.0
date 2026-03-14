import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { taskTemplates } from "@/data/taskTemplates";
import { useTasksStore } from "@/store/tasksStore";

import CreateGroceryModal from "./CreateGroceryModal";

export default function FavoriteTasksDropdown() {

  const addTaskFromTemplate = useTasksStore(
    (state) => state.addTaskFromTemplate
  );

  const [groceryModal, setGroceryModal] = useState(false);

  const handlePress = (title: string) => {

    if (title === "Grocery List") {

      setGroceryModal(true);

      return;
    }

    addTaskFromTemplate(title);
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Our Favorites
      </Text>

      {taskTemplates.map((task) => (

        <TouchableOpacity
          key={task.id}
          style={styles.item}
          onPress={() => handlePress(task.title)}
        >

          <Text style={styles.itemText}>
            {task.title}
          </Text>

        </TouchableOpacity>

      ))}

      <CreateGroceryModal
        visible={groceryModal}
        onClose={() => setGroceryModal(false)}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  item: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  itemText: {
    fontSize: 15,
  },

});