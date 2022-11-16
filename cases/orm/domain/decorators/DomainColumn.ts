export function DomainColumn(value?: any): PropertyDecorator {
    return (target: object, key: string | symbol) => {
      Reflect.set(target, key, null);
      Reflect.defineMetadata(
        domainColumnMetadataIdentifier,
        value,
        target,
        key
      );
    };
  }
  
  export const domainColumnMetadataIdentifier = Symbol.for("domainColumnMetadata");
  