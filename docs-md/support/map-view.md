# `<MapView />` Component API support

## Legend

- Supported ✅
- Not supported ❌
- Needs investigation 🤔
- Planned 🌲

## Props

A

| Prop                              | Status | Notes                                                          |
| --------------------------------- | ------ | -------------------------------------------------------------- |
| `provider`                        | ✅     | Only accepts `google`                                          |
| `region`                          | 🌲     | This is for controlling the map region                         |
| `initialRegion`                   | ✅     |                                                                |
| `initialCamera`                   | ✅     |                                                                |
| `mapPadding`                      | 🤔     |                                                                |
| `paddingAdjustmentBehavior`       | 🤔     |                                                                |
| `liteMode`                        | ❌     |                                                                |
| `mapType`                         | ❌     |                                                                |
| `customMapStyle`                  | 🌲     |                                                                |
| `userInterfaceStyle`              | ❌     |                                                                |
| `showsUserLocation`               | ❌     |                                                                |
| `userLocationPriority`            | ❌     |                                                                |
| `userLocationUpdateInterval`      | ❌     |                                                                |
| `userLocationFastestInterval`     | ❌     |                                                                |
| `userLocationAnnotationTitle`     | ❌     |                                                                |
| `followsUserLocation`             | ❌     |                                                                |
| `userLocationCalloutEnabled`      | ❌     |                                                                |
| `showsMyLocationButton`           | ❌     |                                                                |
| `showsPointsOfInterest`           | ❌     |                                                                |
| `showsCompass`                    | ❌     |                                                                |
| `showsScale`                      | ❌     |                                                                |
| `showsBuildings`                  | ❌     |                                                                |
| `showsTraffic`                    | ❌     |                                                                |
| `showsIndoors`                    | ❌     |                                                                |
| `showsIndoorLevelPicker`          | ❌     |                                                                |
| `zoomEnabled`                     | ✅     |                                                                |
| `zoomTapEnabled`                  | ✅     |                                                                |
| `zoomControlEnabled`              | ✅     |                                                                |
| `minZoomLevel`                    | ✅     |                                                                |
| `maxZoomLevel`                    | ✅     |                                                                |
| `rotateEnabled`                   | ✅     |                                                                |
| `scrollEnabled`                   | 🤔     |                                                                |
| `scrollDuringRotateOrZoomEnabled` | 🤔     |                                                                |
| `pitchEnabled`                    | ✅     |                                                                |
| `toolbarEnabled`                  | ❌     |                                                                |
| `cacheEnabled`                    | ❌     |                                                                |
| `loadingEnabled`                  | ❌     |                                                                |
| `loadingIndicatorColor`           | ❌     |                                                                |
| `loadingBackgroundColor`          | ❌     |                                                                |
| `tintColor`                       | ❌     |                                                                |
| `moveOnMarkerPress`               | ❌     |                                                                |
| `legalLabelInsets`                | 🤔     | I don't think this will be possible but it would be fun to try |
| `kmlSrc`                          | ❌     |                                                                |
| `compassOffset`                   | ❌     |                                                                |
| `isAccessibilityElement`          | ❌     |                                                                |

## Events

To access event data, you will need to use `e.nativeEvent`. For example, `onPress={e => console.log(e.nativeEvent)}` will log the entire event object to your console.

| Event name                | Status |
| ------------------------- | ------ |
| `onMapReady`              | ✅     |
| `onKmlReady`              | ❌     |
| `onRegionChange`          | 🤔     |
| `onRegionChangeComplete`  | 🤔     |
| `onUserLocationChange`    | ❌     |
| `onPress`                 | ✅     |
| `onDoublePress`           | ✅     |
| `onPanDrag`               | 🤔     |
| `onPoiClick`              | 🤔     |
| `onLongPress`             | 🤔     |
| `onMarkerPress`           | ❌     |
| `onMarkerSelect`          | ❌     |
| `onMarkerDeselect`        | ❌     |
| `onCalloutPress`          | ❌     |
| `onMarkerDragStart`       | ❌     |
| `onMarkerDrag`            | ❌     |
| `onMarkerDragEnd`         | ❌     |
| `onIndoorLevelActivated`  | ❌     |
| `onIndoorBuildingFocused` | ❌     |

## Methods

| Method name                 | Status |
| --------------------------- | ------ |
| `getCamera`                 | ✅     |
| `animateCamera`             | ✅     |
| `setCamera`                 | ✅     |
| `animateToRegion`           | ✅     |
| `animateToNavigation`       | ❌     |
| `animateToCoordinate`       | ❌     |
| `animateToBearing`          | ❌     |
| `animateToViewingAngle`     | ❌     |
| `getMapBoundaries`          | ✅     |
| `setMapBoundaries`          | ✅     |
| `setIndoorActiveLevelIndex` | ❌     |
| `fitToElements`             | ❌     |
| `fitToSuppliedMarkers`      | ❌     |
| `fitToCoordinates`          | ✅     |
| `addressForCoordinate`      | 🤔     |
| `pointForCoordinate`        | ✅     |
| `coordinateForPoint`        | ✅     |
| `getMarkersFrames`          | ❌     |
