import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M5 2L5 22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Path d="M5 4.5C5 4.22386 5.22386 4 5.5 4H8.5C8.77614 4 9 4.22386 9 4.5V8H5.5C5.22386 8 5 7.77614 5 7.5V4.5Z" fill={color}/>
    <Path d="M9 8H13V12H9V8Z" fill={color}/>
    <Path d="M13 12H17V15.5C17 15.7761 16.7761 16 16.5 16H13.5C13.2239 16 13 15.7761 13 15.5V12Z" fill={color}/>
    <Path d="M13 4.5C13 4.22386 13.2239 4 13.5 4H16.5C16.7761 4 17 4.22386 17 4.5V8H13V4.5Z" fill={color}/>
    <Path d="M17 8H18.5C18.7761 8 19 8.22386 19 8.5V11.5C19 11.7761 18.7761 12 18.5 12H17V8Z" fill={color}/>
    <Path d="M5 12.5C5 12.2239 5.22386 12 5.5 12H9V15.5C9 15.7761 8.77614 16 8.5 16H5.5C5.22386 16 5 15.7761 5 15.5V12.5Z" fill={color}/>
    <Path d="M5 4H18.263C19.8604 4 20.8131 5.78029 19.9271 7.1094L18.7396 8.8906C18.2917 9.5624 18.2917 10.4376 18.7396 11.1094L19.9271 12.8906C20.8131 14.2197 19.8604 16 18.263 16H5" stroke={color} strokeWidth="1.5"/>
    </Svg>

  );
}
