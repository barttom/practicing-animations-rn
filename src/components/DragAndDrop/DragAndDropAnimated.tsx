import React, {useRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';

export const DragAndDropAnimated = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const offset = useRef({x: 0, y: 0});
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dx: position.x, dy: position.y}],
        {useNativeDriver: true},
      ),
      onPanResponderRelease: (_, gestureState) => {
        offset.current.x = offset.current.x + gestureState.dx;
        offset.current.y = offset.current.y + gestureState.dy;
        position.setOffset({
          x: offset.current.x,
          y: offset.current.y,
        });
        position.setValue({x: 0, y: 0});
      },
    }),
  ).current;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          transform: [{translateX: position.x}, {translateY: position.y}],
        }}
        {...panResponder.panHandlers}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#b00b00',
          }}
        />
      </Animated.View>
    </View>
  );
};
