import { applyDecorators } from "../../common/applyDecorators";
import { getClassMetadata } from "../../common/getClassMetadata";
import { getClassPropertiesMetadatas } from "../../common/getClassPropertiesMetadatas";
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
    applyDecorators(OrmEntity(entityDecoratorValue))(entityClass);

    const propertiesMetadata = getClassPropertiesMetadatas(
      domainColumnMetadataIdentifier,
      entityClass
    );
    propertiesMetadata.forEach((propertyMetadata) => {
      applyDecorators(OrmColumn(propertyMetadata.metadata))(
        entityClass.prototype,
        propertyMetadata.propertyName
      );
    });
  });
}
