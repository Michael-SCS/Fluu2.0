import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HabitCardProps = {
  icon: string;
  name: string;
  progress?: number;
  goal?: number;
  done?: boolean;
  streak?: number;
};

export default function HabitCard({
  icon,
  name,
  progress,
  goal,
  done,
  streak,
}: HabitCardProps) {
  const percent = goal ? progress! / goal : 0;

  return (
    <TouchableOpacity style={styles.card}>
      
      <View style={styles.row}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>

      {goal && (
        <>
          <Text style={styles.progressText}>
            {progress} / {goal}
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${percent * 100}%` }]}
            />
          </View>
        </>
      )}

      {done && <Text style={styles.done}>✓ Completed</Text>}

      {streak && (
        <Text style={styles.streak}>🔥 {streak} day streak</Text>
      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  icon: {
    fontSize: 22,
    marginRight: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  progressText: {
    fontSize: 14,
    color: "#666",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 6,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },

  done: {
    marginTop: 6,
    color: "#4CAF50",
    fontWeight: "600",
  },

  streak: {
    marginTop: 6,
    color: "#FF6B00",
    fontWeight: "600",
  },
});