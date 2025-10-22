import { Gesture, type GestureType } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { CalendarMode } from '../types';

type Params = {
  mode: CalendarMode;
  onSwitch: (target: CalendarMode) => void;
  verticalThreshold?: number;
  velocityThreshold?: number;
};

export function useCalendarModeGesture({
  mode,
  onSwitch,
  verticalThreshold = 40,
  velocityThreshold = 800,
}: Params): GestureType {
  const panGesture = Gesture.Pan()
    .activeOffsetX([-24, 24])
    .minDistance(10)
    .onEnd(e => {
      const dy = e.translationY;
      const vy = e.velocityY;
      const hitDistance = Math.abs(dy) >= verticalThreshold;
      const hitVelocity = Math.abs(vy) >= velocityThreshold;

      if ((hitDistance || hitVelocity) && dy < 0 && mode === 'month') {
        scheduleOnRN(onSwitch, 'week');
      } else if ((hitDistance || hitVelocity) && dy > 0 && mode === 'week') {
        scheduleOnRN(onSwitch, 'month');
      }
    });

  return panGesture;
}