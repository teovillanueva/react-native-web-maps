---
title: Next.js
---

```js
// next.config.js

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native-maps': '@teovilla/react-native-web-maps',
    };

    return config;
  },
};
```
