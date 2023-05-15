import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from '../marker';
import type { ClusterProps } from './types';

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
