import { Image, StyleSheet, Text } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { useGame } from '@/context/GameContext';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
  const { points, updatePoints } = useGame();
  const position = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);

  const singleTap = Gesture.Tap().onEnd(() => {
      runOnJS(updatePoints)(1);
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(updatePoints)(2);
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value.x },
      { translateY: position.value.y },
      { scale: scale.value },
    ],
  }));

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

        <GestureDetector gesture={taps}>
          <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
        </GestureDetector>
      </ParallaxScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  box: { width: 100, height: 100, backgroundColor: 'blue', borderRadius: 10 },
});