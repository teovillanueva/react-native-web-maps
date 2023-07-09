import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import type { UserLocationChangeEvent } from 'react-native-maps';

interface UseUserLocationOptions {
  requestPermission: boolean;
  onUserLocationChange?(e: UserLocationChangeEvent): void;
  followUserLocation: boolean;
  showUserLocation: boolean;
}

export function useUserLocation(options: UseUserLocationOptions) {
  const [location, setLocation] = useState<Location.LocationObject>();

  const [watchPositionSubscription, setWatchPositionSubscription] =
    useState<Location.LocationSubscription>();

  const [permission] = Location.useForegroundPermissions({
    request: options.requestPermission,
    get: options.showUserLocation,
  });

  const handleLocationChange = useCallback(
    function (e: Location.LocationObject) {
      setLocation(e);
      options.onUserLocationChange?.({
        nativeEvent: {
          coordinate: {
            ...e.coords,
            timestamp: Date.now(),
            altitude: e.coords.altitude || 0,
            heading: e.coords.heading || 0,
            accuracy: e.coords.accuracy || Location.Accuracy.Balanced,
            isFromMockProvider: e.mocked || false,
            speed: e.coords.speed || 0,
          },
        },
      } as unknown as UserLocationChangeEvent);
    },
    [options.onUserLocationChange]
  );

  useEffect(() => {
    if (permission?.granted && options.followUserLocation) {
      Location.getCurrentPositionAsync().then(handleLocationChange);
      // Watch position
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced },
        handleLocationChange
      ).then(setWatchPositionSubscription);
    }

    return () => watchPositionSubscription?.remove();
  }, [permission, options.followUserLocation]);

  return location;
}
