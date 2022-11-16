import { applyDecorators } from "./applyDecorators";
import { Type } from "./Type";

export function applyMethodParamDecorator(
  MethodParamDecorator: Function,
  methodArgumentMetadata: any,
  clazz: Type<any>,
  methodName: string) {
  applyDecorators(
    MethodParamDecorator(
      methodArgumentMetadata.metadataValue.param,
      methodArgumentMetadata.metadataValue.transform
    )
  )(clazz.prototype, methodName, methodArgumentMetadata.index);
}
