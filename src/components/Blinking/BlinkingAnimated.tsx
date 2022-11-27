import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {View, Button, Animated} from 'react-native';

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
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Animated.View
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#bada55',
          marginBottom: 20,
          opacity: opacity,
          borderRadius: 200,
        }}
      />
      <Button
        title={isBlinking ? 'Stop' : 'Start'}
        onPress={() => setIsBlinking(!isBlinking)}
      />
    </View>
  );
};
