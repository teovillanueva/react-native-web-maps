import React from 'react';
import { Circle as GMCircle } from '@react-google-maps/api';
import type { MapEvent, MapCircleProps } from 'react-native-maps';

export function Circle(props: MapCircleProps) {
  return (
    <GMCircle
      center={{ lat: props.center.latitude, lng: props.center.longitude }}
      radius={props.radius}
      onClick={(e) =>
        props.onPress?.({
          nativeEvent: {
            action: 'press',
            position: { x: 0, y: 0 },
            coordinate: {
              latitude: e.latLng?.lat() || 0,
              longitude: e.latLng?.lng() || 0,
            },
          },
          preventDefault: e.stop,
          stopPropagation: e.stop,
        } as MapEvent<{}>)
      }
      options={{
        fillColor: props.fillColor,
        strokeColor: props.strokeColor,
        strokeWeight: props.strokeWidth,
      }}
    />
  );
}
