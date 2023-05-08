import type { MapViewProps as RNMapViewProps } from 'react-native-maps/lib/MapView';

/**
 * Declartion merging is not possible with the latest version of react-native-maps
 * due to the usage of type aliases instead of interfaces for the types
 *
 * This is an imperfect solution that converts the type alias to an interface with additional props
 * Drawback: Does not update the declartion of the unerlying MapView component to use this new interface
 */

declare module 'react-native-maps' {
  //@ts-ignore
  export interface MapViewProps extends RNMapViewProps {
    googleMapsApiKey?: string;
    googleMapsMapId?: string;
    loadingFallback?: JSX.Element;
    options?: google.maps.MapOptions;
  }
}
