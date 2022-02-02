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
    Reflect.defineMetadata('frameworkMethodKey', { someFunkyFrameworkedValue: metadataValue }, descriptor.value);
    return descriptor;
  };
}

@Business('classKey', 'classValue')
@Business('anotherClassKey', 'anotherClassValue')
class Something {
  private someClassProperty;

  constructor(
    @BusinessArg('argKey', 'argValue')
    someConstructorArgument: string,
  ) { }

  @Business('methodKey', 'methodValue')
  someMethod() {
    return '';
  }
}

function getClassMetadata(metadataKey: string, target: Type) {
  return Reflect.getMetadata(metadataKey, target);
}

function getClassConstructorArgumentsMetadata(metadataKey: string, target: Type) {
  return Reflect.getMetadata(metadataKey, target.constructor) ?? [];
}

function getClassPropertiesMetadatas<TMetadata = unknown>(metadataKey: string, target: Type): Array<{ descriptor: PropertyDescriptor, propertyName: string, metadata: TMetadata }> {
  const propertiesNames = Object.getOwnPropertyNames(target.prototype);
  return propertiesNames.reduce((arr, propertyName) => {
    const descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, propertyName);
    if (descriptor?.value) {
      const methodMetadata = Reflect.getMetadata(metadataKey, descriptor.value);
      if (methodMetadata) {
        arr.push({
          descriptor,
          propertyName,
          metadata: methodMetadata,
        });
      };
    }
    return arr;
  }, []);
}

const clazzes: Type[] = [Something];

clazzes.forEach(clazz => {
  const clazzMeta = getClassMetadata('classKey', clazz);
  if (clazzMeta) {
    applyDecorators(Framework(clazzMeta))(clazz);
  }
  const frameworkClazzMeta = getClassMetadata('frameworkKey', clazz);

  const argsMeta = getClassConstructorArgumentsMetadata('argKey', clazz);
  argsMeta.forEach(argMeta => applyDecorators(FrameworkArg(argMeta))(clazz));
  const frameworkArgMeta = getClassConstructorArgumentsMetadata('frameworkArgKey', clazz);

  const methodsMetadata = getClassPropertiesMetadatas<string>('methodKey', clazz);
  const methodsMeta = methodsMetadata
    .map(({ metadata, propertyName }) => ({ propertyName, metadata }));
  methodsMetadata.forEach(({ descriptor, metadata, propertyName }) => {
    applyDecorators(FrameworkMethod(metadata))(clazz, propertyName, descriptor);
  });
  const frameworkMethodMeta = getClassPropertiesMetadatas('frameworkMethodKey', clazz)
    .reduce((arr, { descriptor, metadata, propertyName }) => {
      arr.push({ propertyName, metadata });
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
