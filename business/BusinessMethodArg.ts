import { createMethodArgDecorator } from "../common/createMethodArgDecorator";

// TODO consider removal
export function BusinessMethodArg(
    data?: unknown,
): ParameterDecorator {
    return createMethodArgDecorator(BusinessMethodArg.name, BusinessMethodArg.name)(data);
}