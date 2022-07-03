import React from 'react';
import { Circle as GMCircle, useGoogleMap } from '@react-google-maps/api';
import type { MapCircleProps } from 'react-native-maps';
import { mapMouseEventToMapEvent } from 'src/utils/mouse-event';

export function Circle(props: MapCircleProps) {
  const map = useGoogleMap();
  return (
    <GMCircle
      center={{ lat: props.center.latitude, lng: props.center.longitude }}
      radius={props.radius}
      onClick={(e) =>
        props.onPress?.(mapMouseEventToMapEvent(e, null, map, 'polygon-press'))
      }
      options={{
        fillColor: props.fillColor,
        strokeColor: props.strokeColor,
        zIndex: props.zIndex,
      }}
    />
  );
}
