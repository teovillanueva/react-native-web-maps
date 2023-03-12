import type { ClusterProps, MarkerClustererProps } from './types';

import React, { memo, ReactElement, useMemo, useState } from 'react';
import { getBoundByRegion } from '../../utils/region';
import type { MarkerProps } from 'react-native-maps';
import { Cluster } from './cluster';
import Supercluster from 'supercluster';

function _MarkerClusterer(props: MarkerClustererProps) {
  const [supercluster, _setSupercluster] = useState<
    Supercluster<{ node: JSX.Element; cluster: boolean }>
  >(new Supercluster());

  const markers = useMemo(
    () =>
      (React.Children.toArray(props.children).filter((child) => {
        return (
          ((child as ReactElement).type as Function).name === 'Marker' ||
          ((child as ReactElement).type as Function).name === 'MapMarker'
        );
      }) as ReactElement<MarkerProps>[]) || [],
    [props.children]
  );

  const points = useMemo<
    Supercluster.PointFeature<{ node: JSX.Element; cluster: boolean }>[]
  >(
    () =>
      markers.map((node) => ({
        type: 'Feature',
        properties: { cluster: false, node },
        geometry: {
          type: 'Point',
          coordinates: [
            Number(node.props.coordinate.longitude),
            Number(node.props.coordinate.latitude),
          ],
        },
      })),
    [markers]
  );

  const clusters = useMemo(() => {
    if (!props.region) return [];

    const bbox = getBoundByRegion(props.region);

    supercluster.load(points);

    return supercluster.getClusters(
      bbox,
      Math.round(Math.log(360 / props.region.longitudeDelta) / Math.LN2)
    );
  }, [props.region, points]);

  return (
    <>
      {clusters.map((feature, idx) => {
        const clusterProperties =
          feature.properties as Supercluster.ClusterProperties;

        const clusterProps: ClusterProps = {
          expansionZoom: supercluster.getClusterExpansionZoom(
            clusterProperties.cluster_id
          ),
          pointCount: clusterProperties.point_count,
          pointCountAbbreviated: clusterProperties.point_count_abbreviated,
          coordinate: {
            longitude: feature.geometry.coordinates[0]!,
            latitude: feature.geometry.coordinates[1]!,
          },
        };

        return (
          <React.Fragment key={idx.toString()}>
            {feature.properties.cluster === true
              ? props.renderCluster?.(clusterProps) || (
                  <Cluster {...clusterProps} />
                )
              : feature.properties.node}
          </React.Fragment>
        );
      })}
    </>
  );
}

export const MarkerClusterer = memo(_MarkerClusterer);
