import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M11.9054 16C8.05766 16 4.93848 12.866 4.93848 9V6C4.93848 3.79086 6.72087 2 8.91955 2H14.8912C17.0898 2 18.8722 3.79086 18.8722 6V9C18.8722 12.866 15.7531 16 11.9054 16ZM11.9054 16V19M5.68493 22H18.1258M5.12777 4.00003C0.957411 3.5 0.957411 8.00002 5.12777 11M18.8722 4.03836C23.0426 3.53833 23.0426 8.03835 18.8722 11.0384M7.92429 22H15.8864C16.4361 22 16.8817 21.5523 16.8817 21C16.8817 19.8954 15.9905 19 14.8912 19H8.91955C7.82021 19 6.92902 19.8954 6.92902 21C6.92902 21.5523 7.37461 22 7.92429 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

  );
}
