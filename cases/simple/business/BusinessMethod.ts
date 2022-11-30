export function BusinessMethod<K = string, V = any>(metadataKey: K,
    metadataValue: V): MethodDecorator {
    return (target: object, key: any, descriptor: any): any => {
        Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
        return descriptor;
    };
}
