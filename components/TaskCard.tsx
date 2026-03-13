import { StyleSheet, Text, View } from "react-native";

type TaskCardProps = {
  title: string;
  subtitle?: string;
};

export default function TaskCard({ title, subtitle }: TaskCardProps) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>{title}</Text>

      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}

    </View>
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