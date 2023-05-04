import { Platform } from 'react-native';
import type { MarkerProps } from 'react-native-maps';

// react-native-maps's Native Marker Component
/* 
Only imported when not on web
----------------------------------------------------
This overcomes an issue when loaded in Web Mode on https://snack.expo.dev/

On Snack, react-native's UIManager is undefined, and is used in this file in 'react-native-maps'
https://github.com/react-native-maps/react-native-maps/blob/master/src/decorateMapComponent.ts
Causing 'UIManager.getViewManagerConfig is not a function' error

Not importing in 'react-native-maps' while on web prevents this file from running, and stops the issue.
Possibly fixed when this issue is fixed: https://github.com/react-native-maps/react-native-maps/issues/4383
*/
let Marker: React.ElementType<MarkerProps>;

if (Platform.OS !== 'web') {
  Marker = require('react-native-maps').Marker;
}

export { Marker };
