---
sidebar_position: 3
title: Callout ✅
---

## Legend

- Supported ✅
- Not supported ❌
- Needs investigation 🤔
- Planned 🌲

## Props

| Prop           | Status |
| -------------- | ------ |
| `tooltip`      | ✅     |
| `alphaHitTest` | ❌     |

## Events

To access event data, you will need to use `e.nativeEvent`. For example, `onPress={e => console.log(e.nativeEvent)}` will log the entire event object to your console.

| Event Name | Status |
| ---------- | ------ |
| `onPress`  | ✅     |
