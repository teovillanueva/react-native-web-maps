const { createWebpackConfigAsync } = require('expo-yarn-workspaces/webpack');

module.exports = async function (env, argv) {
  const config = await createWebpackConfigAsync(env, argv);

  config.resolve.alias['react-native-maps'] = '@teovilla/react-native-web-maps';

  return config;
};
