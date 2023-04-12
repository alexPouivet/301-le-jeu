import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M15.1633 16.4641C14.0628 16.1588 12.8521 16 11.625 16C10.3979 16 9.18724 16.1588 8.08669 16.4641C6.98614 16.7694 6.02519 17.213 5.27817 17.7606C4.53116 18.3082 4.01811 18.9451 3.77872 19.6221C3.53932 20.2991 3.58 20.998 3.89759 21.6647M17.375 19.875H18.875M18.875 19.875H20.375M18.875 19.875V18.375M18.875 19.875V21.375M16.625 8C16.625 10.7614 14.3864 13 11.625 13C8.86358 13 6.625 10.7614 6.625 8C6.625 5.23858 8.86358 3 11.625 3C14.3864 3 16.625 5.23858 16.625 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>


  );
}
