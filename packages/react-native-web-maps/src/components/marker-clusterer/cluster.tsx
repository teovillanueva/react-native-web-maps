import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import type { MarkerProps } from 'react-native-maps';
import type { ClusterProps } from './types';

/* 
Only import react-native-maps Marker when not on web
----------------------------------------------------
This overcomes an issue when loaded in Web Mode on https://snack.expo.dev/

On Snack, react-native's UIManager is undefined, and is used in this file in 'react-native-maps'
https://github.com/react-native-maps/react-native-maps/blob/master/src/decorateMapComponent.ts
Causing 'UIManager.getViewManagerConfig is not a function' error

Not importing in 'react-native-maps' anywhere while on web prevents this file from running, and stops the issue.
Possibly fixed when this issue is fixed: https://github.com/react-native-maps/react-native-maps/issues/4383
*/
let Marker: React.ElementType<MarkerProps>;

if (Platform.OS === 'web') {
  Marker = require('../marker').Marker;
} else {
  Marker = require('react-native-maps').Marker;
}

export function Cluster(props: ClusterProps) {
  return (
    <Marker coordinate={props.coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.pointCountAbbreviated}</Text>
      </View>
    </Marker>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: '#1380FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
