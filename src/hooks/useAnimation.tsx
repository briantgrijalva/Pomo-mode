import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useAnimation = () => {

    const opacity = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;

    const [opValue, setOpValue] = useState<number>(1);


    const fadeIn = (duration: number = 300) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true,
            }
        ).start(() => setOpValue(1));
    };

    const fadeOut = (duration: number = 300) => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration,
                useNativeDriver: true,
            }
        ).start(() => setOpValue(0));
    };


    const startMovingPosition = (initPosition: number, duration: number = 300) => {

        position.setValue(initPosition);

        Animated.timing(
            position,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
                // easing: Easing.bounce,
            }
        ).start();
    };

  return {
    fadeIn,
    fadeOut,
    opacity,
    startMovingPosition,
    position,
    opValue,
  };
};
