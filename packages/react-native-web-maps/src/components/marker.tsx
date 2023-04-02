import React, { ReactElement } from 'react';
import {
  Marker as GMMarker,
  OverlayView as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import type { MarkerProps } from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';
import { CalloutContext, CalloutContextType } from './callout';

export function Marker(props: MarkerProps) {
  const map = useGoogleMap();

  const [calloutVisible, setCalloutVisible] = React.useState(false);
  const [mvcObjectAnchor, setMvcObjectAnchor] =
    React.useState<google.maps.MVCObject>();

  const onMarkerPress = (e?: google.maps.MapMouseEvent) => {
    props.onPress?.(
      mapMouseEventToMapEvent(e, props.coordinate, map, 'marker-press')
    );
    setCalloutVisible(!calloutVisible);
  };

  const calloutContextValue: CalloutContextType = {
    calloutVisible,
    toggleCalloutVisible: () => setCalloutVisible(!calloutVisible),
    coordinate: props.coordinate,
    mvcObjectAnchor,
  };

  const hasNonCalloutChildren = React.useMemo(
    () =>
      !!React.Children.toArray(props.children).find((child) => {
        return ((child as ReactElement).type as Function).name !== 'Callout';
      }),
    [props.children]
  );

  return (
    <CalloutContext.Provider value={calloutContextValue}>
      <>
        {hasNonCalloutChildren ? (
          <GMOverlayView
            mapPaneName="overlayMouseTarget"
            position={{
              lat: Number(props.coordinate.latitude),
              lng: Number(props.coordinate.longitude),
            }}
            getPixelPositionOffset={
              props.anchor
                ? (w, h) => ({
                    x: -(w * props.anchor!.x),
                    y: -(h * props.anchor!.y),
                  })
                : undefined
            }
            onLoad={(overlayView) => setMvcObjectAnchor(overlayView)}
          >
            <div onClick={() => onMarkerPress()}>{props.children}</div>
          </GMOverlayView>
        ) : (
          <GMMarker
            draggable={props.draggable}
            title={props.title}
            onClick={(e) => onMarkerPress(e)}
            onDrag={(e) =>
              props.onDrag?.(
                mapMouseEventToMapEvent(e, props.coordinate, map, '')
              )
            }
            onDragStart={(e) =>
              props.onDragStart?.(
                mapMouseEventToMapEvent(e, props.coordinate, map, '')
              )
            }
            onDragEnd={(e) =>
              props.onDragEnd?.(
                mapMouseEventToMapEvent(e, props.coordinate, map, '')
              )
            }
            onLoad={(marker) => setMvcObjectAnchor(marker)}
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
            children={props.children}
          />
        )}
      </>
    </CalloutContext.Provider>
  );
}
