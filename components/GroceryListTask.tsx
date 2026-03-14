import { useEffect, useState } from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useGroceryStore } from "@/store/groceryStore";
import CreateGroceryModal from "./CreateGroceryModal";

export default function GroceryListTask() {

  const products = useGroceryStore((s) => s.products);
  const toggleProduct = useGroceryStore((s) => s.toggleProduct);

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  if (products.length === 0) return null;


  /*
  Calcula el total de la compra
  */
  const total = products.reduce(
    (sum, p) =>
      sum + Number(p.price || 0) * Number(p.quantity || 1),
    0
  );


  /*
  Detecta si todos los productos están completados
  */
  const allCompleted = products.every((p) => p.completed);


  /*
  Si todos están completados
  el dropdown se cierra automáticamente
  */
  useEffect(() => {

    if (allCompleted) {

      setOpen(false);

    }

  }, [allCompleted]);



  return (

    <View
      style={[
        styles.container,
        allCompleted && styles.completedContainer,
      ]}
    >

      {/* HEADER */}

      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}
      >

        <Text
          style={[
            styles.title,
            allCompleted && styles.doneTitle,
          ]}
        >
          🛒 Grocery List
        </Text>

        <Text style={styles.total}>
          ${total}
        </Text>

      </TouchableOpacity>


      {/* LISTA */}

      {open && (

        <View style={styles.list}>

          {products.map((p) => (

            <View
              key={p.id}
              style={styles.item}
            >

              {/* Checkbox */}

              <TouchableOpacity
                style={[
                  styles.checkbox,
                  p.completed && styles.checked,
                ]}
                onPress={() => toggleProduct(p.id)}
              />


              {/* Nombre */}

              <Text
                style={[
                  styles.name,
                  p.completed && styles.done,
                ]}
              >
                {p.name}
              </Text>


              {/* Cantidad */}

              <Text style={styles.info}>
                x{p.quantity}
              </Text>


              {/* Precio */}

              <Text style={styles.price}>
                ${p.price}
              </Text>

            </View>

          ))}


          {/* BOTÓN ADD (solo si no está completado) */}

          {!allCompleted && (

            <TouchableOpacity
              style={styles.add}
              onPress={() => setModal(true)}
            >

              <Text style={styles.addText}>
                + Add more
              </Text>

            </TouchableOpacity>

          )}

        </View>

      )}

      <CreateGroceryModal
        visible={modal}
        onClose={() => setModal(false)}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
  },

  completedContainer: {
    backgroundColor: "#DCFCE7",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  doneTitle: {
    textDecorationLine: "line-through",
    color: "#666",
  },

  total: {
    fontWeight: "600",
  },

  list: {
    marginTop: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#4F46E5",
    borderRadius: 6,
    marginRight: 8,
  },

  checked: {
    backgroundColor: "#4F46E5",
  },

  name: {
    flex: 1,
  },

  done: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  info: {
    marginRight: 10,
  },

  price: {
    fontWeight: "600",
  },

  add: {
    alignItems: "center",
    marginTop: 10,
  },

  addText: {
    color: "#4F46E5",
    fontWeight: "600",
  },

});