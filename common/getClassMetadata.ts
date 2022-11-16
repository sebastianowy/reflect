import 'reflect-metadata'
import { Type } from './Type';

export function getClassMetadata(metadataKey: string | symbol, target: Type) {
  return Reflect.getMetadata(metadataKey, target);
}
