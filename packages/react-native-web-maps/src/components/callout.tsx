import * as React from 'react';
import {
  InfoWindow as GMInfoWindow,
  OverlayView as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import type { MapCalloutProps, LatLng, Point } from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';

export type CalloutContextType = {
  coordinate: LatLng;
  calloutVisible: boolean;
  toggleCalloutVisible: () => void;
  markerSize: { width: number; height: number };
  anchor: Point;
};

export const CalloutContext = React.createContext<CalloutContextType>({
  coordinate: { latitude: 0, longitude: 0 },
  calloutVisible: false,
  toggleCalloutVisible: () => {},
  markerSize: { width: 0, height: 0 },
  anchor: { x: 0, y: 0 },
});

export function Callout(props: MapCalloutProps) {
  const map = useGoogleMap();

  const {
    coordinate,
    calloutVisible,
    toggleCalloutVisible,
    markerSize,
    anchor,
  } = React.useContext(CalloutContext);

  //By default callout is positioned to bottom center
  //i.e. is at anchor: (0.5, 1)
  //This compensates to match expected result using the provided anchor prop
  const xOffset = -(markerSize.width * (0.5 - anchor.x));
  const yOffset = -(markerSize.height * (1 - anchor.y));

  return calloutVisible ? (
    <div
      onClick={(e) => {
        props.onPress?.(
          mapMouseEventToMapEvent(null, coordinate, map, 'callout-press')
        );
        e.stopPropagation(); //Prevent marker click handler from being called
      }}
    >
      {props.tooltip ? (
        <GMOverlayView
          mapPaneName="overlayMouseTarget"
          position={{
            lat: Number(coordinate.latitude),
            lng: Number(coordinate.longitude),
          }}
          getPixelPositionOffset={() => ({
            x: xOffset,
            y: yOffset,
          })}
        >
          {/* Render on top of marker instead of inside */}
          <div style={{ transform: 'translate(-50%,-100%)' }}>
            {props.children}
          </div>
        </GMOverlayView>
      ) : (
        <GMInfoWindow
          position={{
            lat: Number(coordinate.latitude),
            lng: Number(coordinate.longitude),
          }}
          options={{
            pixelOffset: new google.maps.Size(xOffset, yOffset),
          }}
          onCloseClick={() => toggleCalloutVisible()}
        >
          <>{props.children}</>
        </GMInfoWindow>
      )}
    </div>
  ) : null;
}
