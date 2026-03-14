import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from "react-native";

import ConfettiCannon from "react-native-confetti-cannon";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function FocusTimer() {

  const { duration, breakTime, sessions, title } = useLocalSearchParams();

  const focusDuration = Number(duration ?? 25) * 60;
  const breakDuration = Number(breakTime ?? 5) * 60;
  const totalSessions = Number(sessions ?? 1);

  const [phase, setPhase] = useState<"focus" | "break">("focus");
  const [session, setSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const [countdown, setCountdown] = useState<number | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<any>(null);

  const radius = 110;
  const circumference = 2 * Math.PI * radius;

  const currentDuration =
    phase === "focus" ? focusDuration : breakDuration;

  const elapsed = currentDuration - timeLeft;
  const progress = elapsed / currentDuration;

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  });

  useEffect(() => {

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false
    }).start();

  }, [progress]);


  useEffect(() => {

    if (!running) return;

    intervalRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          Vibration.vibrate(400);

          if (phase === "focus") {

            setPhase("break");
            return breakDuration;

          }

          if (session < totalSessions) {

            setSession((s) => s + 1);
            setPhase("focus");

            return focusDuration;

          }

          setRunning(false);
          setFinished(true);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(intervalRef.current);

  }, [running, phase, session]);


  const startTimer = () => {

  if (session === 1 && phase === "focus") {

    setCountdown(3);

    const countdownInterval = setInterval(() => {

      setCountdown((prev) => {

        if (prev === 1) {

          clearInterval(countdownInterval);

          setCountdown(null);

          // vibración larga al iniciar focus
          Vibration.vibrate(400);

          setRunning(true);

          return null;

        }

        // vibración corta en cada número
        Vibration.vibrate(120);

        return (prev ?? 0) - 1;

      });

    }, 1000);

    return;

  }

  setRunning(true);

};


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;


  const nextLabel = () => {

    if (phase === "focus")
      return `Next: Break (${breakDuration / 60} min)`;

    if (session < totalSessions)
      return `Next: Focus (${focusDuration / 60} min)`;

    return "Final Session";

  };


  return (

    <>

      <Stack.Screen
        options={{
          title: String(title ?? "Focus"),
          headerTitleAlign: "center"
        }}
      />

      <View style={styles.container}>

        {finished && (
          <ConfettiCannon
            count={120}
            origin={{ x: 200, y: 0 }}
            fadeOut
          />
        )}

        <Text style={styles.mode}>
          {phase === "focus" ? "Focus Time" : "Break Time"}
        </Text>

        <Text style={styles.session}>
          Session {session} / {totalSessions}
        </Text>

        <Text style={styles.next}>
          {nextLabel()}
        </Text>


        <View style={styles.circleContainer}>

          <Svg width="260" height="260">

            <Circle
              stroke="#eee"
              fill="none"
              cx="130"
              cy="130"
              r={radius}
              strokeWidth="12"
            />

            <AnimatedCircle
              stroke={phase === "focus" ? "#4CAF50" : "#FF3B30"}
              fill="none"
              cx="130"
              cy="130"
              r={radius}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="130,130"
            />

          </Svg>

          <View style={styles.timerCenter}>

            {countdown !== null ? (

              <Text style={styles.countdown}>
                {countdown}
              </Text>

            ) : (

              <Text style={styles.time}>
                {formattedTime}
              </Text>

            )}

          </View>

        </View>


        <View style={styles.controls}>

          {!running && (

            <TouchableOpacity
              style={styles.start}
              onPress={startTimer}
            >

              <Text style={styles.buttonText}>
                Start
              </Text>

            </TouchableOpacity>

          )}

          {running && (

            <TouchableOpacity
              style={styles.pause}
              onPress={() => setRunning(false)}
            >

              <Text style={styles.buttonText}>
                Pause
              </Text>

            </TouchableOpacity>

          )}

        </View>

      </View>

    </>

  );

}


const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },

  mode:{
    fontSize:26,
    fontWeight:"700"
  },

  session:{
    color:"#777",
    marginBottom:6
  },

  next:{
    color:"#aaa",
    marginBottom:30
  },

  circleContainer:{
    justifyContent:"center",
    alignItems:"center"
  },

  timerCenter:{
    position:"absolute"
  },

  time:{
    fontSize:44,
    fontWeight:"bold"
  },

  countdown:{
    fontSize:72,
    fontWeight:"bold"
  },

  controls:{
    flexDirection:"row",
    marginTop:40
  },

  start:{
    backgroundColor:"#4CAF50",
    padding:16,
    borderRadius:10,
    marginHorizontal:10
  },

  pause:{
    backgroundColor:"#FF9800",
    padding:16,
    borderRadius:10,
    marginHorizontal:10
  },

  buttonText:{
    color:"white",
    fontWeight:"600"
  }

});