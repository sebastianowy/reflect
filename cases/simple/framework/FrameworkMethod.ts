export function FrameworkMethod(metadataValue: string): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    Reflect.defineMetadata(
      "frameworkMethodKey",
      { someFunkyFrameworkedValue: metadataValue },
      descriptor.value
    );
    return descriptor;
  };
}
