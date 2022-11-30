import { applyClassDecorator } from "../../core/applyClassDecorator";
import { applyDecorators } from "../../core/applyDecorators";
import { applyPropertyDecorator } from "../../core/applyPropertyDecorator";
import { getClassMetadata } from "../../core/getClassMetadata";
import { getClassPropertiesMetadatas } from "../../core/getClassPropertiesMetadatas";
import { domainColumnMetadataIdentifier } from "./domain/decorators/DomainColumn";
import {
  domainEntityMetadataIdentifier,
  entitiesClasses,
} from "./domain/decorators/DomainEntity";
import { OrmColumn } from "./infra/OrmColumn";
import { OrmEntity } from "./infra/OrmEntity";

export function decorate(): void {
  entitiesClasses.forEach((entityClass) => {
    const entityDecoratorValue = getClassMetadata(
      domainEntityMetadataIdentifier,
      entityClass
    );
    applyClassDecorator(OrmEntity, entityDecoratorValue, entityClass);

    const propertiesMetadata = getClassPropertiesMetadatas(
      domainColumnMetadataIdentifier,
      entityClass
    );
    propertiesMetadata.forEach((propertyMetadata) => {
      applyPropertyDecorator(
        OrmColumn,
        propertyMetadata.metadata,
        entityClass,
        propertyMetadata.propertyName
      );
    });
  });
}
