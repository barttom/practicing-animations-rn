import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const images = [
  'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/7671976/pexels-photo-7671976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

// don't know how to create dynamically animated styles. Can't use hook as a call back obviously
export const SwipeReanimated = () => {
  const scrollX = useSharedValue(0);
  const {width: windowWidth} = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const animatedStyles1 = useAnimatedStyle(() => {
    const imageIndex = 0;
    const size = interpolate(
      scrollX.value,
      [
        windowWidth * (imageIndex - 1),
        windowWidth * imageIndex,
        windowWidth * (imageIndex + 1),
      ],
      [8, 16, 8],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      width: size,
      height: size,
    };
  });

  const animatedStyles2 = useAnimatedStyle(() => {
    const imageIndex = 1;
    const size = interpolate(
      scrollX.value,
      [
        windowWidth * (imageIndex - 1),
        windowWidth * imageIndex,
        windowWidth * (imageIndex + 1),
      ],
      [8, 16, 8],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      width: size,
      height: size,
    };
  });

  const animatedStyles3 = useAnimatedStyle(() => {
    const imageIndex = 2;
    const size = interpolate(
      scrollX.value,
      [
        windowWidth * (imageIndex - 1),
        windowWidth * imageIndex,
        windowWidth * (imageIndex + 1),
      ],
      [8, 16, 8],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      width: size,
      height: size,
    };
  });
  const animatedStyles = [animatedStyles1, animatedStyles2, animatedStyles3];

  return (
    <View style={styles.wrapper}>
      <View style={styles.scrollContainer}>
        <Animated.ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => (
            <View style={{width: windowWidth, height: 280}} key={imageIndex}>
              <ImageBackground source={{uri: image}} style={styles.card} />
            </View>
          ))}
        </Animated.ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((_, imageIndex) => {
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.indicator, animatedStyles[imageIndex]]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
