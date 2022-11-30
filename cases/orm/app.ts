import { inspect } from "util";
import { getClassMetadata } from "../../core/getClassMetadata";
import { getClassPropertiesMetadatas } from "../../core/getClassPropertiesMetadatas";
import { entitiesClasses } from "./domain/decorators/DomainEntity";
import { Transport } from "./domain/Transport";
import { ormColumnMetadataIdentifier } from "./infra/OrmColumn";
import { ormEntityMetadataIdentifier } from "./infra/OrmEntity";

export function runApp(): void {
  console.log(inspect(Transport.name));
  console.log(
    inspect(getClassMetadata(ormEntityMetadataIdentifier, Transport))
  );
  const transports = getTransports();
  console.log(inspect(transports));
}

function getTransports(): Transport[] {
  const entities = entitiesClasses.map((entityClass) => {
    const entity = Object.create(entityClass.prototype);
    const props = getClassPropertiesMetadatas(
      ormColumnMetadataIdentifier,
      entityClass
    );
    props.forEach((prop) => {
      entity[prop.propertyName] = prop.metadata;
    });
    return entity;
  });

  return entities.filter(entity => entity instanceof Transport);
}
