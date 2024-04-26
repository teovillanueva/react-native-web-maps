import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CurrentLocationButtonProps {
  onPressCurrentLocation: Function;
}

export function CurrentLocationButton(props: CurrentLocationButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPressCurrentLocation();
      }}
    >
      <View style={styles.locateBtn}>
        <svg
          style={{ fill: '#666' }}
          height="50"
          viewBox="0 0 50 50"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m0 0h48v48h-48z" fill="none" />
          <path d="m44 22h-4.1a16.1 16.1 0 0 0 -13.9-13.9v-4.1a2 2 0 0 0 -4 0v4a16.1 16.1 0 0 0 -13.9 14h-4.1a2 2 0 0 0 0 4h4.1a16.1 16.1 0 0 0 13.9 13.9v4a2 2 0 0 0 4 0v-3.9a16.1 16.1 0 0 0 13.9-14h4.1a2 2 0 0 0 0-4zm-20 14a12 12 0 1 1 12-12 12 12 0 0 1 -12 12z" />
          <circle cx="24" cy="24" r="7" />
        </svg>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locateBtn: {
    display: 'flex',
    width: 40,
    height: 40,
    margin: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 3,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 189,
    alignItems: 'center',
  },
});
