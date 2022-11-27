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
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BlinkingAnimated} from './Blinking/BlinkingAnimated';

const animations = [
  {label: 'Blinking', component: <BlinkingAnimated />},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
  {label: 'Another 1', component: null},
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
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView horizontal style={{backgroundColor: '#ddd', flexGrow: 0}}>
        {animations.map(({label}, index) => (
          <Pressable
            key={index}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              margin: 5,
            }}
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
      <View style={{flex: 1}}>{animations[currentAnimation].component}</View>
    </SafeAreaView>
  );
};

export default App;
