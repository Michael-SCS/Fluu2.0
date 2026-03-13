import { useEffect, useState } from "react";

export default function usePomodoro(initialSeconds: number) {

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {

    if (!isRunning) return;

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);
          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [isRunning]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const reset = () => {

    setIsRunning(false);
    setTimeLeft(initialSeconds);

  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
}