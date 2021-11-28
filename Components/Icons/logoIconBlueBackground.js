import * as React from 'react';
import Svg, { G, Path, Rect, Circle, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function logoIconBlue(props) {

  if(props.position == "bottom-right") {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 93.126 93.126" style={{ position: "absolute", opacity: 0.4, bottom: -50, right: -30}}
      >
        <G id="Groupe_112" data-name="Groupe 112" transform="translate(-79 -79.436)">
          <Path id="Tracé_8" data-name="Tracé 8" d="M46.563,0A46.563,46.563,0,1,1,0,46.563,46.563,46.563,0,0,1,46.563,0Z" transform="translate(79 79.436)" fill="rgba(89,61,218,0.20)"/>
          <Path id="Ellipse_3" data-name="Ellipse 3" d="M37.711,3A34.721,34.721,0,0,0,24.2,69.7,34.721,34.721,0,0,0,51.221,5.727,34.491,34.491,0,0,0,37.711,3m0-3A37.711,37.711,0,1,1,0,37.711,37.711,37.711,0,0,1,37.711,0Z" transform="translate(87.642 88.078)" fill="#fff"/>
          <Path id="Ellipse_4" data-name="Ellipse 4" d="M31.818,3A28.827,28.827,0,0,0,20.6,58.373,28.827,28.827,0,0,0,43.035,5.263,28.635,28.635,0,0,0,31.818,3m0-3A31.818,31.818,0,1,1,0,31.818,31.818,31.818,0,0,1,31.818,0Z" transform="translate(93.927 94.363)" fill="#fff"/>
          <TextSvg id="_301" data-name="301" transform="translate(125.563 136.289)" fill="#fff" fontSize="25" fontWeight="bold"><TSpan x="-20" y="-1">301</TSpan></TextSvg>
        </G>
      </Svg>
    )
  }  else {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 93.126 93.126" style={{ position: "absolute", opacity: 0.4, top: -50, right: -30}}
      >
        <G id="Groupe_112" data-name="Groupe 112" transform="translate(-79 -79.436)">
          <Path id="Tracé_8" data-name="Tracé 8" d="M46.563,0A46.563,46.563,0,1,1,0,46.563,46.563,46.563,0,0,1,46.563,0Z" transform="translate(79 79.436)" fill="rgba(89,61,218,0.20)"/>
          <Path id="Ellipse_3" data-name="Ellipse 3" d="M37.711,3A34.721,34.721,0,0,0,24.2,69.7,34.721,34.721,0,0,0,51.221,5.727,34.491,34.491,0,0,0,37.711,3m0-3A37.711,37.711,0,1,1,0,37.711,37.711,37.711,0,0,1,37.711,0Z" transform="translate(87.642 88.078)" fill="#fff"/>
          <Path id="Ellipse_4" data-name="Ellipse 4" d="M31.818,3A28.827,28.827,0,0,0,20.6,58.373,28.827,28.827,0,0,0,43.035,5.263,28.635,28.635,0,0,0,31.818,3m0-3A31.818,31.818,0,1,1,0,31.818,31.818,31.818,0,0,1,31.818,0Z" transform="translate(93.927 94.363)" fill="#fff"/>
          <TextSvg id="_301" data-name="301" transform="translate(125.563 136.289)" fill="#fff" fontSize="25" fontWeight="bold"><TSpan x="-20" y="-1">301</TSpan></TextSvg>
        </G>
      </Svg>
    )
  }
}
