import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M6.57522 6.57522L17.4248 17.4248C18.5392 18.5392 18.4561 20.3699 17.2454 21.3788V21.3788C16.7638 21.7802 16.1566 22 15.5297 22H8.47033C7.84336 22 7.23623 21.7802 6.75457 21.3788V21.3788C5.54387 20.3699 5.46083 18.5392 6.57522 17.4248L17.4248 6.57521C18.5392 5.46083 18.4561 3.63011 17.2454 2.62119V2.62119C16.7638 2.21981 16.1566 2 15.5297 2H8.47033C7.84336 2 7.23623 2.21981 6.75457 2.62119V2.62119C5.54387 3.63011 5.46083 5.46083 6.57522 6.57522Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M9.3408 17.75C10.0662 17 12 15 12 15L14.6592 17.75C15.3845 18.5 14.901 20 13.6923 20H10.3079C9.09914 20 8.61541 18.5 9.3408 17.75Z" fill={color}/>
    <Path d="M13.7728 8.35L12 10L10.2272 8.35C9.74368 7.9 10.066 7 10.8718 7L13.1281 7C13.9339 7 14.2564 7.9 13.7728 8.35Z" fill={color}/>
    </Svg>

  );
}
