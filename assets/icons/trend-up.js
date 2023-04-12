import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M4 16.6991L7.9034 12.015C8.53455 11.2576 9.62345 11.0731 10.4688 11.5804L12.5312 12.8178C13.3765 13.325 14.4655 13.1405 15.0966 12.3831L19 7.69906M15.9655 7.54561L18.8229 7.00706C19.0338 6.96733 19.2622 7.09924 19.3332 7.30169L20.2956 10.0456" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

  );
}
