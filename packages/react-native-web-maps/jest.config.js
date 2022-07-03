const path = require('path');

module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleDirectories: [
    path.resolve(__dirname, '../../node_modules'),
    path.join(__dirname, 'node_modules'),
    __dirname,
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
