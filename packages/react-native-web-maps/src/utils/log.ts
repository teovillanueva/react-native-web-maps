export function logDeprecationWarning(methodName: string) {
  console.warn(
    `[WARNING] Method ${methodName} is deprecated therefore not implemented. Check https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md#types`
  );
}

export function logMethodNotImplementedWarning(methodName: string) {
  console.warn(`[WARNING] Method ${methodName} is not implemented on web`);
}
