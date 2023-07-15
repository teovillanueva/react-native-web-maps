# @teovilla/react-native-web-maps

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://greener.bio"><img src="https://avatars.githubusercontent.com/u/41754896?v=4?s=100" width="100px;" alt="Teodoro Villanueva"/><br /><sub><b>Teodoro Villanueva</b></sub></a><br /><a href="#maintenance-teovillanueva" title="Maintenance">🚧</a> <a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=teovillanueva" title="Documentation">📖</a> <a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=teovillanueva" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/artalat"><img src="https://avatars.githubusercontent.com/u/295630?v=4?s=100" width="100px;" alt="Abdul Rehman Talat"/><br /><sub><b>Abdul Rehman Talat</b></sub></a><br /><a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=artalat" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tobysmith"><img src="https://avatars.githubusercontent.com/u/1110053?v=4?s=100" width="100px;" alt="Toby Smith"/><br /><sub><b>Toby Smith</b></sub></a><br /><a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=tobysmith" title="Documentation">📖</a> <a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=tobysmith" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/YoussefHenna"><img src="https://avatars.githubusercontent.com/u/58384527?v=4?s=100" width="100px;" alt="Youssef Henna"/><br /><sub><b>Youssef Henna</b></sub></a><br /><a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=YoussefHenna" title="Documentation">📖</a> <a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=YoussefHenna" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sreuter"><img src="https://avatars.githubusercontent.com/u/550246?v=4?s=100" width="100px;" alt="Sascha Reuter"/><br /><sub><b>Sascha Reuter</b></sub></a><br /><a href="https://github.com/teovillanueva/react-native-web-maps/commits?author=sreuter" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
