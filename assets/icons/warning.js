import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M9.37176 5.16423C10.5115 3.0919 13.4893 3.09191 14.6291 5.16423L20.5552 15.9391C21.6549 17.9385 20.2084 20.3849 17.9266 20.3849H6.07422C3.79241 20.3849 2.34592 17.9385 3.44557 15.9391L9.37176 5.16423Z" stroke={color} strokeWidth="1.5"/>
    <Path d="M12.0004 8.38489L12.0004 13.3849" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Path d="M12.2504 16.3849C12.2504 16.523 12.1384 16.6349 12.0004 16.6349C11.8623 16.6349 11.7504 16.523 11.7504 16.3849C11.7504 16.2468 11.8623 16.1349 12.0004 16.1349C12.1384 16.1349 12.2504 16.2468 12.2504 16.3849Z" fill={color} stroke={color} stroke-width="1.5"/>
    </Svg>

  );
}
