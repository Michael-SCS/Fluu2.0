import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"

type Props = {
visible:boolean
onClose:()=>void
onEdit:()=>void
onDelete:()=>void
habitTitle:string
}

export default function HabitActionModal({
visible,
onClose,
onEdit,
onDelete,
habitTitle
}:Props){

return(

<Modal
visible={visible}
transparent
animationType="fade"
>

<Pressable
style={styles.overlay}
onPress={onClose}
>

<View style={styles.sheet}>

<Text style={styles.title}>
{habitTitle}
</Text>

<TouchableOpacity
style={styles.option}
onPress={onEdit}
>

<Text style={styles.optionText}>
✏️ Edit Habit
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.option}
onPress={onDelete}
>

<Text style={[styles.optionText,{color:"#EF4444"}]}>
🗑 Delete Habit
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.cancel}
onPress={onClose}
>

<Text style={styles.cancelText}>
Cancel
</Text>

</TouchableOpacity>

</View>

</Pressable>

</Modal>

)

}

const styles = StyleSheet.create({

overlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.35)",
justifyContent:"center",
padding:20
},

sheet:{
backgroundColor:"white",
borderRadius:18,
padding:20
},

title:{
fontSize:18,
fontWeight:"700",
marginBottom:14,
textAlign:"center"
},

option:{
paddingVertical:14
},

optionText:{
fontSize:16,
fontWeight:"500",
textAlign:"center"
},

cancel:{
marginTop:12,
paddingVertical:14,
backgroundColor:"#F3F4F6",
borderRadius:12
},

cancelText:{
textAlign:"center",
fontWeight:"600"
}

})