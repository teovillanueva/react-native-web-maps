import type { MapCalloutProps as RNMapCalloutProps } from 'react-native-maps/lib/MapCallout';
import type { MapMarkerProps as RNMapMarkerProps } from 'react-native-maps/lib/MapMarker';
import type { MapViewProps as RNMapViewProps } from 'react-native-maps/lib/MapView';

/**
 * All components on snack.expo.dev are stripped of their their identifying features (.name, .type, etc)
 * This creates an issue due to not being able determine which child component is of type 'Callout'/'Marker' etc
 *
 * To overcome this, this adds a prop that can provide this distinction even with all the stripped identifying features
 *
 * Add '/// <reference types="@teovilla/react-native-web-maps/dist/typescript/override-types-snack" />'
 * in the app.d.ts file of the app to get overriden types
 */

declare module 'react-native-maps' {
  //@ts-ignore gets rid of 'Duplicate indetfier' error
  export interface MapCalloutProps extends RNMapCalloutProps {
    isCallout: true;
  }
  //@ts-ignore gets rid of 'Duplicate indetfier' error
  export interface MapMarkerProps extends RNMapMarkerProps {
    isMarker: true;
  }
  // See override-types.ts
  //@ts-ignore gets rid of 'Duplicate indetfier' error
  export interface MapViewProps extends RNMapViewProps {
    googleMapsApiKey?: string;
    googleMapsMapId?: string;
    loadingFallback?: JSX.Element;
    options?: google.maps.MapOptions;
  }
}
