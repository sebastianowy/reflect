
export function FrameworkConstructorArg<T = any>(token: T): ParameterDecorator {
  return (target: object, key: string | symbol) => {
    let properties = Reflect.getMetadata('frameworkArgKey', target.constructor) || [];

    properties = [...properties, { key, token }];
    Reflect.defineMetadata(
      'frameworkArgKey',
      properties,
      target.constructor
    );
  };
}
