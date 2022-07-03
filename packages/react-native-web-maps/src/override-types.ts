import 'react-native-maps';

declare module 'react-native-maps' {
  export interface MapViewProps {
    googleMapsApiKey?: string;
    googleMapsMapId?: string;
    loadingFallback?: JSX.Element;
    options?: google.maps.MapOptions;
  }
}
