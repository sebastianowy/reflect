import { Type } from './Type';

export function getClassMetadata(metadataKey: string, target: Type) {
  return Reflect.getMetadata(metadataKey, target);
}
