import React from 'react';
import {
  Marker as GMMarker,
  OverlayView as GMOverlayView,
} from '@react-google-maps/api';
import type { MapEvent, MarkerProps } from 'react-native-maps';

export function Marker(props: MarkerProps) {
  return props.children ? (
    <GMOverlayView
      mapPaneName="overlayMouseTarget"
      position={{
        lat: Number(props.coordinate.latitude),
        lng: Number(props.coordinate.longitude),
      }}
    >
      <div
        onClick={() =>
          props.onPress?.({
            nativeEvent: {
              action: 'marker-press',
              coordinate: {
                latitude: Number(props.coordinate.latitude),
                longitude: Number(props.coordinate.longitude),
              },
              position: { x: 0, y: 0 },
            },
          } as MapEvent<{
            action: 'marker-press';
            id: string;
          }>)
        }
      >
        {props.children}
      </div>
    </GMOverlayView>
  ) : (
    <GMMarker
      draggable={props.draggable}
      onClick={(e) =>
        props.onPress?.({
          nativeEvent: {
            action: 'marker-press',
            coordinate: {
              latitude: e.latLng?.lat() || 0,
              longitude: e.latLng?.lng() || 0,
            },
            position: { x: 0, y: 0 },
          },
        } as MapEvent<{
          action: 'marker-press';
          id: string;
        }>)
      }
      position={{
        lat: Number(props.coordinate.latitude),
        lng: Number(props.coordinate.longitude),
      }}
    />
  );
}
