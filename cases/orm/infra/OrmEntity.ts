export function OrmEntity(value?: unknown): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(ormEntityMetadataIdentifier, value, target);
  };
}

export const ormEntityMetadataIdentifier = Symbol.for("ormEntityMetadata");
