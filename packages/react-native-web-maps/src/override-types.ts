import type { MapViewProps as RNMapViewProps } from 'react-native-maps/lib/MapView';

/**
 * Overrides MapView props to include additional web-specific props
 *
 * Add '/// <reference types="@teovilla/react-native-web-maps/dist/typescript/override-types" />'
 * in the app.d.ts file of the app to get overriden types
 */

declare module 'react-native-maps' {
  //@ts-ignore gets rid of 'Duplicate indetfier' error
  export interface MapViewProps extends RNMapViewProps {
    googleMapsApiKey?: string;
    googleMapsMapId?: string;
    loadingFallback?: JSX.Element;
    options?: google.maps.MapOptions;
  }
}
