
export function BusinessArg<K = string, V = any>(metadataKey: K,
  metadataValue: V): ParameterDecorator {
  return (target: object, key: string | symbol, index?: number) => {
    let properties = Reflect.getMetadata(metadataKey, target.constructor) || [];

    properties = [...properties, metadataValue];
    Reflect.defineMetadata(
      metadataKey,
      properties,
      target.constructor
    );
  };
}
