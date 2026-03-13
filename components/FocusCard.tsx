import { StyleSheet, Text, TouchableOpacity } from "react-native";

type FocusCardProps = {
  title: string;
  duration: number;
};

export default function FocusCard({ title, duration }: FocusCardProps) {
  return (
    <TouchableOpacity style={styles.card}>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>
        Start focus session • {duration} min
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
  },

});