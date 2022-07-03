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
