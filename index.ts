import 'reflect-metadata';
import { applyDecorators } from './common/applyDecorators';
import { Business } from './business/Business';
import { BusinessArg } from './business/BusinessArg';
import { Framework } from './framework/Framework';
import { FrameworkArg } from './framework/FrameworkArg';
import { FrameworkMethod } from './framework/FrameworkMethod';
import { getClassConstructorArgumentsMetadata } from './common/getClassConstructorArgumentsMetadata';
import { getClassMetadata } from './common/getClassMetadata';
import { getClassPropertiesMetadatas } from './common/getClassPropertiesMetadatas';
import { Type } from './common/Type';
import { BusinessMethod } from './business/BusinessMethod';
import { BusinessParam } from './business/BusinessParam';

@Business('classKey', 'classValue')
@Business('anotherClassKey', 'anotherClassValue')
class Something {
  private someClassProperty;

  constructor(
    @BusinessArg('argKey', 'argValue')
    someConstructorArgument: string,
  ) { }

  @BusinessMethod('methodKey', 'methodValue')
  someMethod(
    @BusinessParam('methodArgKey', { param: 'methodArgValue', transform: (value) => `${value}-transformed` })
    someMethodArgument: string,
  ) {
    return '';
  }
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
