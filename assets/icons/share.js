import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M12 5.45554V14.3333M15.2001 7.78895L12.5657 5.22781C12.2533 4.92406 11.7468 4.92406 11.4343 5.22781L8.80003 7.78895M8 10.0556L7.60198 10.0943C5.55718 10.2931 4 11.9659 4 13.9638V15.1111C4 17.2589 5.79086 19 8 19H16C18.2091 19 20 17.2589 20 15.1111V13.9638C20 11.9659 18.4428 10.2931 16.398 10.0943L16 10.0556" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
