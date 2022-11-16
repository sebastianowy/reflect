import 'reflect-metadata';
import { applyDecorators } from './common/applyDecorators';
import { Framework } from './framework/Framework';
import { FrameworkConstructorParam } from './framework/FrameworkConstructorParam';
import { FrameworkMethod } from './framework/FrameworkMethod';
import { getClassConstructorParamsMetadata } from './common/getClassConstructorParamsMetadata';
import { getClassMetadata } from './common/getClassMetadata';
import { getClassMethodsMetadatas } from './common/getClassMethodsMetadatas';
import { Type } from './common/Type';
import { getClassMethodParamsMetadata } from './common/getClassMethodParamsMetadata';
import { FrameworkMethodParam } from './framework/FrameworkMethodParam';
import { inspect } from 'util';
import { clazzes } from './business/Business';
import { Something } from './business/Something';
import { getClassPropertiesMetadatas } from './common/getClassPropertiesMetadatas';
import { FrameworkProperty } from './framework/FrameworkProperty';

const appClazzes: Type[] = clazzes;

appClazzes.forEach(clazz => {
  // Class decorating
  const clazzMeta = getClassMetadata('classKey', clazz);
  if (clazzMeta) {
    applyDecorators(Framework(clazzMeta))(clazz);
  }
  const frameworkClazzMeta = getClassMetadata('frameworkKey', clazz);

  // Constructor args decorating
  const constructorParamsMeta = Object.values<any>(getClassConstructorParamsMetadata('argKey', clazz));
  constructorParamsMeta.forEach(argMeta => applyDecorators(FrameworkConstructorParam(argMeta.metadataValue))(clazz, undefined, argMeta.index));
  const frameworkConstructorParamsMeta = Object.values(getClassConstructorParamsMetadata('frameworkArgKey', clazz));

  // Class properties decorating
  const propertiesMeta = getClassPropertiesMetadatas<string>('propertyKey', clazz);
  const propertiesMetaToLog = propertiesMeta
    .map(({ metadata, propertyName }) => ({ propertyName, metadata }));
    propertiesMeta.forEach(({ metadata, propertyName }) => {
    applyDecorators(FrameworkProperty(metadata))(clazz.prototype, propertyName);
  });
  const frameworkPropertiesMeta = getClassPropertiesMetadatas('frameworkPropertyKey', clazz)
    .reduce((arr, { metadata, propertyName }) => {
      arr.push({ propertyName, metadata });
      return arr;
    }, []);

  // Class methods decorating
  const methodsMeta = getClassMethodsMetadatas<string>('methodKey', clazz);
  const methodsMetaToLog = methodsMeta
    .map(({ metadata, methodName: propertyName }) => ({ propertyName, metadata }));
  methodsMeta.forEach(({ descriptor, metadata, methodName }) => {
    applyDecorators(FrameworkMethod(metadata))(clazz, methodName, descriptor);
  });
  const frameworkMethodsMeta = getClassMethodsMetadatas('frameworkMethodKey', clazz)
    .reduce((arr, { descriptor, metadata, methodName }) => {
      arr.push({ propertyName: methodName, metadata });
      return arr;
    }, []);

  // Class methods' arguments decorating
  const methodsParamsMeta = Object.getOwnPropertyNames(clazz.prototype).map((methodName) => {
    const methodParamsMetadata = Object.values<any>(getClassMethodParamsMetadata('methodArgKey', clazz, methodName));
    return { methodName, methodParamsMetadata };
  }).filter(({ methodParamsMetadata }) => methodParamsMetadata.length);

  methodsParamsMeta.forEach(({ methodName, methodParamsMetadata }) => {
    methodParamsMetadata.forEach(methodArgumentMetadata => {
      applyDecorators(FrameworkMethodParam(methodArgumentMetadata.metadataValue.param, methodArgumentMetadata.metadataValue.transform))(clazz.prototype, methodName, methodArgumentMetadata.index);
    });
  });

  const frameworkMethodsParamsMeta = Object.getOwnPropertyNames(clazz.prototype).map((methodName) => {
    const methodParamsMetadata = Object.values(getClassMethodParamsMetadata('frameworkParamKey', clazz, methodName));
    return { methodName, methodParamsMetadata };
  }).filter(({ methodParamsMetadata }) => methodParamsMetadata.length);

  console.log('# Business');
  console.log(`${clazz.name}: ${JSON.stringify(clazzMeta)}`);
  console.log(`${clazz.name} constructor params: ${JSON.stringify(constructorParamsMeta)}`);
  console.log(`${clazz.name} properties: ${JSON.stringify(propertiesMetaToLog)}`);
  console.log(`${clazz.name} methods: ${JSON.stringify(methodsMetaToLog)}`);
  console.log(`${clazz.name} methods params: ${inspect(methodsParamsMeta, { depth: 10 })}`);

  console.log('# Frameworked');
  console.log(`${clazz.name}: ${JSON.stringify(frameworkClazzMeta)}`);
  console.log(`${clazz.name} constructor params: ${JSON.stringify(frameworkConstructorParamsMeta)}`);
  console.log(`${clazz.name} properties: ${JSON.stringify(frameworkPropertiesMeta)}`);
  console.log(`${clazz.name} methods: ${JSON.stringify(frameworkMethodsMeta)}`);
  console.log(`${clazz.name} methods params: ${inspect(frameworkMethodsParamsMeta, { depth: 10 })}`);
});

// use the class to make the magic happen
Something.name;