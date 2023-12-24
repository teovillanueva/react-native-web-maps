import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import type { ForwardedRef } from 'react';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type {
  Address,
  Camera,
  EdgePadding,
  LatLng,
  MapViewProps,
  Point,
  Region,
  SnapshotOptions,
} from 'react-native-maps';
import type RNMapView from 'react-native-maps';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';
import { transformRNCameraObject } from '../utils/camera';
import {
  logMethodNotImplementedWarning,
  logDeprecationWarning,
} from '../utils/log';
import { useUserLocation } from '../hooks/use-user-location';
import { UserLocationMarker } from './user-location-marker';
import * as Location from 'expo-location';

function _MapView(props: MapViewProps, ref: ForwardedRef<Partial<RNMapView>>) {
  // State

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isGesture, setIsGesture] = useState<boolean>(false);

  const userLocation = useUserLocation({
    showUserLocation: props.showsUserLocation || false,
    requestPermission:
      props.showsUserLocation || !!props.onUserLocationChange || false,
    onUserLocationChange: props.onUserLocationChange,
    followUserLocation: props.followsUserLocation || false,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: props.googleMapsApiKey || '',
  });

  // Callbacks

  const _onMapReady = useCallback(
    (_map: google.maps.Map) => {
      setMap(_map);
      props.onMapReady?.();
    },
    [map, props.onMapReady]
  );

  const _onDragStart = useCallback(() => {
    setIsGesture(true);
  }, []);

  const _onRegionChange = useCallback(() => {
    const bounds = map?.getBounds();
    if (bounds) {
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const longitudeDelta = Math.abs(northEast.lng() - southWest.lng());
      const latitudeDelta = Math.abs(northEast.lat() - southWest.lat());
      const center = bounds.getCenter();
      props.onRegionChange?.(
        {
          latitude: center.lat(),
          longitude: center.lng(),
          latitudeDelta,
          longitudeDelta,
        },
        { isGesture }
      );
    }
  }, [map, props.onRegionChange, isGesture]);

  const _onRegionChangeComplete = useCallback(() => {
    const bounds = map?.getBounds();
    if (bounds) {
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const longitudeDelta = Math.abs(northEast.lng() - southWest.lng());
      const latitudeDelta = Math.abs(northEast.lat() - southWest.lat());
      const center = bounds.getCenter();
      props.onRegionChangeComplete?.(
        {
          latitude: center.lat(),
          longitude: center.lng(),
          latitudeDelta,
          longitudeDelta,
        },
        { isGesture }
      );
    }
    setIsGesture(false);
  }, [map, props.onRegionChange, isGesture]);

  // Ref handle

  useImperativeHandle(
    ref,
    () => ({
      async getCamera(): Promise<Camera> {
        const center = map?.getCenter();
        return {
          altitude: 0,
          heading: map?.getHeading() || 0,
          pitch: map?.getTilt() || 0, // TODO: Review this
          zoom: map?.getZoom() || 0, // TODO: Normalize value
          center: {
            latitude: center?.lat() || 0,
            longitude: center?.lng() || 0,
          },
        };
      },
      setCamera(camera: Partial<Camera>): void {
        map?.moveCamera(transformRNCameraObject(camera));
      },
      animateCamera(
        camera: Partial<Camera>,
        _opts?: { duration?: number }
      ): void {
        map?.moveCamera(transformRNCameraObject(camera));
      },
      async getMapBoundaries(): Promise<{
        northEast: LatLng;
        southWest: LatLng;
      }> {
        const bounds = map?.getBounds();

        const northEast = bounds?.getNorthEast();
        const southWest = bounds?.getSouthWest();

        return {
          northEast: {
            latitude: northEast?.lat() || 0,
            longitude: northEast?.lng() || 0,
          },
          southWest: {
            latitude: southWest?.lat() || 0,
            longitude: southWest?.lng() || 0,
          },
        };
      },
      animateToRegion(region: Region, _duration?: number): void {
        const bounds = new google.maps.LatLngBounds();

        // Source: https://github.com/react-native-maps/react-native-maps/blob/master/android/src/main/java/com/airbnb/android/react/maps/AirMapView.java#L503

        // southWest
        bounds.extend({
          lat: region.latitude - region.latitudeDelta / 2,
          lng: region.longitude - region.longitudeDelta / 2,
        });

        // northEast
        bounds.extend({
          lat: region.latitude + region.latitudeDelta / 2,
          lng: region.longitude + region.longitudeDelta / 2,
        });

        // panToBounds not working??
        // map?.panToBounds(bounds);
        map?.fitBounds(bounds);
      },
      fitToCoordinates(
        coordinates?: LatLng[],
        options?: { edgePadding?: EdgePadding; animated?: boolean }
      ): void {
        const bounds = new google.maps.LatLngBounds();

        if (coordinates) {
          coordinates?.forEach((c) =>
            bounds.extend({
              lat: c.latitude,
              lng: c.longitude,
            })
          );
        }

        map?.fitBounds(bounds, options?.edgePadding as google.maps.Padding);
      },
      setMapBoundaries(northEast: LatLng, southWest: LatLng): void {
        const bounds = new google.maps.LatLngBounds();

        bounds.extend({ lat: northEast.latitude, lng: northEast.longitude });
        bounds.extend({ lat: southWest.latitude, lng: southWest.longitude });

        map?.fitBounds(bounds);
      },
      async pointForCoordinate(coordinate: LatLng): Promise<Point> {
        const point = map?.getProjection()?.fromLatLngToPoint({
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        });
        return point || { x: 0, y: 0 };
      },
      async coordinateForPoint(point: Point): Promise<LatLng> {
        const coord = map
          ?.getProjection()
          ?.fromPointToLatLng(new google.maps.Point(point.x, point.y));

        return { latitude: coord?.lat() || 0, longitude: coord?.lng() || 0 };
      },
      async takeSnapshot(_options?: SnapshotOptions): Promise<string> {
        logMethodNotImplementedWarning('takeSnapshot');
        return '';
      },
      async addressForCoordinate(_coordinate: LatLng): Promise<Address> {
        Location.setGoogleApiKey(props.googleMapsApiKey || '');
        const [address] = await Location.reverseGeocodeAsync(_coordinate, {
          useGoogleMaps: true,
        });

        return address
          ? {
              administrativeArea: address.region || '',
              country: address.country || '',
              countryCode: address.isoCountryCode || '',
              locality: address.city || '',
              postalCode: address.postalCode || '',
              name: address.name || '',
              subAdministrativeArea: address.subregion || '',
              subLocality: address.city || '',
              thoroughfare: '',
            }
          : (null as unknown as Address);
      },
      animateToNavigation(
        _location: LatLng,
        _bearing: number,
        _angle: number,
        _duration?: number
      ): void {
        logDeprecationWarning('animateToNavigation');
      },
      animateToCoordinate(_latLng: LatLng, _duration?: number): void {
        logDeprecationWarning('animateToCoordinate');
      },
      animateToBearing(_bearing: number, _duration?: number): void {
        logDeprecationWarning('animateToBearing');
      },
      animateToViewingAngle(_angle: number, _duration?: number): void {
        logDeprecationWarning('animateToViewingAngle');
      },
      fitToElements(_options?: {
        edgePadding?: EdgePadding;
        animated?: boolean;
      }): void {
        logMethodNotImplementedWarning('fitToElements');
      },
      fitToSuppliedMarkers(
        _markers: string[],
        _options?: { edgePadding?: EdgePadding; animated?: boolean }
      ): void {
        logMethodNotImplementedWarning('fitToSuppliedMarkers');
      },
      setIndoorActiveLevelIndex(_index: number): void {
        logMethodNotImplementedWarning('setIndoorActiveLevelIndex');
      },
    }),
    [map]
  );

  // Side effects

  useEffect(() => {
    if (props.followsUserLocation && userLocation) {
      map?.panTo({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });
    }
  }, [props.followsUserLocation, userLocation]);

  const mapNode = useMemo(
    () => (
      <GoogleMap
        onLoad={_onMapReady}
        onBoundsChanged={_onRegionChange}
        onDragStart={_onDragStart}
        onDragEnd={_onRegionChangeComplete}
        mapContainerStyle={{ flex: 1 }}
        zoom={props.initialCamera?.zoom || 3}
        heading={props.initialCamera?.heading}
        tilt={props.initialCamera?.pitch}
        onDrag={() => {
          const center = map?.getCenter();

          props.onPanDrag?.(
            mapMouseEventToMapEvent(
              null,
              center && { latitude: center.lat(), longitude: center.lng() },
              map,
              undefined
            )
          );
        }}
        onClick={(e) =>
          props.onPress?.(mapMouseEventToMapEvent(e, null, map, 'press'))
        }
        onDblClick={(e) =>
          props.onDoublePress?.(mapMouseEventToMapEvent(e, null, map, 'press'))
        }
        center={
          map
            ? map.getCenter()
            : {
                lat:
                  props.initialCamera?.center.latitude ||
                  props.initialRegion?.latitude ||
                  0,
                lng:
                  props.initialCamera?.center.longitude ||
                  props.initialRegion?.longitude ||
                  0,
              }
        }
        options={{
          scrollwheel: props.zoomEnabled,
          disableDoubleClickZoom: !props.zoomTapEnabled,
          zoomControl: props.zoomControlEnabled,
          rotateControl: props.rotateEnabled,
          minZoom: props.minZoomLevel, // TODO: Normalize value
          maxZoom: props.maxZoomLevel, // TODO: Normalize value
          scaleControl: props.showsScale,
          styles: props.customMapStyle,
          ...(props.options || {}),
        }}
      >
        {props.showsUserLocation && userLocation && (
          <UserLocationMarker coordinates={userLocation.coords} />
        )}
        {props.children}
      </GoogleMap>
    ),
    [
      _onRegionChange,
      _onMapReady,
      userLocation,
      props.initialCamera,
      props.initialRegion,
      props.showsUserLocation,
      props.onPanDrag,
      props.onPress,
      props.onDoublePress,
      props.zoomEnabled,
      props.zoomTapEnabled,
      props.zoomControlEnabled,
      props.rotateEnabled,
      props.minZoomLevel,
      props.maxZoomLevel,
      props.showsScale,
      props.customMapStyle,
      props.options,
    ]
  );

  if (props.provider !== 'google') {
    console.warn(
      '[WARNING] `react-native-web-maps` only suppots google for now. Please pass "google" as provider in props'
    );

    return null;
  }

  return isLoaded ? (
    React.cloneElement(mapNode)
  ) : (
    <>{props.loadingFallback || null}</>
  );
}

export const MapView = memo(forwardRef(_MapView));
