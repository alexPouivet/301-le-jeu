import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8.5 4L15.133 11.0572C15.6223 11.5779 15.6223 12.4221 15.133 12.9428L8.5 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

  );
}
