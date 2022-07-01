import React from 'react';
import { Polygon as GMPolygon } from '@react-google-maps/api';
import type { MapEvent, MapPolygonProps } from 'react-native-maps';

export function Polygon(props: MapPolygonProps) {
  return (
    <GMPolygon
      path={props.coordinates.map((c) => ({
        lat: c.latitude,
        lng: c.longitude,
      }))}
      onClick={(e) =>
        props.onPress?.({
          nativeEvent: {
            action: 'polygon-press',
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
        fillColor: props.fillColor,
        strokeColor: props.strokeColor,
        strokeWeight: props.strokeWidth,
      }}
    />
  );
}
