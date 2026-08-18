import { Animated } from 'react-native';

import { NativeWindAnimatedView } from './animated';

describe('NativeWind animated adapter', () => {
  it('wraps Animated.View in a CSS interop boundary', () => {
    expect(NativeWindAnimatedView).not.toBe(Animated.View);
    expect(NativeWindAnimatedView.displayName).toContain('CssInterop');
  });
});
