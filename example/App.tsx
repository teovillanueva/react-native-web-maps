import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ClusterProps, MarkerClusterer } from '@teovilla/react-native-web-maps';
import type { Region } from 'react-native-maps';

function MyClusterComponent(props: ClusterProps<{ onPress(): void }>) {
  return (
    <Marker
      onPress={props.onPress}
      coordinate={props.coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.cluster}>
        <Text style={styles.clusterText}>{props.pointCountAbbreviated}</Text>
      </View>
    </Marker>
  );
}

export default function App() {
  const [region, setRegion] = useState<Region | null>(null);

  const mapRef = useRef<MapView>(null);

  const loadingFallback = useMemo(() => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        style={{ flex: 1 }}
        onRegionChange={setRegion}
        loadingFallback={loadingFallback}
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      >
        <MarkerClusterer
          region={region}
          renderCluster={(cluster) => (
            <MyClusterComponent
              {...cluster}
              onPress={() =>
                mapRef.current?.animateCamera({
                  center: cluster.coordinate,
                  zoom: cluster.expansionZoom + 3,
                })
              }
            />
          )}
        >
          <Marker
            coordinate={{
              latitude: 59.33956246905637,
              longitude: 18.050015441134114,
            }}
          />
          <Marker
            coordinate={{
              latitude: 59.3442016958775,
              longitude: 18.038256636812825,
            }}
          />
        </MarkerClusterer>
        {/* {SHOW_LOCATION_BUBBLE && position && (
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
                {Platform.select({
                  native: <View style={{ height: 7 }}></View>,
                })}
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
          )} */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cluster: {
    backgroundColor: 'salmon',
    width: 20,
    height: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterText: {
    fontWeight: '700',
  },
});
