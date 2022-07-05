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
    someConstructorArgument: string
  ) { }

  @BusinessMethod('methodKey', 'methodValue')
  someMethod(
    @BusinessParam('methodArgKey', { param: 'methodArgValue', transform: (value) => `${value}-transformed` })
    someMethodArgument: string
  ) {
    return '';
  }
}
