import { useFocusStore } from "@/store/focusStore";
import { ScrollView, StyleSheet, Text } from "react-native";
import FocusCard from "./FocusCard";

export default function FocusSection() {

  const activities =
    useFocusStore((state) => state.activities);

  const ourFavorites =
    activities.filter((a) => !a.custom);

  const yourFavorites =
    [...activities]
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 3)
      .filter((a) => a.usageCount > 0);

  return (

    <ScrollView contentContainerStyle={styles.section}>

      <Text style={styles.sectionTitle}>
        ⭐ Our Favorites
      </Text>

      {ourFavorites.map((focus) => (

        <FocusCard
          key={focus.id}
          id={focus.id}
          title={focus.title}
          duration={focus.duration}
          breakTime={focus.breakTime}
          sessions={focus.sessions}
          description={focus.description}
          usageCount={focus.usageCount}
        />

      ))}


      {yourFavorites.length > 0 && (

        <>
          <Text style={styles.sectionTitle}>
            🔥 Your Favorites
          </Text>

          {yourFavorites.map((focus) => (

            <FocusCard
              key={focus.id}
              id={focus.id}
              title={focus.title}
              duration={focus.duration}
              description={focus.description}
            />

          ))}

        </>

      )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  section: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
    marginTop: 18,
  },

});