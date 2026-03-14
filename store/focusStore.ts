import { create } from "zustand";

export type FocusActivity = {
  id: string;
  title: string;
  description?: string;
  duration: number;
  breakTime: number;
  sessions: number;
  usageCount: number;
  custom: boolean;
};

type FocusStore = {
  activities: FocusActivity[];
  addActivity: (activity: FocusActivity) => void;
  increaseUsage: (id: string) => void;
};

export const useFocusStore = create<FocusStore>((set) => ({

  activities: [

    {
      id: "deep-work",
      title: "Deep Work",
      description: "High concentration work",
      duration: 50,
      breakTime: 10,
      sessions: 2,
      usageCount: 0,
      custom: false
    },

    {
      id: "quick-focus",
      title: "Quick Focus",
      description: "Short productive sprint",
      duration: 25,
      breakTime: 5,
      sessions: 2,
      usageCount: 0,
      custom: false
    }

  ],

  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity],
    })),

  increaseUsage: (id) =>
    set((state) => ({

      activities: state.activities.map((focus) => {

        if (focus.id !== id) return focus;

        return {
          ...focus,
          usageCount: focus.usageCount + 1
        };

      })

    })),

}));