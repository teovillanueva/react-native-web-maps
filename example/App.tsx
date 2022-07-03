import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MOCK_POSITION = false;
const SHOW_LOCATION_BUBBLE = false;

export default function App() {
  const [permission] = Location.useForegroundPermissions({ request: true });
  const [position, setPosition] = useState<Location.LocationObject | null>(
    MOCK_POSITION
      ? ({
          coords: {
            latitude: 55.59088363323221,
            longitude: 13.005720334671018,
          },
          timestamp: Date.now(),
        } as Location.LocationObject)
      : null
  );

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!MOCK_POSITION && permission?.granted) {
      Location.getCurrentPositionAsync().then(setPosition);
    }
  }, [permission?.granted]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        onPress={(e) => console.log(e.nativeEvent)}
        style={{ flex: 1 }}
        showsUserLocation
        onUserLocationChange={(e) =>
          mapRef.current?.animateCamera({
            center: e.nativeEvent.coordinate,
            zoom: 16,
          })
        }
        loadingFallback={
          <View>
            <Text>Loading</Text>
          </View>
        }
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      >
        {SHOW_LOCATION_BUBBLE && position && (
          <>
            <Marker
              anchor={{ x: 0.5, y: 1 }}
              coordinate={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999,
                  backgroundColor: 'salmon',
                  position: 'relative',
                  zIndex: 19,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    width: 10,
                    height: 10,
                    backgroundColor: 'salmon',
                    zIndex: 20,
                    bottom: -5,
                    alignSelf: 'center',
                    transform: [{ rotate: '45deg' }],
                  }}
                ></View>
                <Text>You are here</Text>
              </View>
              {Platform.select({ native: <View style={{ height: 7 }}></View> })}
            </Marker>
            <Circle
              center={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }}
              fillColor="rgba(0,0,0,0.5)"
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
