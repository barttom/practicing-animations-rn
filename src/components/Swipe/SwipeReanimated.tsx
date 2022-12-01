import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
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

export const SwipeReanimated = () => {
  const scrollX = useSharedValue(0);
  const {width: windowWidth} = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

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
              <Pointer
                key={imageIndex}
                index={imageIndex}
                width={windowWidth}
                sharedValue={scrollX}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const Pointer = ({
  index,
  width,
  sharedValue,
}: {
  index: number;
  width: number;
  sharedValue: Animated.SharedValue<number>;
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const size = interpolate(
      sharedValue.value,
      [width * (index - 1), width * index, width * (index + 1)],
      [8, 16, 8],
      Extrapolate.CLAMP,
    );

    return {
      width: size,
      height: size,
    };
  });

  return <Animated.View style={[styles.indicator, animatedStyles]} />;
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
