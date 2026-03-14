import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import DateTimePicker from "@react-native-community/datetimepicker"
import { SafeAreaView } from "react-native-safe-area-context"

import { habitTemplates } from "@/data/habitTemplates"
import { useHabitStore } from "@/store/habitStore"



export default function HabitConfigScreen(){

const router = useRouter()

const params = useLocalSearchParams<{
habit:string
id?:string
}>()

const template = habitTemplates.find(h=>h.id===params.habit)

const habits = useHabitStore(s=>s.habits)
const addHabit = useHabitStore(s=>s.addHabit)
const updateHabit = useHabitStore(s=>s.updateHabit)

const editingHabit = habits.find(h=>h.id===params.id)



const [date,setDate] = useState(
editingHabit ? new Date(editingHabit.startDate) : new Date()
)

const [showCalendar,setShowCalendar] = useState(false)

const [goal,setGoal] = useState(
editingHabit?.goal ?? template?.defaultGoal ?? 1
)

const [repeat,setRepeat] = useState<"once"|"daily"|"weekly"|"monthly"|"yearly">(
editingHabit?.repeat ?? "daily"
)

const [weekDays,setWeekDays] = useState<number[]>(
editingHabit?.weekDays ?? []
)

const [month,setMonth] = useState(
editingHabit?.month ?? new Date().getMonth()
)



function toggleDay(day:number){

if(weekDays.includes(day)){
setWeekDays(weekDays.filter(d=>d!==day))
}else{
setWeekDays([...weekDays,day])
}

}



function saveHabit(){

if(!template) return



if(editingHabit){

updateHabit(editingHabit.id,{

startDate:date.toISOString(),
goal,
repeat,
weekDays,
month

})

}else{

addHabit({

id:Date.now().toString(),

templateId:template.id,

title:template.name,

description:template.description,

icon:template.icon,

startDate:date.toISOString(),

goal,

progress:0,

streak:0,

repeat,

weekDays,

month,

completedDates:[]

})

}



router.replace("/")

}



if(!template){

return(

<View style={styles.container}>
<Text>Habit not found</Text>
</View>

)

}



return(

<SafeAreaView style={styles.safe} edges={["top","bottom"]}>

<ScrollView contentContainerStyle={styles.container}>


<Text style={styles.title}>
{template.icon} {template.name}
</Text>



<Text style={styles.label}>Start Date</Text>

<TouchableOpacity
style={styles.card}
onPress={()=>setShowCalendar(true)}
>

<Text>{date.toDateString()}</Text>

</TouchableOpacity>



{showCalendar &&(

<DateTimePicker
value={date}
mode="date"
display="default"
onChange={(e,selected)=>{

setShowCalendar(false

)

if(selected) setDate(selected)

}}
/>

)}



{template.question &&(

<View style={styles.goalContainer}>

<View style={styles.goalRow}>

<Text style={styles.label}>
{template.question}
</Text>

{template.info &&(

<TouchableOpacity
onPress={()=>Alert.alert(template.name,template.info)}
>

<Text style={styles.info}>!</Text>

</TouchableOpacity>

)}

</View>



<View style={styles.goalSelector}>

<TouchableOpacity
onPress={()=>setGoal(Math.max(0,goal-1))}
>

<Text style={styles.goalButton}>-</Text>

</TouchableOpacity>



<Text style={styles.goalValue}>
{goal}
</Text>



<TouchableOpacity
onPress={()=>setGoal(goal+1)}
>

<Text style={styles.goalButton}>+</Text>

</TouchableOpacity>

</View>



{template.unit &&(

<Text style={styles.unit}>
unit: {template.unit}
</Text>

)}

</View>

)}



<Text style={styles.label}>Repeat</Text>

<View style={styles.repeatRow}>

{["once","daily","weekly","monthly","yearly"].map(r=>(

<TouchableOpacity
key={r}
style={[
styles.repeatButton,
repeat===r && styles.repeatActive
]}
onPress={()=>setRepeat(r as any)}
>

<Text>{r}</Text>

</TouchableOpacity>

))}

</View>



{repeat==="weekly" &&(

<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
contentContainerStyle={styles.weekContainer}
>

{[
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
].map((day,i)=>(

<TouchableOpacity
key={i}
style={[
styles.weekDayCard,
weekDays.includes(i)&&styles.weekDayActive
]}
onPress={()=>toggleDay(i)}
>

<Text
style={[
styles.weekDayText,
weekDays.includes(i)&&styles.weekDayTextActive
]}
>
{day}
</Text>

</TouchableOpacity>

))}

</ScrollView>

)}



{repeat==="monthly" &&(

<View style={styles.monthGrid}>

{Array.from({length:31},(_,i)=>i+1).map(day=>(

<TouchableOpacity
key={day}
style={styles.month}
onPress={()=>setDate(new Date(date.getFullYear(),date.getMonth(),day))}
>

<Text>{day}</Text>

</TouchableOpacity>

))}

</View>

)}



{repeat==="yearly" &&(

<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
contentContainerStyle={styles.monthRow}
>

{[
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
].map((m,i)=>(

<TouchableOpacity
key={i}
style={[
styles.monthCard,
month===i && styles.monthActive
]}
onPress={()=>setMonth(i)}
>

<Text
style={[
styles.monthText,
month===i && styles.monthTextActive
]}
>
{m}
</Text>

</TouchableOpacity>

))}

</ScrollView>

)}



<TouchableOpacity
style={styles.save}
onPress={saveHabit}
>

<Text style={{color:"white"}}>
{editingHabit ? "Update Habit" : "Create Habit"}
</Text>

</TouchableOpacity>


</ScrollView>

</SafeAreaView>

)

}



const styles=StyleSheet.create({

safe:{
flex:1,
backgroundColor:"#F7F8FA"
},

container:{
padding:20,
paddingBottom:60
},

title:{
fontSize:28,
fontWeight:"700",
marginBottom:20
},

label:{
fontSize:14,
color:"#666",
marginBottom:6
},

card:{
backgroundColor:"white",
padding:14,
borderRadius:10,
marginBottom:20
},

goalContainer:{
marginTop:20
},

goalRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

info:{
backgroundColor:"#eee",
padding:6,
borderRadius:20,
width:24,
textAlign:"center"
},

goalSelector:{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginVertical:20
},

goalButton:{
fontSize:24,
padding:10
},

goalValue:{
fontSize:20,
fontWeight:"600"
},

unit:{
marginTop:6,
color:"#666"
},

repeatRow:{
flexDirection:"row",
flexWrap:"wrap",
marginBottom:20
},

repeatButton:{
padding:10,
backgroundColor:"#eee",
borderRadius:8,
marginRight:8,
marginBottom:8
},

repeatActive:{
backgroundColor:"#6366F1"
},

weekContainer:{
flexDirection:"row",
paddingVertical:10
},

weekDayCard:{
backgroundColor:"#eee",
paddingVertical:10,
paddingHorizontal:16,
borderRadius:20,
marginRight:10
},

weekDayActive:{
backgroundColor:"#6366F1"
},

weekDayText:{
fontSize:15
},

weekDayTextActive:{
color:"white",
fontWeight:"600"
},

monthGrid:{
flexDirection:"row",
flexWrap:"wrap"
},

month:{
width:"14%",
padding:12,
alignItems:"center",
borderRadius:8
},

monthRow:{
flexDirection:"row",
gap:12,
paddingVertical:10
},

monthCard:{
backgroundColor:"#eee",
paddingVertical:10,
paddingHorizontal:18,
borderRadius:20
},

monthActive:{
backgroundColor:"#6366F1"
},

monthText:{
fontSize:14
},

monthTextActive:{
color:"white",
fontWeight:"600"
},

save:{
backgroundColor:"#6366F1",
padding:16,
borderRadius:12,
alignItems:"center",
marginTop:30
}

})