/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BlinkingAnimated, BlinkingReanimated} from './Blinking/';
import {DragAndDropAnimated, DragAndDropReanimated} from './DragAndDrop/';
import {SwipeAnimated, SwipeReanimated} from './Swipe/';

const animations = [
  {
    label: 'Blinking',
    animated: <BlinkingAnimated />,
    reanimated: <BlinkingReanimated />,
  },
  {
    label: 'Drag and Drop',
    animated: <DragAndDropAnimated />,
    reanimated: <DragAndDropReanimated />,
  },
  {
    label: 'Swipe',
    animated: <SwipeAnimated />,
    reanimated: <SwipeReanimated />,
  },
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleChangeAnimation = useCallback((index: number) => {
    setCurrentAnimation(index);
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.wrapper]}>
      <GestureHandlerRootView style={styles.wrapper}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView horizontal style={styles.menuWrapper}>
          {animations.map(({label}, index) => (
            <Pressable
              key={index}
              style={styles.button}
              accessibilityRole="button"
              onPress={() => handleChangeAnimation(index)}>
              <Text
                style={{
                  color: currentAnimation === index ? '#1ce1ce' : '#333',
                }}>
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.typeWrapper}>
          <Pressable
            accessibilityRole="button"
            style={[styles.button, styles.fullWidthButton]}
            onPress={() => setIsAnimated(true)}>
            <Text
              style={{
                color: isAnimated ? '#1ce1ce' : '#333',
              }}>
              Animated
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            style={[styles.button, styles.fullWidthButton]}
            onPress={() => setIsAnimated(false)}>
            <Text
              style={{
                color: !isAnimated ? '#1ce1ce' : '#333',
              }}>
              Reanimated
            </Text>
          </Pressable>
        </View>
        <View style={styles.wrapper}>
          {animations[currentAnimation][isAnimated ? 'animated' : 'reanimated']}
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    textAlign: 'center',
  },
  fullWidthButton: {
    flexGrow: 1,
    alignItems: 'center',
  },
  menuWrapper: {backgroundColor: '#ddd', flexGrow: 0},
  typeWrapper: {
    flexGrow: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    flexDirection: 'row',
  },
});

export default App;
