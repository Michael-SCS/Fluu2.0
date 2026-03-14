import { FlatList, StyleSheet, View } from "react-native";

import { useGroceryStore } from "@/store/groceryStore";
import { useTasksStore } from "@/store/tasksStore";

import FavoriteTasksDropdown from "./FavoriteTasksDropdown";
import GroceryListTask from "./GroceryListTask";
import TaskCard from "./TaskCard";

export default function TasksSection() {

  const tasks = useTasksStore((state) => state.tasks);

  const groceryProducts = useGroceryStore((state) => state.products);


  const showFavorites =
    tasks.length === 0 && groceryProducts.length === 0;

  const showGrocery =
    groceryProducts.length > 0;


  return (

    <View style={{ flex: 1 }}>

      {/* Grocery List solo si existe */}

      {showGrocery && <GroceryListTask />}


      {/* Favorites solo si no hay nada */}

      {showFavorites && <FavoriteTasksDropdown />}


      {/* Tasks normales */}

      <FlatList
        contentContainerStyle={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} />
        )}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

});