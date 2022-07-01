import React from 'react';
import { Polyline as GMPolyline } from '@react-google-maps/api';
import type { MapEvent, MapPolylineProps } from 'react-native-maps';

export function Polyline(props: MapPolylineProps) {
  return (
    <GMPolyline
      path={props.coordinates.map((c) => ({
        lat: c.latitude,
        lng: c.longitude,
      }))}
      onClick={(e) =>
        props.onPress?.({
          nativeEvent: {
            action: 'polyline-press',
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
        geodesic: props.geodesic,
        clickable: props.tappable,
        strokeColor: props.strokeColor,
        strokeWeight: props.strokeWidth,
      }}
    />
  );
}
