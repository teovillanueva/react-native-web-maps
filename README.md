# @teovilla/react-native-web-maps

Cross platfrom maps for react & react-native

## Installation

```bash
$ yarn add @teovilla/react-native-web-maps
```

## Usage with Expo web / Webpack

For this to work you must alias `react-native-maps` to `@teovilla/react-native-web-maps` in your webpack config.

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

## Documentation

The docs for the project can be found [here](https://teovillanueva.github.io/react-native-web-maps/).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
