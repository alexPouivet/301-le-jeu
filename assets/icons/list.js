import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8 4.25H7C5.34315 4.25 4 5.59315 4 7.25V19.25C4 20.9069 5.34315 22.25 7 22.25H17C18.6569 22.25 20 20.9069 20 19.25V7.25C20 5.59315 18.6569 4.25 17 4.25H16M8 4.25C8 5.63071 9.11929 6.75 10.5 6.75H13.5C14.8807 6.75 16 5.63071 16 4.25M8 4.25C8 2.86929 9.11929 1.75 10.5 1.75H13.5C14.8807 1.75 16 2.86929 16 4.25M7 14.25H11M7 18.25H15M7 10.25H13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
