import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M15.5 19V7C15.5 5.89543 14.6046 5 13.5 5H10.5C9.39543 5 8.5 5.89543 8.5 7V19M15.5 19H8.5M15.5 19H22C22.2761 19 22.5 18.7761 22.5 18.5V14C22.5 12.8954 21.6046 12 20.5 12H15.5V19ZM8.5 19V9H3.5C2.39543 9 1.5 9.89543 1.5 11V18.5C1.5 18.7761 1.72386 19 2 19H8.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
