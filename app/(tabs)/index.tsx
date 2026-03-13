import FloatingAddButton from "@/components/FloatingAddButton";
import FocusCard from "@/components/FocusCard";
import TaskCard from "@/components/TaskCard";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import HabitCard from "../../components/HabitCard";

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

  const [habits] = useState([
    { name: "Meditate", icon: "🧘", done: false, streak: 4 },
    { name: "Read", icon: "📚", done: false, streak: 7 },
    { name: "Workout", icon: "💪", done: false, streak: 2 },
  ]);

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

        <ScrollView key="1" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tasks</Text>

            <TaskCard
              title="Study React"
              subtitle="Programming"
            />

            <TaskCard
              title="Go to the gym"
            />

            <TaskCard
              title="Review code"
            />
          </View>
        </ScrollView>

        {/* HABITS */}

        <ScrollView key="2" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habits</Text>

            {habits.map((habit, index) => (
              <HabitCard
                key={index}
                icon={habit.icon}
                name={habit.name}
                done={habit.done}
                streak={habit.streak}
              />
            ))}
          </View>
        </ScrollView>

        {/* FOCUS */}

        <ScrollView key="3" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Focus</Text>

            <FocusCard
              title="Read"
              duration={25}
            />

            <FocusCard
              title="Learn Spanish"
              duration={30}
            />
          </View>
        </ScrollView>
      </PagerView>
      <FloatingAddButton />
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
    paddingHorizontal: 24,
    marginBottom: 20,
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
  },

  section: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  taskCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  task: {
    fontSize: 16,
    marginBottom: 10,
  },

  focusCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  focusText: {
    fontSize: 16,
  },
});