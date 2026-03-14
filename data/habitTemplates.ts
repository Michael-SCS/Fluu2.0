export type HabitTemplate = {
  id: string
  name: string
  description: string
  icon: string
  defaultGoal?: number
  unit?: string
  question?: string
  info?: string
}

export const habitTemplates: HabitTemplate[] = [

{
  id: "drink-water",
  name: "Drink Water",
  description: "Stay hydrated throughout the day",
  icon: "🥤",
  defaultGoal: 8,
  unit: "glasses",
  question: "How many glasses of water do you want to drink?",
  info: `The general recommendation is around 8 glasses per day (~2L).

Women: 2 – 2.7L
Men: 2.5 – 3.7L

Exercise or heat may increase this need.`
},

{
  id: "meditate",
  name: "Meditate",
  description: "Calm your mind and focus",
  icon: "🧘",
  defaultGoal: 10,
  unit: "minutes",
  question: "How many minutes will you meditate?"
},

{
  id: "read",
  name: "Read",
  description: "Grow your knowledge",
  icon: "📚",
  defaultGoal: 10,
  unit: "pages",
  question: "How many pages will you read?"
},

{
  id: "exercise",
  name: "Exercise",
  description: "Stay active and healthy",
  icon: "🏋️",
  defaultGoal: 30,
  unit: "minutes",
  question: "How many minutes will you exercise?"
},

{
  id: "save-money",
  name: "Save Money",
  description: "Build financial discipline",
  icon: "💰",
  defaultGoal: 10,
  unit: "USD",
  question: "How much money would you like to save?"
},

{
  id: "listen-podcast",
  name: "Listen Podcast",
  description: "Learn something new",
  icon: "🎧",
  question: "What podcast will you listen to?"
}

]