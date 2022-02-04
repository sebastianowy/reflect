export function Business<K = string, V = any>(metadataKey: K,
  metadataValue: V): ClassDecorator {
  const decoratorFactory = (target: object): any => {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    return target;
  };
  return decoratorFactory;
}
