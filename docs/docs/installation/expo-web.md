---
title: Expo Web
---

```js
// webpack.config.js

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias['react-native-maps'] = '@teovilla/react-native-web-maps';

  return config;
};
```

## Working with Expo Snack

If you plan to use this library in Expo Snack, then there additional steps required. First, override the types using the following instead of the one mentioned in the [Getting Started](../getting-started) section:

```ts
/// <reference types="@teovilla/react-native-web-maps/dist/typescript/override-types-snack" />
```

Then, whenever you add a `Marker` or `Callout` component, make sure to include the props `isMarker` or `isCallout` to the added component. In the case of using typescript, the overriden types will warn you if you forget to add the prop.
