import React, { useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';

// Packages
import Avatar from '@mealection/react-native-boring-avatars';

// Avatar
export default function AvatarComponent(props) {

  return (

    <Avatar
      size={props.size}
      name={props.name}
      variant="beam"
      colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
    />

  )

};
