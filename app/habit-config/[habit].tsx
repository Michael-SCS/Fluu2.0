import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HabitConfigScreen() {

  const { habit } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configure Habit</Text>

      <Text style={styles.habit}>
        Habit selected: {habit}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  habit: {
    fontSize: 18,
  },

});