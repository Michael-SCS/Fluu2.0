import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

const today = new Date();

const dateString = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

export default function TodayScreen() {

  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(1);

  const goToPage = (index: number) => {
    pagerRef.current?.setPage(index);
    setPage(index);
  };

  const [habits, setHabits] = useState([
    { name: "Meditate", icon: "🧘", done: false, streak: 4 },
    { name: "Read", icon: "📚", done: false, streak: 7 },
    { name: "Workout", icon: "💪", done: false, streak: 2 },
  ]);

  const toggleHabit = (index: number) => {
    const updated = [...habits];

    updated[index].done = !updated[index].done;

    if (updated[index].done) {
      updated[index].streak += 1;
    }

    setHabits(updated);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Today</Text>
        <Text style={styles.date}>{dateString}</Text>
      </View>

      {/* TABS */}

      <View style={styles.tabs}>

        <TouchableOpacity onPress={() => goToPage(0)}>
          <Text style={[styles.tab, page === 0 && styles.activeTab]}>
            Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToPage(1)}>
          <Text style={[styles.tab, page === 1 && styles.activeTab]}>
            Habits
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToPage(2)}>
          <Text style={[styles.tab, page === 2 && styles.activeTab]}>
            Focus
          </Text>
        </TouchableOpacity>

      </View>

      {/* SLIDE PAGES */}

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={1}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >

        {/* TASKS */}

        <View key="1" style={styles.page}>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tasks</Text>

            <Text style={styles.task}>• Study React</Text>
            <Text style={styles.task}>• Go to the gym</Text>
            <Text style={styles.task}>• Review code</Text>
          </View>

        </View>

        {/* HABITS */}

        <View key="2" style={styles.page}>

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>Habits</Text>

            {habits.map((habit, index) => (
              <TouchableOpacity
                key={index}
                style={styles.habit}
                onPress={() => toggleHabit(index)}
              >

                <Text style={styles.habitText}>
                  {habit.icon} {habit.name}
                </Text>

                <View style={styles.rightSide}>

                  {habit.done && (
                    <Text style={styles.check}>✓</Text>
                  )}

                  <Text style={styles.streak}>
                    🔥 {habit.streak}
                  </Text>

                </View>

              </TouchableOpacity>
            ))}

          </View>

        </View>

        {/* FOCUS */}

        <View key="3" style={styles.page}>

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>Focus</Text>

            <Text style={styles.focusText}>
              Start a focus session
            </Text>

          </View>

        </View>

      </PagerView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#F7F8FA",
  },

  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  header: {
    fontSize: 34,
    fontWeight: "bold",
  },

  date: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  tab: {
    fontSize: 16,
    color: "#888",
  },

  activeTab: {
    color: "#000",
    fontWeight: "bold",
  },

  pager: {
    flex: 1,
  },

  page: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },

  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  task: {
    fontSize: 16,
    marginBottom: 10,
  },

  habit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  habitText: {
    fontSize: 16,
  },

  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  streak: {
    color: "#FF6B00",
    fontWeight: "600",
  },

  check: {
    fontSize: 16,
    color: "#2ecc71",
  },

  focusText: {
    fontSize: 16,
  }

});