import React from 'react';
import { Polyline as GMPolyline, useGoogleMap } from '@react-google-maps/api';
import type { MapPolylineProps } from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';

export function Polyline(props: MapPolylineProps) {
  const map = useGoogleMap();

  return (
    <GMPolyline
      path={props.coordinates.map((c) => ({
        lat: c.latitude,
        lng: c.longitude,
      }))}
      onClick={(e) =>
        props.onPress?.(mapMouseEventToMapEvent(e, null, map, 'polyline-press'))
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
