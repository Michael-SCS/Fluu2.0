import { ScrollView, StyleSheet, Text } from "react-native";

import { useFocusStore } from "@/store/focusStore";
import FocusCard from "./FocusCard";

export default function FocusSection() {

  // obtenemos todos los focus del store
  const activities = useFocusStore((state) => state.activities);

  // separarlos
  const defaultFocus = activities.filter((f) => !f.custom);
  const customFocus = activities.filter((f) => f.custom);

  return (

    <ScrollView contentContainerStyle={styles.container}>

      {/* OUR FAVORITES */}

      <Text style={styles.sectionTitle}>
        Our Favorites
      </Text>

      {defaultFocus.map((focus) => (

        <FocusCard
          key={focus.id}
          id={focus.id}
          title={focus.title}
          description={focus.description}
          duration={focus.duration}
          breakTime={focus.breakTime}
          sessions={focus.sessions}
          usageCount={focus.usageCount}
        />

      ))}


      {/* USER CREATIONS */}

      <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
        Your Creations
      </Text>

      {customFocus.length === 0 && (

        <Text style={styles.emptyText}>
          You haven't created any focus yet.
        </Text>

      )}

      {customFocus.map((focus) => (

        <FocusCard
          key={focus.id}
          id={focus.id}
          title={focus.title}
          description={focus.description}
          duration={focus.duration}
          breakTime={focus.breakTime}
          sessions={focus.sessions}
          usageCount={focus.usageCount}
        />

      ))}

    </ScrollView>

  );

}


const styles = StyleSheet.create({

  container:{
    paddingHorizontal:20,
    paddingBottom:60
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:"600",
    marginBottom:12
  },

  emptyText:{
    color:"#777",
    marginBottom:10
  }

});