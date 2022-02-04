import { Type } from './Type';

export function getClassConstructorArgumentsMetadata(metadataKey: string, target: Type) {
  return Reflect.getMetadata(metadataKey, target.constructor) ?? [];
}
