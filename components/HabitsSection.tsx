import { useHabitStore } from "@/store/habitStore";
import { ScrollView, StyleSheet, Text } from "react-native";
import HabitCard from "./HabitCard";

function shouldShowHabitToday(habit: any) {

  const today = new Date();
  const startDate = new Date(habit.startDate);

  if (today < startDate) return false;

  if (habit.repeatType === "daily") return true;

  if (habit.repeatType === "once") {
    return today.toDateString() === startDate.toDateString();
  }

  if (habit.repeatType === "weekly") {
    const todayDay = today.getDay();
    return habit.repeatConfig?.includes(todayDay);
  }

  return true;
}

export default function HabitsSection() {

  const habits =
    useHabitStore((state) => state.habits);

  return (

    <ScrollView contentContainerStyle={styles.section}>

      <Text style={styles.sectionTitle}>
        Habits
      </Text>

      {habits
        .filter((habit) => shouldShowHabitToday(habit))
        .map((habit) => (

          <HabitCard
            key={habit.id}
            id={habit.id}
            icon={habit.icon}
            name={habit.name}
            goal={habit.goal}
            progress={habit.progress}
            unit={habit.unit}
            streak={habit.streak}
          />

        ))}

      {habits.length === 0 && (

        <Text style={styles.emptyState}>
          No habits yet. Tap + to add one.
        </Text>

      )}

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

  emptyState: {
    marginTop: 20,
    color: "#888",
    textAlign: "center",
  },

});