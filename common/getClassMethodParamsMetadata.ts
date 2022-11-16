import { Type } from './Type';

export function getClassMethodParamsMetadata(metadataKey: string, target: Type, methodName: string) {
    return Reflect.getMetadata(metadataKey, target, methodName) ?? [];
}
