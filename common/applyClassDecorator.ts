import { applyDecorators } from "./applyDecorators";
import { Type } from "./Type";

export function applyClassDecorator(
  ClassDecorator: Function,
  clazzMeta: any,
  clazz: Type<any>) {
  applyDecorators(ClassDecorator(clazzMeta))(clazz);
}
