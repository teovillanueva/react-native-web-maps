# @teovilla/react-native-web-maps

Cross platfrom maps for react & react-native

## Installation

```bash
$ yarn add @teovilla/react-native-web-maps
```

## Usage with Expo web / Webpack

For This to work you must alias `react-native-maps` to `@teovilla/react-native-web-maps` in your webpack config.

### Example with Expo Web:

```js
// webpack.config.js

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias['react-native-maps'] = '@teovilla/react-native-web-maps';

  return config;
};
```

### Example with Next.js:

```js
// next.config.js

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native-maps$': '@teovilla/react-native-web-maps',
    };

    return config;
  },
};
```

## API Support

### Components

- `<MapView />` Supported ✅
- `<Marker />` Supported ✅
- `<Callout />` Currently not supported ❌
- `<Polygon />` Supported ✅
- `<Polyline />` Supported ✅
- `<Circle />` Supported ✅
- `<Overlay />` Currently not supported ❌
- `<Heatmap />` Supported ✅
- `<Geojson />` Supported ✅

### MapView ref Api

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
