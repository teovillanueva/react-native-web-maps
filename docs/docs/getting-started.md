---
sidebar_position: 2
title: Getting started
---

## 1. Install the package

```bash
yarn add @teovilla/react-native-web-maps
```

## 2. Alias the package in your Webpack config

You can find how to do this with the following guides

- [With Expo web](/react-native-web-maps/installation/expo-web)
- [With Next.js](/react-native-web-maps/installation/next-js)
- [With plain webpack config](/react-native-web-maps/installation/webpack)

## 3. Actually using it

There are some props that have been added to make this package work and give more customization options for web in some cases. So if you are using Typescript I recommend create a `app.d.ts` file in your project root and adding the following:

```ts
/// <reference types="@teovilla/react-native-web-maps/dist/typescript/override-types" />
```

Now that everything is setup you can start using your maps on web! But there is something else you need to know. Google maps requires an API key for it work on web, so there is one prop that has been added to the `<MapView />` component, it's the `googleMapsApiKey` prop. You should be passing your API key through that prop. There's also something important you should know, this only adds support for maps with `provider="google"` for now. So if you are trying to use Apple maps it will warn you about it.

If you want to edit the loading state of the map you can pass JSX through the `loadingFallback` prop like [this](#quick-example).

## Quick example

```tsx
<MapView
  provider="google"
  googleMapsApiKey="..."
  loadingFallback={
    <View>
      <Text>Loading...</Text>
    </View>
  }
/>
```
