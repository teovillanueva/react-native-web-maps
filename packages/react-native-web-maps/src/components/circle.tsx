import React from 'react';
import { Circle as GMCircle } from '@react-google-maps/api';
import type { MapCircleProps } from 'react-native-maps';

export function Circle(props: MapCircleProps) {
  return (
    <GMCircle
      center={{ lat: props.center.latitude, lng: props.center.longitude }}
      radius={props.radius}
      options={{
        fillColor: props.fillColor,
        strokeColor: props.strokeColor,
        zIndex: props.zIndex,
      }}
    />
  );
}
