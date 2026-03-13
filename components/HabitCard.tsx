import { useHabitStore } from "@/store/habitStore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HabitCardProps = {
  id: string
  icon: string
  name: string
  progress?: number
  goal?: number
  unit?: string
  streak?: number
}

export default function HabitCard({
  id,
  icon,
  name,
  progress,
  goal,
  unit,
  streak
}: HabitCardProps) {

  const incrementHabitProgress =
    useHabitStore((state) => state.incrementHabitProgress)

  const percent =
    goal ? (progress ?? 0) / goal : 0

  return (

    <TouchableOpacity
      style={styles.card}
      onPress={() => incrementHabitProgress(id)}
    >

      <View style={styles.row}>

        <Text style={styles.icon}>{icon}</Text>

        <View style={{ flex: 1 }}>

          <Text style={styles.name}>{name}</Text>

          {goal && (

            <Text style={styles.meta}>
              {progress ?? 0} / {goal} {unit}
            </Text>

          )}

        </View>

      </View>


      {goal && (

        <View style={styles.progressBar}>

          <View
            style={[
              styles.progressFill,
              { width: `${percent * 100}%` }
            ]}
          />

        </View>

      )}


      {streak ? (

        <Text style={styles.streak}>
          🔥 {streak} day streak
        </Text>

      ) : null}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    fontSize: 24,
    marginRight: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  meta: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },

  streak: {
    marginTop: 8,
    color: "#FF6B00",
    fontWeight: "600",
  },

});