import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Line, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function helpIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Circle cx="12" cy="12" r="9" />
      <Line x1="12" y1="17" x2="12" y2="17.01" />
      <Path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
    </Svg>
  )
}
