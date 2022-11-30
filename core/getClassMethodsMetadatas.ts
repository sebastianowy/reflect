import { Type } from './Type';

export function getClassMethodsMetadatas<TMetadata = unknown>(metadataKey: string, target: Type): Array<{ descriptor: PropertyDescriptor; methodName: string; metadata: TMetadata; }> {
  const methodsNames = Object.getOwnPropertyNames(target.prototype);
  return methodsNames.reduce((arr, methodName) => {
    const descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, methodName);
    if (descriptor?.value) {
      const methodMetadata = Reflect.getMetadata(metadataKey, descriptor.value);
      if (methodMetadata) {
        arr.push({
          descriptor,
          methodName,
          metadata: methodMetadata,
        });
      };
    }
    return arr;
  }, []);
}
