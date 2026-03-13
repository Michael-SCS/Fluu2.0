import { focusTemplates } from "@/data/focusTemplates";
import { create } from "zustand";

export type FocusActivity = {

  id: string

  title: string

  description?: string

  duration: number

  breakTime?: number

  sessions?: number

  usageCount: number

  custom?: boolean
}

type FocusStore = {

  activities: FocusActivity[]

  addActivity: (activity: FocusActivity) => void

  increaseUsage: (id: string) => void

  updateFocus: (
    id: string,
    data: {
      duration: number
      breakTime: number
      sessions: number
    }
  ) => void
}

export const useFocusStore = create<FocusStore>((set) => ({

  activities: focusTemplates.map((f) => ({
    ...f,
    usageCount: 0,
    custom: false
  })),

  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity]
    })),

  increaseUsage: (id) =>
    set((state) => ({

      activities: state.activities.map((a) => {

        if (a.id !== id) return a

        return {
          ...a,
          usageCount: a.usageCount + 1
        }

      })

    })),

  updateFocus: (id, data) =>
    set((state) => ({

      activities: state.activities.map((a) => {

        if (a.id !== id) return a

        return {
          ...a,
          duration: data.duration,
          breakTime: data.breakTime,
          sessions: data.sessions
        }

      })

    }))

}))