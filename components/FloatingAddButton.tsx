import { useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";


export default function FloatingAddButton() {

  // Controla si el menú está abierto
  const [open, setOpen] = useState(false);

  // Router de Expo para navegar entre pantallas
  const router = useRouter();

  return (

    <View style={styles.container}>

      {/* BOTONES DEL MENÚ */}

      {open && (

        <View style={styles.menu}>


          {/* TASK */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => {

              setOpen(false);

              router.push("/add-task");

            }}
          >
            <Text style={styles.optionText}>
              Crerate Task
            </Text>
          </TouchableOpacity>



          {/* HABIT */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => {

              setOpen(false);

              router.push("/add-habit");

            }}
          >
            <Text style={styles.optionText}>
              Create Habit
            </Text>
          </TouchableOpacity>



          {/* FOCUS */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => {

              setOpen(false);

              router.push("/add-focus");

            }}
          >
            <Text style={styles.optionText}>
              Create Focus
            </Text>
          </TouchableOpacity>


        </View>

      )}



      {/* BOTÓN + */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(!open)}
      >
        <Ionicons
          name="add"
          size={28}
          color="white"
        />
      </TouchableOpacity>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {
    position: "absolute",
    right: 24,
    bottom: 40,
    alignItems: "flex-end",
  },

  menu: {
    marginBottom: 10,
    gap: 10,
  },

  option: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
  },

  optionText: {
    fontWeight: "600",
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

});