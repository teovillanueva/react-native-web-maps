---
sidebar_position: 3
title: Clustering
---

This feature has not been fully tested. Therefore I wouldn't really recommend it for production use yet. But it does work pretty good 😅. It uses [Supercluster](https://github.com/mapbox/supercluster) under the hood.

## Props

| Prop            | Type                                        | Notes                                                                                                   |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `region`        | `Region`                                    | The region being displayed by the map                                                                   |
| `children`      | `React.ReactElement[]`                      | All childs must be of type `<Marker />`                                                                 |
| `renderCluster` | `(props: ClusterProps<{}>) => JSX.Element;` | This is optional, if you want you can leave it blank and the default cluster component will be rendered |

## Types

```ts
// #ref: https://github.com/react-native-maps/react-native-maps/blob/master/index.d.ts#L24
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type ClusterProps<P extends object = {}> = {
  pointCount: number;
  pointCountAbbreviated: number | string;
  coordinate: LatLng;
  expansionZoom: number;
} & P;
```

## Example

```tsx
import { ClusterProps, MarkerClusterer } from '@teovilla/react-native-web-maps';

const POINTS = [
  {
    latitude: 59.33956246905637,
    longitude: 18.050015441134114,
  },
  {
    latitude: 59.3442016958775,
    longitude: 18.038256636812825,
  },
];

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

export default function ClusteringExample() {
  const [region, setRegion] = useState<Region | null>(null);

  const mapRef = useRef<MapView>(null);

  return (
    <MapView
      ref={mapRef}
      onRegionChange={setRegion}
      // ... other props
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
        {POINTS.map((point, idx) => (
          <Marker key={idx} coordinate={point} />
        ))}
      </MarkerClusterer>
    </MapView>
  );
}

const styles = StyleSheet.create({
  cluster: {
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 999,
  },
  clusterText: {
    fontWeight: '700',
  },
});
```
