import { applyDecorators } from "./applyDecorators";
import { Type } from "./Type";

export function applyMethodDecorator(
  MethodDecorator: Function,
  metadata: string,
  clazz: Type<any>,
  methodName: string,
  descriptor: PropertyDescriptor) {
  applyDecorators(MethodDecorator(metadata))(clazz, methodName, descriptor);
}
