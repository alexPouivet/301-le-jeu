import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function refreshIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <Path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </Svg>
  )
}
