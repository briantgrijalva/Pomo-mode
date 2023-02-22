import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThemeContext } from '../context/themeContext/ThemeContext';

  interface TimerCircleProps {
    radius: number;
    stroke: number;
    progress: number;
    onComplete?: () => void;
  }

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

//   const [paused, setPaused] = useState<boolean>(false);

  const TimerCircle: React.FC<TimerCircleProps> = ({
    radius,
    stroke,
    progress,
    onComplete,
  }) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const angle = (progress / 100) * 360;

    const animatedProps = useAnimatedProps(() => {
      const strokeDashoffsetAnimated = withTiming(
        strokeDashoffset,
        {
          duration: 500,
          easing: Easing.bezier(0.5, 0.01, 0, 1),
        //   useNativeDriver: true,
        },
        (isFinished) => {
          if (isFinished && onComplete) {
            onComplete();
          }
        }
      );
      return { strokeDashoffset: strokeDashoffsetAnimated };
    });


    const progressValue = useSharedValue(0);
    const angleValue = useSharedValue(0);
    const progressRef = useRef(progress);

    useEffect(() => {
        progressRef.current = progress;
        progressValue.value = progress;
        angleValue.value = (progress / 100) * 360;
    }, [progress, progressValue, angleValue]);

    useEffect(() => {
      angleValue.value = withTiming(angle, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
        // useNativeDriver: true,
      });
    }, [angle, angleValue]);

    const { theme } = useContext(ThemeContext);

  return (
    <View style={stylesCircle.circle}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          stroke={theme.colors.background}
          fill="transparent"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={radius - stroke / 2}
        />
        <AnimatedCircle
          stroke={theme.colors.primary}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          animatedProps={animatedProps}
          transform={'rotate(135 150 150) rotate(135 150 150)'}
          cx={radius}
          cy={radius}
          r={radius - stroke / 2}
        />
      </Svg>
    </View>
  );
};

const stylesCircle = StyleSheet.create({
    circle: {
        position: 'absolute',
        top: 80,
    },
});

export default TimerCircle;

