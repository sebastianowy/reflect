
export function Framework(value?: string): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata('frameworkKey', value, target);
  };
}
