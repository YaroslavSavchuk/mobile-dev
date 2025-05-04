import { Dimensions, Image, StyleSheet } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView, Directions } from 'react-native-gesture-handler';
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LOGO_SIZE = 150;

export default function HomeScreen() {
  const { points, updatePoints, completeTask, updateTaskProgress } = useGame();
  const startPosition = useSharedValue({ 
    x: (SCREEN_WIDTH - LOGO_SIZE) / 2, 
    y: (SCREEN_HEIGHT - LOGO_SIZE) / 2 
  });
  const position = useSharedValue({ 
    x: (SCREEN_WIDTH - LOGO_SIZE) / 2, 
    y: (SCREEN_HEIGHT - LOGO_SIZE) / 2 
  });
  const startScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const logoColor = useSharedValue('#61dafb');

  const changeLogoColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    logoColor.value = withTiming(randomColor, { duration: 500 });
  };

  const handleSingleTap = () => {
    updatePoints(1);
    updateTaskProgress(1, 1);
    changeLogoColor();
  };

  const handleDoubleTap = () => {
    updatePoints(2);
    updateTaskProgress(2, 1);
    changeLogoColor();
  };

  // Gesture Definitions
  const singleTap = Gesture.Tap()
    .onEnd(() => runOnJS(handleSingleTap)());

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => runOnJS(handleDoubleTap)());

  const taps = Gesture.Exclusive(doubleTap, singleTap);

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onEnd(() => {
      runOnJS(updatePoints)(10);
      runOnJS(completeTask)(3);
    });

  const pan = Gesture.Pan()
    .onBegin(() => runOnJS(completeTask)(4))
    .onStart(() => startPosition.value = { ...position.value })
    .onUpdate(e => {
      position.value = {
        x: startPosition.value.x + e.translationX,
        y: startPosition.value.y + e.translationY,
      };
    });

  //fix flinging swiping once right or left causing two task completion
  const fling = Gesture.Fling()
    .direction(Directions.RIGHT | Directions.LEFT)
    .onEnd(e => {
      runOnJS(updatePoints)(Math.floor(Math.random() * 10) + 1);
      if (Directions.RIGHT) runOnJS(completeTask)(5);
      if (Directions.LEFT) runOnJS(completeTask)(6);
    });

  const pinch = Gesture.Pinch()
    .onStart(() => startScale.value = scale.value)
    .onUpdate(e => scale.value = e.scale)
    .onEnd(() => {
      if (scale.value !== startScale.value) runOnJS(completeTask)(7);
    });

  const composedGestures = Gesture.Simultaneous(
    taps,
    Gesture.Simultaneous(longPress, pan, pinch, fling)
  );

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
        <Animated.Image
          source={require('@/assets/images/react-logo-big.png')}
          style={[
            styles.logo,
            animatedStyle,
            animatedLogoStyle,
            { position: 'absolute' }
          ]}
        />
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
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
});