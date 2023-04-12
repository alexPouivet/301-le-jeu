import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M18 18C14.6863 21.3137 9.31371 21.3137 6 18M18 18C21.3137 14.6863 21.3137 9.31371 18 6M18 18L14.4 14.4M6 18C2.68629 14.6863 2.68629 9.31371 6 6M6 18L9.6 14.4M6 6C9.31371 2.68629 14.6863 2.68629 18 6M6 6L9.6 9.6M18 6L14.4 9.6M14.4 14.4C13.0745 15.7255 10.9255 15.7255 9.6 14.4M14.4 14.4C15.7255 13.0745 15.7255 10.9255 14.4 9.6M9.6 14.4C8.27452 13.0745 8.27452 10.9255 9.6 9.6M9.6 9.6C10.9255 8.27452 13.0745 8.27452 14.4 9.6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
