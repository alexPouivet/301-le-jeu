import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 14.4477 20.2993 16.6733 18.747 18.3278C18.36 17.9212 17.8882 17.5665 17.3701 17.2704C15.9707 16.4708 14.0875 16 12.0482 16C10.0089 16 8.12572 16.4708 6.72635 17.2704C6.18656 17.5788 5.69711 17.9509 5.30138 18.379C3.72048 16.7194 2.75 14.473 2.75 12ZM6.41925 19.3775C7.97046 20.5527 9.9038 21.25 12 21.25C14.1214 21.25 16.0761 20.5358 17.6366 19.3348C17.3797 19.0696 17.0448 18.8121 16.6258 18.5728C15.4917 17.9247 13.8749 17.5 12.0482 17.5C10.2215 17.5 8.60469 17.9247 7.47056 18.5728C7.02924 18.8249 6.68106 19.0972 6.41925 19.3775ZM12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z" fill={color}/>
    <Circle cx="12" cy="11" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
