import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFocusStore } from "@/store/focusStore";

import EditFocusModal from "./EditFocusModal";

type Props = {

  id: string

  title: string

  duration: number

  description?: string

  breakTime?: number

  sessions?: number

  usageCount?: number
}

export default function FocusCard({
  id,
  title,
  duration,
  description,
  breakTime = 5,
  sessions = 1,
  usageCount = 0
}: Props) {

  const router = useRouter();

  const increaseUsage =
    useFocusStore((state) => state.increaseUsage);

  const updateFocus =
    useFocusStore((state) => state.updateFocus);

  const [editVisible, setEditVisible] =
    useState(false);


  const startFocus = () => {

    increaseUsage(id);

    router.push({
      pathname: "/focus-timer",
      params: {
        duration: String(duration),
        breakTime: String(breakTime ?? 5),
        sessions: String(sessions ?? 1)
      }
    });

  };


  const saveEdit = (data: any) => {

    updateFocus(id, data);

    setEditVisible(false);

  };


  return (

    <TouchableOpacity
      style={styles.card}
      onPress={startFocus}
      onLongPress={() => setEditVisible(true)}
    >

      <View style={styles.left}>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.time}>
          {duration} min
        </Text>

        {description && (

          <Text style={styles.description}>
            {description}
          </Text>

        )}

      </View>


      <Text style={styles.start}>
        Start
      </Text>


      {usageCount > 0 && (

        <Text style={styles.usage}>
          🔁 {usageCount}
        </Text>

      )}


      <EditFocusModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onSave={saveEdit}
        focus={{
          id,
          title,
          duration,
          breakTime,
          sessions
        }}
      />

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12
  },

  left: {
    flex: 1
  },

  title: {
    fontSize: 16,
    fontWeight: "600"
  },

  time: {
    color: "#777",
    marginTop: 2
  },

  description: {
    marginTop: 6,
    color: "#999",
    fontSize: 12
  },

  start: {
    position: "absolute",
    right: 18,
    top: 18,
    color: "#4CAF50",
    fontWeight: "600"
  },

  usage: {
    position: "absolute",
    right: 18,
    bottom: 14,
    fontSize: 12,
    color: "#888"
  }

});