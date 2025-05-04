import { Image, StyleSheet, Text } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  runOnJS, 
  withTiming 
} from 'react-native-reanimated';
import { useGame } from '@/context/GameContext';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
  const { points, updatePoints } = useGame();
  const startPosition = useSharedValue({ x: 0, y: 0 });
  const position = useSharedValue({ x: 0, y: 0 });
  const startScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const logoColor = useSharedValue('#61dafb');

  const changeLogoColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    logoColor.value = withTiming(randomColor, { duration: 500 });
  };

  const handleSingleTap = () => {
    updatePoints(1);
    changeLogoColor();
  };

  const handleDoubleTap = () => {
    updatePoints(2);
    changeLogoColor();
  };

  const singleTap = Gesture.Tap().onEnd(() => {
    runOnJS(handleSingleTap)();
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      console.log("double tap!")
      runOnJS(handleDoubleTap)();
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);

  const longPress = Gesture.LongPress()
    .minDuration(1000)
    .onEnd(() => {
      runOnJS(updatePoints)(10);
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      startPosition.value = { ...position.value };
    })
    .onUpdate(e => {
      position.value = {
        x: startPosition.value.x + e.translationX,
        y: startPosition.value.y + e.translationY,
      };
    });

  const fling = Gesture.Fling()
    .direction(1 | 3)
    .onStart(() => {
      runOnJS(updatePoints)(Math.floor(Math.random() * 10) + 1);
    });

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(e => {
      scale.value = e.scale;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value.x },
      { translateY: position.value.y },
      { scale: scale.value },
    ],
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    tintColor: logoColor.value,
  }));

  const composedGestures = Gesture.Simultaneous(
    taps,
    Gesture.Simultaneous(longPress, pan, pinch, fling)
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Points: {points}</ThemedText>
        </ThemedView>
      </ParallaxScrollView>

      <GestureDetector gesture={composedGestures}>
        <Animated.View style={styles.interactiveArea}>
          <Animated.Image
            source={require('@/assets/images/react-logo-big.png')}
            style={[styles.logo, animatedStyle, animatedLogoStyle]}
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  interactiveArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
