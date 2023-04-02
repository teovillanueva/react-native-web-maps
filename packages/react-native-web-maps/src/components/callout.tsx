import * as React from 'react';
import {
  InfoWindow as GMInfoWindow,
  OverlayView as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import type { MapCalloutProps, LatLng } from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';

export type CalloutContextType = {
  coordinate: LatLng;
  calloutVisible: boolean;
  toggleCalloutVisible: () => void;
  mvcObjectAnchor?: google.maps.MVCObject;
};

export const CalloutContext = React.createContext<CalloutContextType>({
  coordinate: { latitude: 0, longitude: 0 },
  calloutVisible: false,
  toggleCalloutVisible: () => {},
});

export function Callout(props: MapCalloutProps) {
  const map = useGoogleMap();

  const { coordinate, calloutVisible, toggleCalloutVisible, mvcObjectAnchor } =
    React.useContext(CalloutContext);

  return calloutVisible ? (
    <div
      onClick={() =>
        props.onPress?.(
          mapMouseEventToMapEvent(null, coordinate, map, 'callout-press')
        )
      }
    >
      {props.tooltip ? (
        <GMOverlayView
          mapPaneName="overlayMouseTarget"
          position={{
            lat: Number(coordinate.latitude),
            lng: Number(coordinate.longitude),
          }}
        >
          <>{props.children}</>
        </GMOverlayView>
      ) : (
        <GMInfoWindow
          anchor={mvcObjectAnchor}
          position={{
            lat: Number(coordinate.latitude),
            lng: Number(coordinate.longitude),
          }}
          onCloseClick={() => toggleCalloutVisible()}
        >
          <>{props.children}</>
        </GMInfoWindow>
      )}
    </div>
  ) : null;
}
