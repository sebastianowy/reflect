export function BusinessProperty<K = string, V = any>(metadataKey: K,
    metadataValue: V): PropertyDecorator {
    return (target: object, key: string) => {
        Reflect.set(target, key, null);
        Reflect.defineMetadata(metadataKey, metadataValue, target, key);
    };
}
