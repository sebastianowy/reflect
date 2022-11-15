import 'reflect-metadata';
import { applyDecorators } from './common/applyDecorators';
import { Framework } from './framework/Framework';
import { FrameworkConstructorArg } from './framework/FrameworkConstructorArg';
import { FrameworkMethod } from './framework/FrameworkMethod';
import { getClassConstructorArgumentsMetadata } from './common/getClassConstructorArgumentsMetadata';
import { getClassMetadata } from './common/getClassMetadata';
import { getClassPropertiesMetadatas } from './common/getClassPropertiesMetadatas';
import { Type } from './common/Type';
import { getClassMethodArgumentsMetadata } from './common/getClassMethodArgumentsMetadata';
import { FrameworkParam } from './framework/FrameworkParam';
import { inspect } from 'util';
import { clazzes } from './business/Business';
import { Something } from './app/Something';

const appClazzes: Type[] = clazzes;

appClazzes.forEach(clazz => {
  // Class decorating
  const clazzMeta = getClassMetadata('classKey', clazz);
  if (clazzMeta) {
    applyDecorators(Framework(clazzMeta))(clazz);
  }
  const frameworkClazzMeta = getClassMetadata('frameworkKey', clazz);

  // Constructor args decorating
  const constructorArgsMeta = Object.values<any>(getClassConstructorArgumentsMetadata('argKey', clazz));
  constructorArgsMeta.forEach(argMeta => applyDecorators(FrameworkConstructorArg(argMeta.metadataValue))(clazz, undefined, argMeta.index));
  const frameworkConstructorArgMeta = Object.values(getClassConstructorArgumentsMetadata('frameworkArgKey', clazz));

  // Class properties decorating
  const propertiesMeta = getClassPropertiesMetadatas<string>('methodKey', clazz);
  const propertiesMetaToLog = propertiesMeta
    .map(({ metadata, propertyName }) => ({ propertyName, metadata }));
  propertiesMeta.forEach(({ descriptor, metadata, propertyName }) => {
    applyDecorators(FrameworkMethod(metadata))(clazz, propertyName, descriptor);
  });
  const frameworkPropertiesMeta = getClassPropertiesMetadatas('frameworkMethodKey', clazz)
    .reduce((arr, { descriptor, metadata, propertyName }) => {
      arr.push({ propertyName, metadata });
      return arr;
    }, []);

  // Class methods' arguments decorating
  const methodsArgumentsMeta = Object.getOwnPropertyNames(clazz.prototype).map((methodName) => {
    const methodArgumentsMetadata = Object.values<any>(getClassMethodArgumentsMetadata('methodArgKey', clazz, methodName));
    return { methodName, methodArgumentsMetadata };
  }).filter(({ methodArgumentsMetadata }) => methodArgumentsMetadata.length);

  methodsArgumentsMeta.forEach(({ methodName, methodArgumentsMetadata }) => {
    methodArgumentsMetadata.forEach(methodArgumentMetadata => {
      applyDecorators(FrameworkParam(methodArgumentMetadata.metadataValue.param, methodArgumentMetadata.metadataValue.transform))(clazz.prototype, methodName, methodArgumentMetadata.index);
    });
  });

  const frameworkMethodsArgumentsMeta = Object.getOwnPropertyNames(clazz.prototype).map((methodName) => {
    const methodArgumentsMetadata = Object.values(getClassMethodArgumentsMetadata('frameworkParamKey', clazz, methodName));
    return { methodName, methodArgumentsMetadata };
  }).filter(({ methodArgumentsMetadata }) => methodArgumentsMetadata.length);

  console.log('# Business');
  console.log(`${clazz.name}: ${JSON.stringify(clazzMeta)}`);
  console.log(`${clazz.name} constructor args: ${JSON.stringify(constructorArgsMeta)}`);
  console.log(`${clazz.name} properties: ${JSON.stringify(propertiesMetaToLog)}`);
  console.log(`${clazz.name} methods args: ${inspect(methodsArgumentsMeta, { depth: 10 })}`);

  console.log('# Frameworked');
  console.log(`${clazz.name}: ${JSON.stringify(frameworkClazzMeta)}`);
  console.log(`${clazz.name} constructor args: ${JSON.stringify(frameworkConstructorArgMeta)}`);
  console.log(`${clazz.name} properties: ${JSON.stringify(frameworkPropertiesMeta)}`);
  console.log(`${clazz.name} methods args: ${inspect(frameworkMethodsArgumentsMeta, { depth: 10 })}`);
});

Something.name;