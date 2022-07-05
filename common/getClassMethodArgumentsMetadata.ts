import { Type } from './Type';

export function getClassMethodArgumentsMetadata(metadataKey: string, target: Type, methodName: string) {
    return Reflect.getMetadata(metadataKey, target, methodName) ?? [];
}
