import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [permission] = Location.useForegroundPermissions({ request: true });
  const [position, setPosition] = useState<Location.LocationObject>();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      if (permission?.granted) {
        const currentPosition = await Location.getCurrentPositionAsync();

        setPosition(currentPosition);

        mapRef.current?.animateCamera({
          center: currentPosition.coords,
          zoom: 16,
        });
      }
    })();
  }, [permission?.granted]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        initialRegion={{
          latitude: 1,
          latitudeDelta: 0,
          longitude: 1,
          longitudeDelta: 0,
        }}
        loadingFallback={
          <View>
            <Text>Loading</Text>
          </View>
        }
        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY_HERE"
      >
        {position && (
          <>
            <Marker
              coordinate={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }}
            />
            <Circle
              center={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }}
              radius={100}
            />
          </>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
