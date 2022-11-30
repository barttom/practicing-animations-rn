import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export const DragAndDropReanimated = () => {
  const translate = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translate.value.x},
      {translateY: translate.value.y},
    ],
  }));

  const handleGesture = Gesture.Pan()
    .onUpdate(e => {
      translate.value.x = e.translationX;
      translate.value.y = e.translationY;
      translate.value = {
        x: e.translationX + offset.value.x,
        y: e.translationY + offset.value.y,
      };
    })
    .onEnd(() => {
      offset.value = {
        ...translate.value,
      };
    });

  return (
    <View style={styles.wrapper}>
      <GestureDetector gesture={handleGesture}>
        <Animated.View style={[styles.square, animatedStyles]} />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#b00b00',
  },
});
