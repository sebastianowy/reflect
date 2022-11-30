
export function applyDecorators(
  ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator>
) {
  return <TFunction extends Function, Y>(
    target: TFunction | object,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<Y> | number,
  ) => {
    for (const decorator of decorators) {
      if (target instanceof Function && descriptor === undefined) {
        (decorator as ClassDecorator)(target);
        continue;
      }
      if (typeof descriptor === 'number') {
        (decorator as ParameterDecorator)(
          target,
          propertyKey,
          descriptor,
        );
        continue;
      }
      (decorator as MethodDecorator | PropertyDecorator)(
        target,
        propertyKey,
        descriptor
      );
    }
  };
}
