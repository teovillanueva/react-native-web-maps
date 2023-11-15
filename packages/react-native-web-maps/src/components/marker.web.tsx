import React from 'react';
import type { ReactElement, Ref } from 'react';
import {
  Marker as GMMarker,
  OverlayViewF as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import type { MapMarkerProps, Point } from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';
import { Callout, CalloutContext } from './callout';
import type { CalloutContextType } from './callout';

interface MarkerState {
  calloutVisible: boolean;
}

//Wrapped in class component to provide methods
//forwardRef + useImperativeHandle not sufficient because it returns a ForwardRefExoticComponent which does not seem to render in the MapView
export class Marker extends React.Component<MapMarkerProps, MarkerState> {
  constructor(props: MapMarkerProps) {
    super(props);
    this.state = { calloutVisible: false };
  }

  showCallout() {
    this.setState({ calloutVisible: true });
  }

  hideCallout() {
    this.setState({ calloutVisible: false });
  }

  render(): React.ReactNode {
    return (
      <MarkerF
        {...this.props}
        calloutVisible={this.state.calloutVisible}
        toggleCalloutVisible={() =>
          this.setState({ calloutVisible: !this.state.calloutVisible })
        }
      />
    );
  }
}

interface MarkerFProps extends MapMarkerProps {
  calloutVisible: boolean;
  toggleCalloutVisible: () => void;
}

function MarkerF(props: MarkerFProps) {
  const map = useGoogleMap();

  const customMarkerContainerRef = React.useRef<HTMLDivElement>();
  const [markerSize, setMarkerSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 22, height: 40 }); //22 x 40 is the default google maps marker size

  React.useEffect(() => {
    if (customMarkerContainerRef.current) {
      setMarkerSize({
        width: customMarkerContainerRef.current.clientWidth,
        height: customMarkerContainerRef.current.clientHeight,
      });
    }
  }, [customMarkerContainerRef.current]);

  const onMarkerPress = (e?: google.maps.MapMouseEvent) => {
    props.onPress?.(
      mapMouseEventToMapEvent(e, props.coordinate, map, 'marker-press')
    );
    props.toggleCalloutVisible();
  };

  const hasNonCalloutChildren = React.useMemo(
    () =>
      !!React.Children.toArray(props.children).find((child) => {
        return (child as ReactElement).type !== Callout;
      }),
    [props.children]
  );

  //Default anchor values to react-native-maps values (https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md)
  const anchor: Point = props.anchor || { x: 0.5, y: 1 };
  const calloutAnchor: Point = props.calloutAnchor || { x: 0.5, y: 0 };

  const calloutContextValue: CalloutContextType = {
    calloutVisible: props.calloutVisible,
    toggleCalloutVisible: props.toggleCalloutVisible,
    coordinate: props.coordinate,
    markerSize,
    anchor: calloutAnchor,
  };

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
            getPixelPositionOffset={(w, h) => ({
              x: -(w * anchor!.x),
              y: -(h * anchor!.y),
            })}
          >
            <div
              ref={customMarkerContainerRef as Ref<HTMLDivElement>}
              onClick={() => onMarkerPress()}
            >
              {props.children}
            </div>
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
