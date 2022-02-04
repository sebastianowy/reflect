import { Type } from './Type';

export function getClassPropertiesMetadatas<TMetadata = unknown>(metadataKey: string, target: Type): Array<{ descriptor: PropertyDescriptor; propertyName: string; metadata: TMetadata; }> {
  const propertiesNames = Object.getOwnPropertyNames(target.prototype);
  return propertiesNames.reduce((arr, propertyName) => {
    const descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, propertyName);
    if (descriptor?.value) {
      const methodMetadata = Reflect.getMetadata(metadataKey, descriptor.value);
      if (methodMetadata) {
        arr.push({
          descriptor,
          propertyName,
          metadata: methodMetadata,
        });
      };
    }
    return arr;
  }, []);
}
