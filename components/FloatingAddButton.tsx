import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CreateFocusModal from "@/components/CreateFocusModal";

export default function FloatingAddButton() {

  const [open, setOpen] = useState(false);

  const [focusModal, setFocusModal] = useState(false);

  const goTo = (route: any) => {

    setOpen(false);

    router.push(route);

  };

  return (

    <View style={styles.container}>

      <CreateFocusModal
        visible={focusModal}
        onClose={() => setFocusModal(false)}
      />

      {open && (

        <View style={styles.menu}>

          <TouchableOpacity
            style={styles.option}
            onPress={() => goTo("/add-habit")}
          >
            <Text style={styles.optionText}>
              Habit
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.option}
            onPress={() => goTo("/add-task")}
          >
            <Text style={styles.optionText}>
              Task
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.option}
            onPress={() => {

              setOpen(false)

              setFocusModal(true)

            }}
          >
            <Text style={styles.optionText}>
              New Focus
            </Text>
          </TouchableOpacity>

        </View>

      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(!open)}
      >

        <Text style={styles.plus}>
          {open ? "×" : "+"}
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    bottom: 90,
    right: 24,
    alignItems: "flex-end",
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8
  },

  plus: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },

  menu: {
    marginBottom: 10,
  },

  option: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },

});