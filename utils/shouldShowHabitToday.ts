export function shouldShowHabitToday(habit: any) {

  const today = new Date()

  const todayDay = today.getDay()
  const todayDate = today.getDate()
  const todayMonth = today.getMonth()

  const todayString = today.toISOString().split("T")[0]

  const startDate = new Date(habit.startDate)



  // Si el hábito fue eliminado solo hoy
  if (habit.skippedDates?.includes(todayString)) {
    return false
  }



  // Si el hábito empieza en el futuro
  if (today < startDate) {
    return false
  }



  switch (habit.repeat) {

    case "once":
      return today.toDateString() === startDate.toDateString()



    case "daily":
      return true



    case "weekly":

      if (!habit.weekDays) return false

      return habit.weekDays.includes(todayDay)



    case "monthly":

      return todayDate === startDate.getDate()



    case "yearly":

      return (
        todayDate === startDate.getDate() &&
        todayMonth === habit.month
      )



    default:
      return false

  }

}