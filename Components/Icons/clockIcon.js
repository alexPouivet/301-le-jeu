import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Line, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function clockIcon(props) {

  if(props.color =="black") {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#24334c" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Circle cx="12" cy="12" r="9" />
        <Polyline points="12 7 12 12 15 15" />
      </Svg>
    )
  } else {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Circle cx="12" cy="12" r="9" />
        <Polyline points="12 7 12 12 15 15" />
      </Svg>
    )
  }

}
