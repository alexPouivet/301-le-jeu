import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Line, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function TwentyPtsIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
      <G id="Groupe_65" data-name="Groupe 65" transform="translate(-23 -203)">
        <Rect id="Rectangle_18" data-name="Rectangle 18" width="52" height="52" rx="10" transform="translate(23 203)" fill="#fff"/>
        <TextSvg transform="translate(49 224)" fill="#24334c" fontSize="18" fontWeight="bold"><TSpan x="-10.354" y="0">10</TSpan><TSpan x="-13.043" y="24">pts</TSpan></TextSvg>
      </G>
    </Svg>
  )
}
