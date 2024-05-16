import LottieView from "lottie-react-native";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import useInternet from "@/utils/hooks/useInternet";

export default function NoConnection() {
  const { refresh } = useInternet();
  const y = useSharedValue(0);
  const yStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });
  const onPull = Gesture.Pan()
    .onStart((i) => {
      if (i.velocityY) {
        y.value = withTiming(150);
      }
    })
    .onFinalize(() => {
      refresh().then(() => {
        y.value = withDelay(1000, withTiming(0));
      });
    })
    .runOnJS(true);
  return (
    <GestureDetector gesture={onPull}>
      <Animated.View
        style={yStyles}
        className="flex-1 justify-center items-center"
      >
        <ActivityIndicator
          size={42}
          color="#1db965"
          style={{
            top: -100,
            position: "absolute",
          }}
        />
        <LottieView
          source={require("../../assets/lottie/no-internet.json")}
          style={{ height: 240, width: 240 }}
          autoPlay
          loop
        />
        <Text className="mt-4 text-xl text-gray-500">
          No Internet Connection
        </Text>
        <Text className="text-md text-gray-400 mt-1">Pull to refresh</Text>
      </Animated.View>
    </GestureDetector>
  );
}
