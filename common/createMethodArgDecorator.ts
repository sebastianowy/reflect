/**
TODO consider removal
just an example of method arg decorator factory
 */
export function createMethodArgDecorator<TParamData = unknown>(metadataKey: string, decoratorName: string) {
    return (data?: TParamData): ParameterDecorator => (target, key, index) => {
        const previousMetadata = Reflect.getMetadata(metadataKey, target.constructor, key) || {};
        Reflect.defineMetadata(
            metadataKey,
            {
                ...previousMetadata,
                [`${decoratorName}:${index}`]: {
                    index,
                    decoratorName,
                    data,
                },
            },
            target.constructor,
            key
        );
    };
}
