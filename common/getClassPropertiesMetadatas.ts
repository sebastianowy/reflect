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
    const propertyMetadata = Reflect.getMetadata(
      metadataKey,
      target.prototype,
      propertyName
    );
    if (propertyMetadata === undefined) {
      return arr;
    }
    arr.push({
      propertyName,
      metadata: propertyMetadata,
    });
    return arr;
  }, []);
}
