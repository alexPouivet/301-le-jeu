import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M4.28564 12H20.2856M9.28574 6L3.99284 11.2929C3.60232 11.6834 3.60232 12.3166 3.99284 12.7071L9.28574 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

);
}
