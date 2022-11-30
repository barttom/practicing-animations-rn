import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const ANIMATION_TIME = 1000;

export const BlinkingReanimated = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const opacity = useSharedValue(0);

  const blinkingAnimation = () => {
    opacity.value = 0;
    opacity.value = withRepeat(
      withTiming(1, {
        duration: ANIMATION_TIME,
      }),
      -1,
      true,
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (isBlinking) {
      blinkingAnimation();
    } else {
      cancelAnimation(opacity);
    }
  }, [isBlinking]);
  console.warn(animatedStyle);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.circle, animatedStyle]} />
      <Button
        title={isBlinking ? 'Stop' : 'Start'}
        onPress={() => setIsBlinking(!isBlinking)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {alignItems: 'center', justifyContent: 'center', flex: 1},
  circle: {
    width: 200,
    height: 200,
    backgroundColor: '#bada55',
    marginBottom: 20,
    borderRadius: 200,
  },
});
