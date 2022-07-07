import type React from 'react';
import type { LatLng, Region } from 'react-native-maps';

export type ClusterProps<P extends object = {}> = {
  pointCount: number;
  pointCountAbbreviated: number | string;
  coordinate: LatLng;
  expansionZoom: number;
} & P;

export type MarkerClustererProps = {
  children?: React.ReactElement[];
  region: Region | null;
  renderCluster?(props: ClusterProps<{}>): JSX.Element;
};

export type MarkerClustererHandle = {
  handleRegionChange(region: Region): void;
};
