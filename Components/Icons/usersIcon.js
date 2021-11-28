import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Line, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function usersIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Circle cx="9" cy="7" r="4" />
      <Path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <Path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </Svg>
  )
}
