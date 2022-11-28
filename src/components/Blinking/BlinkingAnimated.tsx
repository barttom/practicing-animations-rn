import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {View, Button, Animated, StyleSheet} from 'react-native';

const ANIMATION_TIME = 1000;

export const BlinkingAnimated = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const blinkingAnimation = () =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: ANIMATION_TIME,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_TIME,
          useNativeDriver: true,
        }),
      ]),
    );

  useEffect(() => {
    if (isBlinking) {
      blinkingAnimation().start();
    } else {
      blinkingAnimation().stop();
    }
  }, [isBlinking]);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.circle, {opacity}]} />
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
