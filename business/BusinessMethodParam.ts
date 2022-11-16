
export function BusinessMethodParam<K = string, V = unknown>(
  metadataKey: K,
  metadataValue: V
): ParameterDecorator {
  return (target, key, index) => {
    const args = Reflect.getMetadata(metadataKey, target.constructor, key) ?? {};

    args[index] = { index, metadataValue };

    Reflect.defineMetadata(
      metadataKey,
      args,
      target.constructor,
      key
    );
  };
}
