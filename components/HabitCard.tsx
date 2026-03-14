import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { useHabitStore } from "@/store/habitStore"

import DeleteHabitModal from "./DeleteHabitModal"
import HabitActionModal from "./HabitActionModal"



export default function HabitCard({ habit }: any) {

  const router = useRouter()

  const increment = useHabitStore(s => s.incrementHabitProgress)
  const deleteHabit = useHabitStore(s => s.deleteHabit)
  const deleteHabitForToday = useHabitStore(s => s.deleteHabitForToday)

  const [menuVisible,setMenuVisible] = useState(false)
  const [deleteVisible,setDeleteVisible] = useState(false)



  return (

    <>

    <TouchableOpacity

      style={[
        styles.card,
        habit.progress >= habit.goal && styles.completed
      ]}

      onPress={() => increment(habit.id)}

      onLongPress={() => setMenuVisible(true)}

    >

      <Text style={styles.icon}>
        {habit.icon}
      </Text>

      <View style={{ flex: 1 }}>

        <Text style={styles.title}>
          {habit.title}
        </Text>

        <Text style={styles.description}>
          {habit.description}
        </Text>

        <Text style={styles.progress}>
          {habit.progress} / {habit.goal}
        </Text>

      </View>

    </TouchableOpacity>



    {/* MENU MODAL */}

    <HabitActionModal

      visible={menuVisible}

      habitTitle={habit.title}

      onClose={() => setMenuVisible(false)}

      onEdit={() => {

        setMenuVisible(false)

        router.push(`/habit-config/${habit.templateId}?id=${habit.id}`)

      }}

      onDelete={() => {

        setMenuVisible(false)

        setDeleteVisible(true)

      }}

    />



    {/* DELETE MODAL */}

    <DeleteHabitModal

      visible={deleteVisible}

      onClose={() => setDeleteVisible(false)}

      onDeleteToday={() => {

        deleteHabitForToday(habit.id)

        setDeleteVisible(false)

      }}

      onDeleteAll={() => {

        deleteHabit(habit.id)

        setDeleteVisible(false)

      }}

    />

    </>

  )

}



const styles = StyleSheet.create({

  card:{
    backgroundColor:"white",
    padding:16,
    borderRadius:14,
    marginHorizontal:20,
    marginBottom:12,
    flexDirection:"row",
    alignItems:"center"
  },

  completed:{
    backgroundColor:"#D1FAE5"
  },

  icon:{
    fontSize:26,
    marginRight:12
  },

  title:{
    fontSize:16,
    fontWeight:"600"
  },

  description:{
    color:"#666",
    marginTop:2
  },

  progress:{
    marginTop:6,
    fontWeight:"500"
  }

})