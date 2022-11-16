import { Business } from './Business';
import { BusinessConstructorParam } from './BusinessConstructorParam';
import { BusinessMethod } from './BusinessMethod';
import { BusinessMethodParam } from './BusinessMethodParam';
import { BusinessProperty } from './BusinessProperty';


@Business('classKey', 'classValue')
@Business('anotherClassKey', 'anotherClassValue')
export class Something {
  @BusinessProperty('propertyKey', 'propertyValue1')
  public readonly someClassProperty = null;
  @BusinessProperty('propertyKey', 'propertyValue2')
  protected someOtherClassProperty;

  constructor(
    @BusinessConstructorParam('argKey', 'argValue')
    someConstructorArgument: string,
    @BusinessConstructorParam('argKey', 'argValueForSecondParameter')
    someConstructorSecondArgument: number,
    @BusinessConstructorParam('argKey', 'argValueForThirdParameter')
    someConstructorThridArgument: number,
  ) { }

  @BusinessMethod('methodKey', 'methodValue')
  someMethod(
    @BusinessMethodParam('methodArgKey', { param: 'methodArgValue', transform: (value) => `${value}-transformed` })
    someMethodArgument: string,
    @BusinessMethodParam('methodArgKey', { param: 'methodSecondArgValue', transform: (value) => `${value}-second-transformed` })
    someMethodSecondArgument: string,
  ) {
    return '';
  }

  @BusinessMethod('methodKey', 'methodValue')
  someSecondMethod(
    @BusinessMethodParam('methodArgKey', { param: 'methodArgValue', transform: (value) => `${value}-transformed` })
    someSecondMethodArgument: string,
    @BusinessMethodParam('methodArgKey', { param: 'methodSecondArgValue', transform: (value) => `${value}-second-transformed` })
    someSecondMethodSecondArgument: string,
  ) {
    return '';
  }
}
