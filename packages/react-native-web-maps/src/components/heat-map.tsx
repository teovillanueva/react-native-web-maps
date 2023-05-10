import React from 'react';
import { HeatmapLayer as GMHeatmap } from '@react-google-maps/api';
import type { MapHeatmapProps } from 'react-native-maps';

export function Heatmap(props: MapHeatmapProps) {
  return (
    <GMHeatmap
      data={(props.points || []).map((p) => ({
        location: new google.maps.LatLng({
          lat: p.latitude,
          lng: p.longitude,
        }),
        weight: p.weight || 0,
      }))}
      options={{
        radius: props.radius,
        gradient: props.gradient?.colors,
        opacity: props.opacity,
      }}
    />
  );
}
