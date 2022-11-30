import { Type } from './Type';

export function getClassConstructorParamsMetadata(metadataKey: string, target: Type) {
  return Reflect.getMetadata(metadataKey, target.constructor) ?? [];
}
