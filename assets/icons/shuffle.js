import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M4 16.5H6.53275C7.45852 16.5 8.33244 16.0726 8.90081 15.3418L14.0992 8.65818C14.6676 7.92742 15.5415 7.5 16.4673 7.5H19M4 7.5H6.6387C7.50378 7.5 8.32676 7.87344 8.89643 8.52449L9.75 9.5M19 16.5H16.7231C15.6561 16.5 14.6694 15.9333 14.1318 15.0116L13.25 13.5M18 10L19.8951 7.79463C20.035 7.63191 20.035 7.36809 19.8951 7.20537L18 5M18 19L19.8951 16.7946C20.035 16.6319 20.035 16.3681 19.8951 16.2054L18 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

    );
  }
