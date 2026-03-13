import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string
  subtitle?: string
}

export default function TaskCard({ title, subtitle }: Props) {

  return (

    <TouchableOpacity style={styles.card}>

      <View style={styles.checkbox} />

      <View style={{ flex: 1 }}>

        <Text style={styles.title}>{title}</Text>

        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}

      </View>

    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "white",

    padding: 16,
    borderRadius: 14,

    marginBottom: 12,
  },

  checkbox: {
    width: 20,
    height: 20,

    borderRadius: 6,
    borderWidth: 2,

    borderColor: "#ddd",

    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
  },

  subtitle: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },

});