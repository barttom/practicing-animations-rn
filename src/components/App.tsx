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
import {BlinkingAnimated} from './Blinking/BlinkingAnimated';
import {DragAndDropAnimated} from './DragAndDrop/DragAndDropAnimated';
import {SwipeAnimated} from './Swipe/SwipeAnimated';

const animations = [
  {label: 'Blinking', component: <BlinkingAnimated />},
  {label: 'Drag and Drop', component: <DragAndDropAnimated />},
  {label: 'Swipe', component: <SwipeAnimated />},
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleChangeAnimation = useCallback((index: number) => {
    setCurrentAnimation(index);
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.wrapper]}>
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
      <View style={styles.wrapper}>
        {animations[currentAnimation].component}
      </View>
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
  },
  menuWrapper: {backgroundColor: '#ddd', flexGrow: 0},
});

export default App;
