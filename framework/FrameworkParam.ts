
export function FrameworkParam(
  param,
  transform: Function
): ParameterDecorator {
  return (target, key, index) => {
    const args = Reflect.getMetadata('frameworkParamKey', target.constructor, key) ?? [];

    args.push({ param, transform });

    Reflect.defineMetadata(
      'frameworkParamKey',
      args,
      target.constructor,
      key
    );
  };
}
