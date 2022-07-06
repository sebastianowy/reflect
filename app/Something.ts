import { Business } from '../business/Business';
import { BusinessConstructorArg } from '../business/BusinessConstructorArg';
import { BusinessMethod } from '../business/BusinessMethod';
import { BusinessParam } from '../business/BusinessParam';


@Business('classKey', 'classValue')
@Business('anotherClassKey', 'anotherClassValue')
export class Something {
  private someClassProperty;

  constructor(
    @BusinessConstructorArg('argKey', 'argValue')
    someConstructorArgument: string,
    @BusinessConstructorArg('argKey', 'argValueForSecondParameter')
    someConstructorSecondArgument: number,
    @BusinessConstructorArg('argKey', 'argValueForThirdParameter')
    someConstructorThridArgument: number,
  ) { }

  @BusinessMethod('methodKey', 'methodValue')
  someMethod(
    @BusinessParam('methodArgKey', { param: 'methodArgValue', transform: (value) => `${value}-transformed` })
    someMethodArgument: string,
    @BusinessParam('methodArgKey', { param: 'methodSecondArgValue', transform: (value) => `${value}-second-transformed` })
    someMethodSecondArgument: string,
  ) {
    return '';
  }

  @BusinessMethod('methodKey', 'methodValue')
  someSecondMethod(
    @BusinessParam('methodArgKey', { param: 'methodArgValue', transform: (value) => `${value}-transformed` })
    someSecondMethodArgument: string,
    @BusinessParam('methodArgKey', { param: 'methodSecondArgValue', transform: (value) => `${value}-second-transformed` })
    someSecondMethodSecondArgument: string,
  ) {
    return '';
  }
}
