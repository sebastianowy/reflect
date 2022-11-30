export function FrameworkProperty(metadataValue: string): PropertyDecorator {
  return (
    target: object,
    key: string | symbol,
  ) => {
    Reflect.set(target, key, null);
    Reflect.defineMetadata(
      "frameworkPropertyKey",
      { someFunkyFrameworkedValue: metadataValue },
      target,
      key
    );
  };
}
