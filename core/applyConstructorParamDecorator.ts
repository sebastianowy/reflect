import { applyDecorators } from "./applyDecorators";
import { Type } from "./Type";

export function applyConstructorParamDecorator(
  ConstructorParamDecorator: Function,
  argMeta: any,
  clazz: Type<any>) {
  applyDecorators(ConstructorParamDecorator(argMeta.metadataValue))(
    clazz,
    undefined,
    argMeta.index
  );
}
