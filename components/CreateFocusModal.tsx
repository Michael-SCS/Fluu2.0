import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusStore } from "@/store/focusStore";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateFocusModal({ visible, onClose }: Props) {

  const addActivity = useFocusStore((state) => state.addActivity);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [sessions, setSessions] = useState("");

  const createFocus = () => {

  addActivity({

    id: Date.now().toString(),

    title: title,

    description: description,

    duration: Number(studyTime),

    breakTime: Number(breakTime || 5),

    sessions: Number(sessions || 1),

    usageCount: 0,

    custom: true

  });

  onClose();

};

  return (

    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >

      <View style={styles.overlay}>

        <View style={styles.container}>

          <Text style={styles.title}>
            New Focus
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Focus name"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Focus Time (minutes)"
            keyboardType="numeric"
            value={studyTime}
            onChangeText={setStudyTime}
          />

          <TextInput
            style={styles.input}
            placeholder="Break Time (minutes)"
            keyboardType="numeric"
            value={breakTime}
            onChangeText={setBreakTime}
          />

          <TextInput
            style={styles.input}
            placeholder="Sessions"
            keyboardType="numeric"
            value={sessions}
            onChangeText={setSessions}
          />

          <View style={styles.buttons}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.create}
              onPress={createFocus}
            >
              <Text style={{color:"#fff"}}>
                Create
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>

  );

}


const styles = StyleSheet.create({

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.4)",
    justifyContent:"center",
    padding:20
  },

  container:{
    backgroundColor:"#fff",
    borderRadius:16,
    padding:20
  },

  title:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:15
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:12,
    marginBottom:12
  },

  buttons:{
    flexDirection:"row",
    justifyContent:"flex-end",
    marginTop:10
  },

  cancel:{
    marginRight:10,
    padding:10
  },

  create:{
    backgroundColor:"#000",
    padding:12,
    borderRadius:10
  }

});