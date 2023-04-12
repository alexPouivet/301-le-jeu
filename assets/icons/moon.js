import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {

  let height = props.size;
  let width = props.size;
  let color = props.color;

  return (

    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M18.7314 14.5692C19.4652 14.5202 20.0427 15.2266 19.6979 15.8763C19.2508 16.7184 18.6635 17.4828 17.9576 18.1348C16.8616 19.1473 15.5184 19.8533 14.063 20.1821C12.6076 20.5109 11.0913 20.4508 9.66652 20.0078C8.24173 19.5649 6.95864 18.7547 5.94621 17.6586C4.93379 16.5626 4.2277 15.2194 3.89893 13.764C3.57015 12.3086 3.63026 10.7924 4.07323 9.36757C4.51619 7.94278 5.3264 6.65969 6.42241 5.64726C7.12902 4.99454 7.93839 4.46915 8.81431 4.0901C9.48866 3.79829 10.1468 4.4286 10.0409 5.1557C9.72059 7.3534 9.42002 11.2896 11 13C12.5788 14.7092 16.5172 14.7173 18.7314 14.5692Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>

  );
}
