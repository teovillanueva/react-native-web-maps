import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import type {
  Address,
  Camera,
  EdgePadding,
  LatLng,
  MapEvent,
  MapViewProps,
  Point,
  Region,
  SnapshotOptions,
} from 'react-native-maps';
import type RNMapView from 'react-native-maps';
import { transformRNCameraObject } from '../utils/camera';
import {
  logMethodNotImplementedWarning,
  logDeprecationWarning,
} from '../utils/log';

function _MapView(props: MapViewProps, ref: ForwardedRef<Partial<RNMapView>>) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: props.googleMapsApiKey || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

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
        map?.panTo({ lat: region.latitude, lng: region.longitude });
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
        logMethodNotImplementedWarning('addressForCoordinate');
        return null as unknown as Address;
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

  const _onMapReady = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      props.onMapReady?.();
    },
    [props.onMapReady]
  );

  if (props.provider !== 'google') {
    console.warn(
      '[WARNING] `react-native-web-maps` only suppots google for now. Please pass "google" as provider in props'
    );

    return null;
  }

  return isLoaded ? (
    <GoogleMap
      onLoad={_onMapReady}
      mapContainerStyle={{ flex: 1 }}
      zoom={props.initialCamera?.zoom || 3} // TODO: Normalize value
      heading={props.initialCamera?.heading}
      tilt={props.initialCamera?.pitch}
      onClick={(e) =>
        props.onPress?.({
          nativeEvent: {
            action: 'press',
            position: map
              ?.getProjection()
              ?.fromLatLngToPoint(e.latLng || { lat: 0, lng: 0 }) || {
              x: 0,
              y: 0,
            },
            coordinate: {
              latitude: e.latLng?.lat() || 0,
              longitude: e.latLng?.lng() || 0,
            },
          },
        } as MapEvent<{}>)
      }
      onDblClick={(e) =>
        props.onDoublePress?.({
          nativeEvent: {
            action: 'press',
            position: map
              ?.getProjection()
              ?.fromLatLngToPoint(e.latLng || { lat: 0, lng: 0 }) || {
              x: 0,
              y: 0,
            },
            coordinate: {
              latitude: e.latLng?.lat() || 0,
              longitude: e.latLng?.lng() || 0,
            },
          },
        } as MapEvent<{}>)
      }
      center={{
        lat:
          props.initialCamera?.center.latitude ||
          props.initialRegion?.latitude ||
          0,
        lng:
          props.initialCamera?.center.longitude ||
          props.initialRegion?.longitude ||
          0,
      }}
      options={{
        scrollwheel: props.zoomEnabled,
        disableDoubleClickZoom: !props.zoomTapEnabled,
        zoomControl: props.zoomControlEnabled,
        rotateControl: props.rotateEnabled,
        minZoom: props.minZoomLevel, // TODO: Normalize value
        maxZoom: props.maxZoomLevel, // TODO: Normalize value
      }}
    >
      {props.children}
    </GoogleMap>
  ) : (
    props.loadingFallback || null
  );
}

export const MapView = memo(forwardRef(_MapView));
