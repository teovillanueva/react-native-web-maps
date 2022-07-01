import type { Camera } from 'react-native-maps';

export function transformRNCameraObject(
  camera: Partial<Camera>
): google.maps.CameraOptions {
  return {
    tilt: camera.pitch,
    heading: camera.heading,
    zoom: camera.zoom,
    center: camera.center
      ? {
          lat: camera.center?.latitude,
          lng: camera.center?.longitude,
        }
      : undefined,
  };
}
