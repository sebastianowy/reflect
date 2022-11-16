export function OrmColumn(value?: any): PropertyDecorator {
  return (target: object, key: string | symbol) => {
    Reflect.set(target, key, null);
    Reflect.defineMetadata(
        ormColumnMetadataIdentifier,
      value,
      target,
      key
    );
  };
}

export const ormColumnMetadataIdentifier = Symbol.for("ormColumnMetadata");
