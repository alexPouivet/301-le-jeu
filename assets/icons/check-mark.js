import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M5 11.6917L9.70016 16.3802C9.86142 16.5411 10.1199 16.5398 10.2795 16.3772L19 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
