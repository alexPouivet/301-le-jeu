import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Line, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function calendarIcon(props) {

  if(props.color =="black") {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Rect x="4" y="5" width="16" height="16" rx="2" />
        <Line x1="16" y1="3" x2="16" y2="7" />
        <Line x1="8" y1="3" x2="8" y2="7" />
        <Line x1="4" y1="11" x2="20" y2="11" />
        <Line x1="11" y1="15" x2="12" y2="15" />
        <Line x1="12" y1="15" x2="12" y2="18" />
      </Svg>
    )
  } else {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Rect x="4" y="5" width="16" height="16" rx="2" />
        <Line x1="16" y1="3" x2="16" y2="7" />
        <Line x1="8" y1="3" x2="8" y2="7" />
        <Line x1="4" y1="11" x2="20" y2="11" />
        <Line x1="11" y1="15" x2="12" y2="15" />
        <Line x1="12" y1="15" x2="12" y2="18" />
      </Svg>
    )
  }
}
