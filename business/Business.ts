import { Type } from "../common/Type";

export const clazzes: Type[] = [];
export function Business<K = string, V = any>(metadataKey: K,
  metadataValue: V): ClassDecorator {
  const decoratorFactory = (target: object): any => {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    if (!clazzes.includes(target as Type)) { clazzes.push(target as Type); };
    return target;
  };
  return decoratorFactory;
}
