export function FrameworkConstructorParam<T = any>(token: T): ParameterDecorator {
  return (target: object, key: string | symbol, index) => {
    const properties = Reflect.getMetadata('frameworkArgKey', target.constructor) ?? {};

    properties[index] = { token, index };
    Reflect.defineMetadata(
      'frameworkArgKey',
      properties,
      target.constructor
    );
  };
}
