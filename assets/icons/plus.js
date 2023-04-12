import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M12 6L12 18M18 12L6 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>

  );
}
