import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

type Focus = {
  id: string
  title: string
  duration: number
  breakTime?: number
  sessions?: number
}

type Props = {
  visible: boolean
  onClose: () => void
  onSave: (data: {
    duration: number
    breakTime: number
    sessions: number
  }) => void
  focus: Focus
}

export default function EditFocusModal({
  visible,
  onClose,
  onSave,
  focus
}: Props) {

  const [study, setStudy] =
    useState(String(focus.duration));

  const [breakTime, setBreak] =
    useState(String(focus.breakTime ?? 5));

  const [sessions, setSessions] =
    useState(String(focus.sessions ?? 1));

  return (

    <Modal visible={visible} animationType="slide">

      <View style={styles.container}>

        <Text style={styles.title}>
          Edit Focus
        </Text>

        <TextInput
          style={styles.input}
          value={study}
          onChangeText={setStudy}
          keyboardType="numeric"
          placeholder="Study Time"
        />

        <TextInput
          style={styles.input}
          value={breakTime}
          onChangeText={setBreak}
          keyboardType="numeric"
          placeholder="Break Time"
        />

        <TextInput
          style={styles.input}
          value={sessions}
          onChangeText={setSessions}
          keyboardType="numeric"
          placeholder="Sessions"
        />

        <TouchableOpacity
          style={styles.save}
          onPress={() =>
            onSave({
              duration: Number(study),
              breakTime: Number(breakTime),
              sessions: Number(sessions)
            })
          }
        >

          <Text style={styles.saveText}>
            Save
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          style={styles.cancel}
        >

          <Text>
            Cancel
          </Text>

        </TouchableOpacity>

      </View>

    </Modal>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    padding:30
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:14,
    marginBottom:10
  },

  save:{
    backgroundColor:"#000",
    padding:16,
    borderRadius:10,
    alignItems:"center"
  },

  saveText:{
    color:"white",
    fontWeight:"600"
  },

  cancel:{
    alignItems:"center",
    marginTop:20
  }

});