import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M10 21C12.7614 21 15 16.9706 15 12C15 7.02944 12.7614 3 10 3M10 21C7.23858 21 5 16.9706 5 12C5 7.02944 7.23858 3 10 3M10 21H14C15.3261 21 16.5979 20.0518 17.5355 18.364C18.4732 16.6761 19 14.3869 19 12C19 9.61305 18.4732 7.32387 17.5355 5.63604C16.5979 3.94821 15.3261 3 14 3L10 3M11.5 12C11.5 14.2091 10.8284 16 10 16C9.17157 16 8.5 14.2091 8.5 12C8.5 9.79086 9.17157 8 10 8C10.8284 8 11.5 9.79086 11.5 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
    
  );
}
