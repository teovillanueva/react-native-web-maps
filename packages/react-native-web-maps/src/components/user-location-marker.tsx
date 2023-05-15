import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from './marker';
import type { LocationObjectCoords } from 'expo-location';

interface UserLocationMarkerProps {
  coordinates: LocationObjectCoords;
}

export function UserLocationMarker(props: UserLocationMarkerProps) {
  return (
    <Marker coordinate={props.coordinates} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.container} />
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1380FF',
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});
