
export function BusinessConstructorArg<K = string, V = any>(metadataKey: K,
  metadataValue: V): ParameterDecorator {
  return (target: object, key: string | symbol | undefined, index: number) => {
    const properties = Reflect.getMetadata(metadataKey, target.constructor) ?? {};

    properties[index] = { index, metadataValue };
    Reflect.defineMetadata(
      metadataKey,
      properties,
      target.constructor
    );
  };
}
