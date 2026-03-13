import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  progress: number
}

export default function FocusCircle({ progress }: Props) {

  const radius = 120;

  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - progress * circumference;

  return (

    <View>

      <Svg width={300} height={300}>

        <Circle
          stroke="#eee"
          fill="none"
          cx="150"
          cy="150"
          r={radius}
          strokeWidth="12"
        />

        <Circle
          stroke="#4CAF50"
          fill="none"
          cx="150"
          cy="150"
          r={radius}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />

      </Svg>

    </View>

  )
}