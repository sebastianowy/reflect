import { Type } from "../../../../common/Type";

export function DomainEntity(value?: unknown): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(domainEntityMetadataIdentifier, value, target);
    entitiesClasses.push(target as Type);
  };
}

export const domainEntityMetadataIdentifier = Symbol.for(
  "domainEntityMetadata"
);
export const entitiesClasses: Type[] = [];
