import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"



export type Habit = {

  id: string

  templateId: string

  title: string

  description: string

  icon: string

  startDate: string

  goal: number

  progress: number

  streak: number

  repeat: "once" | "daily" | "weekly" | "monthly" | "yearly"

  weekDays?: number[]

  month?: number

  completedDates: string[]

  skippedDates?: string[]

}



type HabitStore = {

  habits: Habit[]

  lastProgressReset: string

  addHabit: (habit: Habit) => void

  updateHabit: (habitId: string, data: Partial<Habit>) => void

  deleteHabit: (habitId: string) => void

  deleteHabitForToday: (habitId: string) => void

  incrementHabitProgress: (habitId: string) => void

  resetDailyProgress: () => void

}



const getToday = () => {

  return new Date().toISOString().split("T")[0]

}



export const useHabitStore = create<HabitStore>()(

  persist(

    (set, get) => ({

      habits: [],

      lastProgressReset: getToday(),



      addHabit: (habit) =>
        set((state) => ({
          habits: [...state.habits, habit]
        })),



      updateHabit: (habitId, data) =>
        set((state) => ({
          habits: state.habits.map(h =>
            h.id === habitId ? { ...h, ...data } : h
          )
        })),



      deleteHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.filter(h => h.id !== habitId)
        })),



      deleteHabitForToday: (habitId) =>
        set((state) => {

          const today = getToday()

          return {

            habits: state.habits.map(h => {

              if (h.id !== habitId) return h

              return {

                ...h,

                skippedDates: [...(h.skippedDates ?? []), today]

              }

            })

          }

        }),



      incrementHabitProgress: (habitId) =>
        set((state) => ({

          habits: state.habits.map(h => {

            if (h.id !== habitId) return h

            const progress = Math.min(h.goal, h.progress + 1)

            return {

              ...h,

              progress

            }

          })

        })),



      resetDailyProgress: () => {

        const today = getToday()

        const lastReset = get().lastProgressReset

        if (today === lastReset) return



        const habits = get().habits.map(h => ({

          ...h,

          progress: 0

        }))



        set({

          habits,

          lastProgressReset: today

        })

      }

    }),

    {

      name: "fluu-habits-storage",

      storage: createJSONStorage(() => AsyncStorage)

    }

  )

)