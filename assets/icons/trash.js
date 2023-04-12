import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M19 9.25L18.142 20.4034C18.0619 21.4454 17.193 22.25 16.1479 22.25H7.85206C6.80699 22.25 5.93811 21.4454 5.85795 20.4034L5 9.25M10.5 16.25H13.5M9.5 12.25H14.5M2.5 6.25C2.5 6.25 6.5 5.25 12 5.25C17.5 5.25 21.5 6.25 21.5 6.25M15.5 5.25L15.2453 3.46716C15.1046 2.48186 14.2607 1.75 13.2654 1.75H10.7346C9.73929 1.75 8.89545 2.48186 8.75469 3.46716L8.5 5.25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
