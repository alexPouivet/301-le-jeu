import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { G, Path, Rect, Circle, Line, Text as TextSvg, TSpan, Polyline } from 'react-native-svg';

export default function trophyIcon(props) {

  if(props.size == "big") {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Line x1="8" y1="21" x2="16" y2="21" />
        <Line x1="12" y1="17" x2="12" y2="21" />
        <Line x1="7" y1="4" x2="17" y2="4" />
        <Path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
        <Circle cx="5" cy="9" r="2" />
        <Circle cx="19" cy="9" r="2" />
      </Svg>
    )
  }

  else {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Line x1="8" y1="21" x2="16" y2="21" />
        <Line x1="12" y1="17" x2="12" y2="21" />
        <Line x1="7" y1="4" x2="17" y2="4" />
        <Path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
        <Circle cx="5" cy="9" r="2" />
        <Circle cx="19" cy="9" r="2" />
      </Svg>
    )
  }
}
