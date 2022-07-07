import type { BBox } from 'geojson';
import type { Region } from 'react-native-maps';

/**
 * Code taken from https://github.com/react-native-maps/react-native-maps/issues/356
 * Solution by https://github.com/MatsMaker
 */

export const getBoundByRegion = (region: Region, scale = 1): BBox => {
  /*
   * Latitude : max/min +90 to -90
   * Longitude : max/min +180 to -180
   */
  // Of course we can do it mo compact but it wait is more obvious
  const calcMinLatByOffset = (lng: number, offset: number) => {
    const factValue = lng - offset;
    if (factValue < -90) {
      return (90 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLatByOffset = (lng: number, offset: number) => {
    const factValue = lng + offset;
    if (90 < factValue) {
      return (90 - offset) * -1;
    }
    return factValue;
  };

  const calcMinLngByOffset = (lng: number, offset: number) => {
    const factValue = lng - offset;
    if (factValue < -180) {
      return (180 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLngByOffset = (lng: number, offset: number) => {
    const factValue = lng + offset;
    if (180 < factValue) {
      return (180 - offset) * -1;
    }
    return factValue;
  };

  const latOffset = (region.latitudeDelta / 2) * scale;
  const lngD =
    region.longitudeDelta < -180
      ? 360 + region.longitudeDelta
      : region.longitudeDelta;
  const lngOffset = (lngD / 2) * scale;

  // bounds.nw.lng,
  //           bounds.se.lat,
  //           bounds.se.lng,
  //           bounds.nw.lat

  return [
    calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
    calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
    calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
    calcMaxLatByOffset(region.latitude, latOffset), // northLat - max lat
  ];
};
