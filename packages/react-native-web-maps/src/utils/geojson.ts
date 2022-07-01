/**
 * This file is taken from `react-native-maps`
 * I guess this has been tested by the creators lol
 * Tried to type it but it's a pain
 * TODO: Type this bs
 * https://github.com/react-native-maps/react-native-maps/blob/master/src/Geojson.js
 */

export const makeOverlays = (features: GeoJSON.Feature[]) => {
  const points = features
    .filter(
      (f) =>
        f.geometry &&
        (f.geometry.type === 'Point' || f.geometry.type === 'MultiPoint')
    )
    .map((feature) =>
      makeCoordinates(feature).map((coordinates) =>
        makeOverlay(coordinates as any, feature)
      )
    )
    .reduce(flatten as any, [])
    .map((overlay) => ({ ...overlay, type: 'point' }));

  const lines = features
    .filter(
      (f) =>
        f.geometry &&
        (f.geometry.type === 'LineString' ||
          f.geometry.type === 'MultiLineString')
    )
    .map((feature) =>
      makeCoordinates(feature).map((coordinates) =>
        makeOverlay(coordinates as any, feature)
      )
    )
    .reduce(flatten as any, [])
    .map((overlay) => ({ ...overlay, type: 'polyline' }));

  const multipolygons = features
    .filter((f) => f.geometry && f.geometry.type === 'MultiPolygon')
    .map((feature) =>
      makeCoordinates(feature).map((coordinates) =>
        makeOverlay(coordinates as any, feature)
      )
    )
    .reduce(flatten as any, []);

  const polygons = features
    .filter((f) => f.geometry && f.geometry.type === 'Polygon')
    .map((feature) => makeOverlay(makeCoordinates(feature) as any, feature))
    .reduce(flatten as any, [])
    .concat(multipolygons as any)
    .map((overlay) => ({ ...(overlay as any), type: 'polygon' }));

  return points.concat(lines).concat(polygons);
};

export const flatten = <T extends []>(prev: T, curr: T) => prev.concat(curr);

export const makeOverlay = (
  coordinates: GeoJSON.Position,
  feature: GeoJSON.Feature
) => {
  let overlay: {
    feature: GeoJSON.Feature;
    coordinates: number | undefined | GeoJSON.Position;
    holes: any;
  } = {
    feature,
  } as any;
  if (
    feature.geometry.type === 'Polygon' ||
    feature.geometry.type === 'MultiPolygon'
  ) {
    overlay.coordinates = coordinates[0];
    if (coordinates.length > 1) {
      overlay.holes = coordinates.slice(1);
    }
  } else {
    overlay.coordinates = coordinates;
  }
  return overlay;
};

export const makePoint = (c: GeoJSON.Position) => ({
  latitude: c[1],
  longitude: c[0],
});

export const makeLine = (l: GeoJSON.Position[]) => l.map(makePoint);

export const makeCoordinates = (feature: GeoJSON.Feature) => {
  const g = feature.geometry;
  if (g.type === 'Point') {
    return [makePoint(g.coordinates)];
  } else if (g.type === 'MultiPoint') {
    return g.coordinates.map(makePoint);
  } else if (g.type === 'LineString') {
    return [makeLine(g.coordinates)];
  } else if (g.type === 'MultiLineString') {
    return g.coordinates.map(makeLine);
  } else if (g.type === 'Polygon') {
    return g.coordinates.map(makeLine);
  } else if (g.type === 'MultiPolygon') {
    return g.coordinates.map((p) => p.map(makeLine));
  } else {
    return [];
  }
};

export const doesOverlayContainProperty = (overlay: any, property: any) => {
  // Geojson may have 0 for the opacity when intention is to not specify the
  // opacity. Therefore, we evaluate the truthiness of the propery where 0
  // would return false.
  return (
    overlay.feature &&
    overlay.feature.properties &&
    overlay.feature.properties[property]
  );
};

export const getRgbaFromHex = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [
    0, 0, 0,
  ];
  return `rgba(${r},${g},${b},${alpha})`;
};

export const getColor = (
  props: any,
  overlay: any,
  colorType: any,
  overrideColorProp: any
) => {
  if (props.hasOwnProperty(overrideColorProp)) {
    return props[overrideColorProp];
  }
  if (doesOverlayContainProperty(overlay, colorType)) {
    let color = overlay.feature.properties[colorType];
    const opacityProperty = colorType + '-opacity';
    if (
      doesOverlayContainProperty(overlay, opacityProperty) &&
      color[0] === '#'
    ) {
      color = getRgbaFromHex(
        color,
        overlay.feature.properties[opacityProperty]
      );
    }
    return color;
  }
  return;
};

export const getStrokeWidth = (props: any, overlay: any) => {
  if (props.hasOwnProperty('strokeWidth')) {
    return props.strokeWidth;
  }
  if (doesOverlayContainProperty(overlay, 'stroke-width')) {
    return overlay.feature.properties['stroke-width'];
  }
  return;
};
