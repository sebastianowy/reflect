
export function BusinessParam<K = string, V = unknown>(
  metadataKey: K,
  metadataValue: V
): ParameterDecorator {
  return (target, key, index) => {
    const args = Reflect.getMetadata(metadataKey, target.constructor, key) ?? [];

    args.push({ index, metadataValue });

    Reflect.defineMetadata(
      metadataKey,
      args,
      target.constructor,
      key
    );
  };
}
