import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { habitTemplates } from "../data/habitTemplates";

export default function AddHabitScreen() {

  const router = useRouter();

  const selectHabit = (habitId: string) => {
    router.push(`/habit-config/${habitId}` as any);
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Choose a Habit
      </Text>

      <FlatList
        data={habitTemplates}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() => selectHabit(item.id)}
          >

            <Text style={styles.icon}>
              {item.icon}
            </Text>

            <View style={styles.textContainer}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

            </View>

          </TouchableOpacity>

        )}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 40,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "white",

    padding: 16,
    borderRadius: 16,

    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  icon: {
    fontSize: 28,
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  description: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    lineHeight: 18,
  },

});