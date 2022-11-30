import { applyDecorators } from "./applyDecorators";
import { Type } from "./Type";

export function applyPropertyDecorator(
  PropertyDecorator: Function,
  metadata: unknown,
  clazz: Type,
  propertyName: string) {
  applyDecorators(PropertyDecorator(metadata))(clazz.prototype, propertyName);
}
