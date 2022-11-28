import React, {useRef} from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';

const images = [
  'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/7671976/pexels-photo-7671976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export const SwipeAnimated = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();

  return (
    <View style={styles.wrapper}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{width: windowWidth, height: 280}} key={imageIndex}>
                <ImageBackground source={{uri: image}} style={styles.card} />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={imageIndex}
                style={[styles.indicator, {width}]}
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
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
