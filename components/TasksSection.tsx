import { ScrollView, StyleSheet, Text } from "react-native";
import TaskCard from "./TaskCard";

export default function TasksSection() {

  return (

    <ScrollView contentContainerStyle={styles.section}>

      <Text style={styles.sectionTitle}>
        Tasks
      </Text>

      <TaskCard title="Study React" subtitle="Programming" />

      <TaskCard title="Go to the gym" />

      <TaskCard title="Review code" />

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  section: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
    marginTop: 18,
  },

});