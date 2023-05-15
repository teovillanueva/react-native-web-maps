/**
 * This component is taken from `react-native-maps`
 * I just replaced the inner components with the web ones
 * I guess this has been tested by the creators lol
 * https://github.com/react-native-maps/react-native-maps/blob/master/src/Geojson.js
 */

import React from 'react';
import type { GeojsonProps } from 'react-native-maps';
import { getColor, getStrokeWidth, makeOverlays } from '../utils/geojson';
import { Marker } from './marker';
import { Polygon } from './polygon';
import { Polyline } from './polyline';

export function Geojson(props: GeojsonProps) {
  const {
    title,
    zIndex,
    onPress,
    lineCap,
    lineJoin,
    tappable,
    miterLimit,
    lineDashPhase,
    lineDashPattern,
    markerComponent,
  } = props;

  const overlays = makeOverlays(props.geojson.features);

  return (
    <>
      {overlays.map((overlay, index) => {
        const fillColor = getColor(props, overlay, 'fill', 'fillColor');
        const strokeColor = getColor(props, overlay, 'stroke', 'strokeColor');
        const markerColor = getColor(props, overlay, 'marker-color', 'color');
        const strokeWidth = getStrokeWidth(props, overlay);
        if (overlay.type === 'point') {
          return (
            <Marker
              key={index}
              coordinate={overlay.coordinates as any}
              title={title}
              pinColor={markerColor}
              zIndex={zIndex}
              onPress={() => onPress && onPress(overlay as any)}
            >
              {markerComponent}
            </Marker>
          );
        }
        if (overlay.type === 'polygon') {
          return (
            <Polygon
              key={index}
              coordinates={overlay.coordinates as any}
              holes={overlay.holes}
              strokeColor={strokeColor}
              fillColor={fillColor}
              strokeWidth={strokeWidth}
              tappable={tappable}
              onPress={() => onPress && onPress(overlay as any)}
              zIndex={zIndex}
            />
          );
        }
        if (overlay.type === 'polyline') {
          return (
            <Polyline
              key={index}
              coordinates={overlay.coordinates as any}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              lineDashPhase={lineDashPhase}
              lineDashPattern={lineDashPattern}
              lineCap={lineCap}
              lineJoin={lineJoin}
              miterLimit={miterLimit}
              zIndex={zIndex}
              tappable={tappable}
              onPress={() => onPress && onPress(overlay as any)}
            />
          );
        }

        return null;
      })}
    </>
  );
}
