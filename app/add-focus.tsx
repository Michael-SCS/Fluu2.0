import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { focusTemplates } from "@/data/focusTemplates";
import { useFocusStore } from "@/store/focusStore";

export default function AddFocusScreen() {

  const router = useRouter();

  const addActivity =
    useFocusStore((state) => state.addActivity);

  const selectFocus = (focus: any) => {

    addActivity({
      id: Date.now().toString(),
      title: focus.title,
      duration: focus.duration
    });

    router.back();

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Choose Focus Activity
      </Text>

      <FlatList
        data={focusTemplates}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() => selectFocus(item)}
          >

            <Text style={styles.name}>
              {item.title}
            </Text>

            <Text style={styles.duration}>
              {item.duration} minutes
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#F7F8FA",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  duration: {
    marginTop: 4,
    color: "#777",
  },

});