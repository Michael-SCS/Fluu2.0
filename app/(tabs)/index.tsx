import FloatingAddButton from "@/components/FloatingAddButton";

import FocusSection from "@/components/FocusSection";
import HabitsSection from "@/components/HabitsSection";
import TasksSection from "@/components/TasksSection";

import { useHabitStore } from "@/store/habitStore";

import { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import PagerView from "react-native-pager-view";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const today = new Date();

const dateString = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

export default function TodayScreen() {

  const pagerRef = useRef<PagerView>(null);

  const [page, setPage] = useState(1);

  const resetDailyProgress =
    useHabitStore((state) => state.resetDailyProgress);

  useEffect(() => {
    resetDailyProgress();
  }, []);

  const goToPage = (index: number) => {

    pagerRef.current?.setPage(index);

    setPage(index);

  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar style="dark" />

      <View style={styles.headerContainer}>

        <Text style={styles.header}>
          Today
        </Text>

        <Text style={styles.date}>
          {dateString}
        </Text>

      </View>


      {/* TABS */}

      <View style={styles.tabs}>

        <TouchableOpacity
          style={[styles.tabButton, page === 0 && styles.activeTab]}
          onPress={() => goToPage(0)}
        >
          <Text style={styles.tabText}>
            Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, page === 1 && styles.activeTab]}
          onPress={() => goToPage(1)}
        >
          <Text style={styles.tabText}>
            Habits
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, page === 2 && styles.activeTab]}
          onPress={() => goToPage(2)}
        >
          <Text style={styles.tabText}>
            Focus
          </Text>
        </TouchableOpacity>

      </View>


      {/* PAGER */}

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={1}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >

        <TasksSection key="1" />

        <HabitsSection key="2" />

        <FocusSection key="3" />

      </PagerView>


      <FloatingAddButton />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  headerContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 20,
  },

  header: {
    fontSize: 36,
    fontWeight: "bold",
  },

  date: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
  },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "white",
  },

  tabText: {
    color: "#000",
    fontWeight: "600",
  },

  pager: {
    flex: 1,
  },

});