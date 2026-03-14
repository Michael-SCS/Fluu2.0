import { FlatList, View } from "react-native"

import { useHabitStore } from "@/store/habitStore"

import HabitCard from "./HabitCard"

import { shouldShowHabitToday } from "@/utils/shouldShowHabitToday"



export default function HabitsSection() {

  const habits = useHabitStore(state => state.habits)

  // 🔹 Filtrar hábitos que deben aparecer hoy
  const todayHabits = habits.filter(habit =>
    shouldShowHabitToday(habit)
  )



  return (

    <View style={{ flex: 1 }}>

      <FlatList
        data={todayHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard habit={item} />
        )}
      />

    </View>

  )

}