import { Type } from "./Type";

export function getClassPropertiesMetadatas<TMetadata = unknown>(
  metadataKey: string | symbol,
  target: Type
): Array<{
  propertyName: string;
  metadata: TMetadata;
}> {
  const propertiesNames = Object.getOwnPropertyNames(target.prototype);
  return propertiesNames.reduce((arr, propertyName) => {
    const methodMetadata = Reflect.getMetadata(
      metadataKey,
      target.prototype,
      propertyName
    );
    if (methodMetadata === undefined) {
      return arr;
    }
    arr.push({
      propertyName,
      metadata: methodMetadata,
    });
    return arr;
  }, []);
}
