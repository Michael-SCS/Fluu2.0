export type HabitTemplate = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export const habitTemplates: HabitTemplate[] = [

  {
    id: "drink-water",
    name: "Drink Water",
    icon: "💧",
    description:
      "Staying hydrated improves energy, brain function and overall health.",
  },

  {
    id: "save-money",
    name: "Save Money",
    icon: "💰",
    description:
      "Saving money regularly helps you build financial stability.",
  },

  {
    id: "read-book",
    name: "Read a Book",
    icon: "📚",
    description:
      "Reading daily strengthens your mind and expands knowledge.",
  },

  {
    id: "meditate",
    name: "Meditate",
    icon: "🧘",
    description:
      "Meditation improves focus and reduces stress.",
  },

  {
    id: "listen-podcast",
    name: "Listen to Podcast",
    icon: "🎧",
    description:
      "Podcasts help you learn new ideas while commuting or relaxing.",
  },

  {
    id: "run",
    name: "Run",
    icon: "🏃",
    description:
      "Running improves cardiovascular health and endurance.",
  },

  {
    id: "drink-medicine",
    name: "Take Medication",
    icon: "💊",
    description:
      "Track your daily medication to stay consistent with treatments.",
  },

];