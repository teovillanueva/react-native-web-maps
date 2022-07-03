import React from 'react';
import {
  Marker as GMMarker,
  OverlayView as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import type { MarkerProps } from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';

export function Marker(props: MarkerProps) {
  const map = useGoogleMap();

  return props.children ? (
    <GMOverlayView
      mapPaneName="overlayMouseTarget"
      position={{
        lat: Number(props.coordinate.latitude),
        lng: Number(props.coordinate.longitude),
      }}
      getPixelPositionOffset={
        props.anchor
          ? (w, h) => ({
              x: (w * props.anchor!.x) / w,
              y: (h * props.anchor!.y) / h,
            })
          : undefined
      }
    >
      <div
        onClick={() =>
          props.onPress?.(
            mapMouseEventToMapEvent(null, props.coordinate, map, 'marker-press')
          )
        }
      >
        {props.children}
      </div>
    </GMOverlayView>
  ) : (
    <GMMarker
      draggable={props.draggable}
      title={props.title}
      onClick={(e) =>
        props.onPress?.(
          mapMouseEventToMapEvent(e, props.coordinate, map, 'marker-press')
        )
      }
      onDrag={(e) =>
        props.onDrag?.(mapMouseEventToMapEvent(e, props.coordinate, map, ''))
      }
      onDragStart={(e) =>
        props.onDragStart?.(
          mapMouseEventToMapEvent(e, props.coordinate, map, '')
        )
      }
      onDragEnd={(e) =>
        props.onDragEnd?.(mapMouseEventToMapEvent(e, props.coordinate, map, ''))
      }
      options={{
        clickable: props.tappable,
        opacity: props.opacity,
        draggable: props.draggable,
        anchorPoint: props.anchor
          ? new google.maps.Point(props.anchor?.x, props.anchor?.y)
          : null,
      }}
      position={{
        lat: Number(props.coordinate.latitude),
        lng: Number(props.coordinate.longitude),
      }}
    />
  );
}
