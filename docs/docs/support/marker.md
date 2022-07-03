---
sidebar_position: 2
title: Marker ✅
---

## Legend

- Supported ✅
- Not supported ❌
- Needs investigation 🤔
- Planned 🌲

## Props

| Prop                      | Status |
| ------------------------- | ------ |
| `title`                   | ✅     |
| `description`             | ❌     |
| `image`                   | 🌲     |
| `icon`                    | 🌲     |
| `pinColor`                | 🤔     |
| `coordinate`              | ✅     |
| `centerOffset`            | 🤔     |
| `calloutOffset`           | 🤔     |
| `anchor`                  | ✅     |
| `calloutAnchor`           | 🤔     |
| `flat`                    | ❌     |
| `identifier`              | ❌     |
| `rotation`                | ❌     |
| `draggable`               | ✅     |
| `tappable`                | ✅     |
| `tracksViewChanges`       | ❌     |
| `tracksInfoWindowChanges` | ❌     |
| `stopPropagation`         | ❌     |
| `opacity`                 | ✅     |
| `isPreselected`           | 🤔     |
| `key`                     | ✅     |

## Events

To access event data, you will need to use `e.nativeEvent`. For example, `onPress={e => console.log(e.nativeEvent)}` will log the entire event object to your console.

| Event Name       | Status |
| ---------------- | ------ |
| `onPress`        | ✅     |
| `onSelect`       | 🤔     |
| `onDeselect`     | 🤔     |
| `onCalloutPress` | 🤔     |
| `onDragStart`    | ✅     |
| `onDrag`         | ✅     |
| `onDragEnd`      | ✅     |

## Methods

| Method Name                 | Status |
| --------------------------- | ------ |
| `showCallout`               | ❌     |
| `hideCallout`               | ❌     |
| `redrawCallout`             | ❌     |
| `animateMarkerToCoordinate` | ❌     |
| `redraw`                    | ❌     |
