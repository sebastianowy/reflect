import 'reflect-metadata';

export type CustomDecorator = MethodDecorator & ClassDecorator;


export interface Type<T = any> extends Function {
  new(...args: any[]): T;
}

export function applyDecorators(
  ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
) {
  return <TFunction extends Function, Y>(
    target: TFunction | object,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<Y>,
  ) => {
    for (const decorator of decorators) {
      if (target instanceof Function && !descriptor) {
        (decorator as ClassDecorator)(target);
        continue;
      }
      (decorator as MethodDecorator | PropertyDecorator)(
        target,
        propertyKey,
        descriptor,
      );
    }
  };
}

export const Business = <K = string, V = any>(
  metadataKey: K,
  metadataValue: V,
): CustomDecorator => {
  const decoratorFactory = (target: object, key?: any, descriptor?: any): any => {
    if (descriptor) {
      Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    return target;
  };
  return decoratorFactory;
};

export const BusinessArg = <K = string, V = any>(
  metadataKey: K,
  metadataValue: V,
) => {
  return (target: object, key: string | symbol, index?: number) => {
    let properties =
      Reflect.getMetadata(metadataKey, target.constructor) || [];

    properties = [...properties, metadataValue];
    Reflect.defineMetadata(
      metadataKey,
      properties,
      target.constructor,
    );
  }
};

export function Framework(value?: string) {
  return (target: object) => {
    Reflect.defineMetadata('frameworkKey', value, target);
  };
}

export function FrameworkArg<T = any>(token: T) {
  return (target: object, key: string | symbol) => {
    let properties =
      Reflect.getMetadata('frameworkArgKey', target.constructor) || [];

    properties = [...properties, { key, token }];
    Reflect.defineMetadata(
      'frameworkArgKey',
      properties,
      target.constructor,
    );
  };
}

export function FrameworkMethod(metadataValue: string): MethodDecorator {
    return (
      target: object,
      key: string | symbol,
      descriptor: TypedPropertyDescriptor<any>,
    ) => {
      Reflect.defineMetadata('frameworkMethodKey', metadataValue, descriptor.value);
      return descriptor;
    };
}

@Business('classKey', 'classValue')
@Business('anotherClassKey', 'anotherClassValue')
class Something {
  constructor(
    @BusinessArg('argKey', 'argValue')
    arg: string,
  ) { }

  @Business('methodKey', 'methodValue')
  method() {
    return '';
  }
}

const clazzes: Type[] = [Something];

clazzes.forEach(clazz => {
  const clazzMeta = Reflect.getMetadata('classKey', clazz);
  if (clazzMeta) {
    applyDecorators(Framework(clazzMeta))(clazz);
  }
  const frameworkClazzMeta = Reflect.getMetadata('frameworkKey', clazz);

  const argsMeta = Reflect.getMetadata('argKey', clazz.constructor) ?? [];
  argsMeta.forEach(argMeta => applyDecorators(FrameworkArg(argMeta))(clazz));
  const frameworkArgMeta = Reflect.getMetadata('frameworkArgKey', clazz.constructor);

  const membersNames = Object.getOwnPropertyNames(clazz.prototype);
  const methodsMeta = membersNames.reduce((arr, name) => {
    const meta = Reflect.getMetadata('methodKey', clazz.prototype, name);
    if (meta) {
      arr.push(meta);
    }
    return arr;
  }, []);
  membersNames.forEach(memberName => {
    const descriptor = Reflect.getOwnPropertyDescriptor(clazz.prototype, memberName);
    const meta = Reflect.getMetadata('methodKey', descriptor.value);
    if(meta) {
      applyDecorators(FrameworkMethod(meta))(clazz, memberName, descriptor);
    }
  });
  const frameworkMethodMeta = membersNames.reduce((arr, memberName) => {
    const descriptor = Reflect.getOwnPropertyDescriptor(clazz.prototype, memberName);
    const meta = Reflect.getMetadata('methodKey', descriptor.value);
    if (meta) {
      arr.push(meta);
    }
    return arr;
  }, []);

  console.log('# Business');
  console.log(`${clazz.name}: ${JSON.stringify(clazzMeta)}`);
  console.log(`${clazz.name} args: ${JSON.stringify(argsMeta)}`);
  console.log(`${clazz.name} methods: ${JSON.stringify(methodsMeta)}`);

  console.log('# Frameworked');
  console.log(`${clazz.name}: ${JSON.stringify(frameworkClazzMeta)}`);
  console.log(`${clazz.name} args: ${JSON.stringify(frameworkArgMeta)}`);
  console.log(`${clazz.name} methods: ${JSON.stringify(frameworkMethodMeta)}`);
});
